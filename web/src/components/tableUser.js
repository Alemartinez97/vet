import React, { useRef } from "react";
import moment from "moment";
import MaterialTable, { MTableEditField } from "material-table";
import { connect } from "react-redux";
import api from "./utils/api";
import {
  Container,
  TextField,
  Grid,
  Button,
  InputLabel,
  MenuItem,
  Typography,
  FormControl,
  Select,
} from "@material-ui/core";
import { deleteUser, setUser, editUser } from "./actions/index";
import tableIcons from "./forms/icons";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { useSnackbar } from "notistack";
import Dialog from "@material-ui/core/Dialog";
const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: 0,
    margin: "0px auto",
    background: "blue",
  },
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
}));
const TableUser = (props) => {
  const classes = useStyles();
  const { submitting, user } = props;
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [userData, setUserData] = React.useState({
    username: "",
    email: "",
    role: "",
    password: "",
  });
  const { username, email, role, password } = userData;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    const user = {
      username,
      email,
      role,
      password,
    };
    debugger;
    if (!username) {
      enqueueSnackbar("Asegurese de llenar todos los campos", {
        variant: "warning",
      });
      return;
    }
    if (
      userData.username &&
      userData.email &&
      userData.role &&
      userData.password
    ) {
      if (userData._id) {
        handleClose();
        return api
          .put(`/api/user/${userData._id}`, user)
          .then((data) => {
            props.editUser(user);
            enqueueSnackbar(
              "El usuario " + userData.username + " fue actualizado con exito ",
              {
                variant: "success",
              }
            );
          })
          .catch((err) => {
            enqueueSnackbar("Error, El usuario no se actualizo. " + err.msg, {
              variant: "error",
            });
            console.error("Mutation error:", err);
          });
      } else {
        handleClose();
        return api
          .post("/api/user", user)
          .then((data) => {
            props.setUser(user);
            enqueueSnackbar(
              "EL usuario " + userData.name + " fue guardada con exito ",
              {
                variant: "success",
              }
            );
          })
          .catch((err) => {
            enqueueSnackbar("Error, EL usuario no  fue creado. " + err.msg, {
              variant: "error",
            });
            console.error("Mutation error:", err);
          });
      }
    } else {
      return enqueueSnackbar("Asegurese de llenar todos los campos", {
        variant: "warning",
      });
    }
  };
  const body = (
    <form
      noValidate
      autoComplete="off"
      className={classes.form}
      //    onSubmit={handleSubmit}
    >
      <Typography variant="h5" gutterBottom>
        Datos del usuario
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            id="username"
            // inputRef={taskname}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
            value={userData.name}
            label="Nombre de usuario"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            type="email"
            // inputRef={description}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            value={userData.email}
            label={"Correo"}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            type="password"
            // inputRef={description}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            value={userData.password}
            label={"Clave"}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="demo-simple-select-label">Rol</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="role"
            value={userData.role}
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
          >
            <MenuItem value={"Veterinario"}>Veterinario</MenuItem>
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"cliente"}>cliente</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid>
        <Button
          color="primary"
          // type="submit"
          disabled={submitting}
          variant="contained"
          style={{ marginRight: 10 }}
          onClick={handleSubmit}
        >
          Guardar
        </Button>

        <Button
          //   component={LinkAddEvent}
          color="primary"
          type="button"
          onClick={handleClose}
        >
          Cancelar
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
  return (
    <Container>
      <>
        {modalSelect}
        <MaterialTable
          actions={[
            {
              icon: () => <span>{<tableIcons.Add />}</span>,
              onClick: () => {
                setUserData({
                  username: "",
                  email: "",
                  role: "",
                  password: "",
                });
                setOpen(true);
              },
              isFreeAction: true,
              tooltip: "Nuevo Usuario",
            },
            {
              icon: () => <span>{<tableIcons.Edit />}</span>,
              onClick: (event, rowData) => {
                setUserData(rowData);
                setOpen(true);
              },
              onRowUpdate: true,
              tooltip: "Editar Usuario",
            },
          ]}
          options={{
            search: true,
            paging: true,
            toolbarButtonAlignment: "left",
            actionsColumnIndex: 99,
            headerStyle: {
              fontFamily: "italic",
            },
          }}
          // components={{
          //     EditField: props => <MTableEditField fullWidth {...props} />
          // }}
          title="Nuevo Usuario"
          columns={[
            {
              title: "Nombre Usuario",
              field: "username",
            },
            {
              title: "Correo",
              field: "email",
            },
            {
              title: "Rol",
              field: "role",
            },
            {
              title: "Clave",
              field: "password",
              type:"password"
            },
          ]}
          data={user}
          editable={{
            onRowDelete: (newData) => {
              return api
                ._delete(`/api/user/${newData._id}`)
                .then((data) => {
                  debugger
                  props.deleteUser(newData);
                  enqueueSnackbar(
                    "EL usuario " + userData.username + " fue eliminado con exito ",
                    {
                      variant: "success",
                    }
                  );
                })
                .catch((err) => {
                  enqueueSnackbar(
                    "Error, EL usuario no  fue eliminado. " + err.msg,
                    {
                      variant: "error",
                    }
                  );
                  console.error("Mutation error:", err);
                });
            },
          }}
          icons={tableIcons}
          // style={{
          //     marginBottom: 20
          // }}
          localization={{
            header: {
              actions: "Acciones",
            },
            body: {
              emptyDataSourceMessage: "No hay ningun usuario cargado",
            },
            toolbar: {
              searchPlaceholder: "Buscar",
            },
          }}
        />
      </>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    editUser: (user) => dispatch(editUser(user)),
    deleteUser: (user) => dispatch(deleteUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TableUser));
