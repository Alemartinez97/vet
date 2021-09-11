import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
const Form = (props) => {
  debugger
  const classes = useStyles();
  // const taskname = useRef();
  // const description = useRef();
  const {
    reset,
    submitting,
    data,
    dirtyData,
    handleClose,
    setData,
    handleSubmit,
    setProvider,
    provider,

  } = props;
  return (
    <div className={classes.paper}>
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
              onChange={(e) =>
                setData({ ...data, detail: e.target.value })
              }
              value={data.search}
              label="Detalle"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={data.defaultValue}
              onChange={(e) =>
                setData({ ...data, date: e.target.value })
              }
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
              onChange={(e) =>
                setData({ ...data, detail: e.target.value })
              }
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
            onClick={()=>handleSubmit()}
          >
            Reservar Turno
          </Button>

          <Button
            //   component={LinkAddEvent}
            color="primary"
            type="button"
            onClick={()=>handleClose(false)}
          >
            Cancelar Turno
          </Button>
        </Grid>
      </form>
      {/* <button onClick={()=>handleSubmit()}>OK</button> */}
    </div>
  );
};
export default Form;
