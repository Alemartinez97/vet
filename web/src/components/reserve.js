import React, { useState } from "react";
import moment from "moment";
import MaterialTable, { MTableEditField } from "material-table";
import { connect } from "react-redux";
import api from "./utils/api";
import instance from "./utils/http";
import { setSearchNews } from "./actions/index";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { useSnackbar } from "notistack";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import {
  TextField,
  Grid,
  Button,
  InputLabel,
  MenuItem,
  Typography,
  FormControl,
  Select,
  Checkbox,
  FormControlLabel,
  Snackbar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: 0,
    margin: "0px auto",
    background: "blue",
  },
  form: {
    // position: 'relative',
    width: 500,
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    margin: theme.spacing(6, 6, 3),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  success: {
    backgroundColor: "#43a047",
  },
  error: {
    backgroundColor: "#d32f2f",
  },
  info: {
    backgroundColor: "#2979ff",
  },
  warning: {
    backgroundColor: "#ffa000",
  },
}));
const Reserve = (props) => {
  const classes = useStyles();
  const {
    reset,
    submitting,
    event,
    errors,
    touched,
    task,
    history,
    searchNew,
    setOpen,
    open,
  } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [data, setData] = React.useState({
    detail: "",
    date: "",
    phone:""
  });
  const [provider, setProvider] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(value);
  };
  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + `${token}`,
      },
    };
    return api
      .post("/api/reserve", data)
      .then((data) => {
        // props.setTask(taskData);
        enqueueSnackbar(" El Turno  fue sacado con exito ", {
          variant: "success",
        });
      })
      .catch((err) => {
        enqueueSnackbar("Error, EL no se fue creado. " + err.msg, {
          variant: "error",
        });
        console.error("Mutation error:", err);
      });
  };
  const body = (
    <form
      noValidate
      autoComplete="off"
      className={classes.form}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" gutterBottom>
        Nuevo Turno
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            id="search"
            // inputRef={taskname}
            onChange={(e) => setData({ ...data, detail: e.target.value })}
            value={data.search}
            label="Detalle"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={data.defaultValue}
            onChange={(e) => setData({ ...data, date: e.target.value })}
            id="start"
            label="Fecha del turno"
            type="date"
            defaultValue={moment().format("ll")}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="search"
          // inputRef={taskname}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
          value={data.search}
          label="Celular"
          fullWidth
        />
      </Grid>
      <Grid>
        <Button
          color="primary"
          // type="submit"
          // disabled={submitting}
          variant="contained"
          style={{ marginRight: 10 }}
          onClick={() => handleSubmit()}
        >
          Reservar Turno
        </Button>

        <Button
          //   component={LinkAddEvent}
          color="primary"
          type="button"
          onClick={() => handleClose(false)}
        >
          Cancelar Turno
        </Button>
      </Grid>
    </form>
  );
  const modalSelect = (
    <div>
      <Dialog
        open={open}
        // onClose={handleClose}
        BackdropProps={{
          timeout: 500,
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>{body}</div>
      </Dialog>
    </div>
  );
  return <>{modalSelect} </>;
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSearchNews: (search) => dispatch(setSearchNews(search)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Reserve));


