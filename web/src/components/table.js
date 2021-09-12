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
import { deleteVet, setVet, editVet } from "./actions/index";
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
const Table = (props) => {
  const classes = useStyles();
  const { submitting, vet } = props;
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [vetData, setVetData] = React.useState({
    name: "",
    phone: "",
    specialist: "",
    apartament: "",
    street: "",
    number: "",
  });
  const [service, setService] = React.useState([]);
  const { name, phone, specialist, apartament, street, number } = vetData;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    const veterinary = {
      name,
      phone,
      specialist,
      apartament,
      street,
      number,
      service,
    };
    debugger;
    if (!name) {
      enqueueSnackbar("Asegurese de llenar todos los campos", {
        variant: "warning",
      });
      return;
    }
    if (
      true
      //   taskData.taskname &&
      //   taskData.description &&
      //   taskData.state &&
      //   taskData.responsable
    ) {
      if (vetData._id) {
        handleClose();
        return api
          .put(`/api/vet/${vetData._id}`, veterinary)
          .then((data) => {
            props.editVet(veterinary);
            enqueueSnackbar(
              "La veterinaria " + vetData.name + " fue actualizada con exito ",
              {
                variant: "success",
              }
            );
          })
          .catch((err) => {
            enqueueSnackbar(
              "Error, La veterinaria no se actualizo. " + err.msg,
              {
                variant: "error",
              }
            );
            console.error("Mutation error:", err);
          });
      } else {
        handleClose();
        return api
          .post("/api/vet", veterinary)
          .then((data) => {
            props.setVet(veterinary);
            enqueueSnackbar(
              "La Veterinaria " + vetData.name + " fue guardada con exito ",
              {
                variant: "success",
              }
            );
          })
          .catch((err) => {
            enqueueSnackbar(
              "Error, La Veterinaria no  fue creada. " + err.msg,
              {
                variant: "error",
              }
            );
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
        Datos de la veterinaria
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            id="name"
            // inputRef={taskname}
            onChange={(e) => setVetData({ ...vetData, name: e.target.value })}
            value={vetData.name}
            label="Nombre"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="phone"
            // inputRef={description}
            onChange={(e) => setVetData({ ...vetData, phone: e.target.value })}
            value={vetData.phone}
            label={"Celular"}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="vet"
            // inputRef={description}
            onChange={(e) =>
              setVetData({ ...vetData, specialist: e.target.value })
            }
            value={vetData.specialist}
            label={"Veterinario"}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="departamento"
            // inputRef={description}
            onChange={(e) =>
              setVetData({ ...vetData, apartament: e.target.value })
            }
            value={vetData.apartament}
            label={"Departamento"}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="calle"
            // inputRef={description}
            onChange={(e) => setVetData({ ...vetData, street: e.target.value })}
            value={vetData.street}
            label={"Calle"}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="number"
            // inputRef={description}
            onChange={(e) => setVetData({ ...vetData, number: e.target.value })}
            value={vetData.number}
            label={"Nro calle"}
            fullWidth
          />
        </Grid>
        <MaterialTable
          options={{
            search: true,
            paging: true,
            toolbarButtonAlignment: "left",
            actionsColumnIndex: 99,
            headerStyle: {
              fontFamily: "italic",
            },
          }}
          components={{
            EditField: (props) => <MTableEditField fullWidth {...props} />,
          }}
          title="Agregar servicio"
          columns={[
            {
              title: "Nombre Servicio",
              field: "service",
            },
            {
              title: "Precio Servicio",
              field: "price",
            },
          ]}
          data={service}
          editable={{
            onRowAdd: async (newData) => {
              return await setService(
                service.concat({
                  service: newData.service,
                  price: newData.price,
                })
              );
              //   return api.post("/api/vet", newData).then((result) => {
              //     const person = {
              //       id: result.data.response,
              //       ...newData,
              //     };
              //     props.setVet(person);
              //   });
            },
            onRowUpdate: async (e, newData) => {
              debugger;
              let arr = await service.filter(
                (e, index) => index !== newData.tableData.id
              );
              await arr.push(e);
              await console.log(arr);
              return await setService(arr);
            },
            //      onRowDelete: (newData) => {
            //   return api
            //     ._delete(`/api/vet/${newData._id}`)
            //     .then((data) => {
            //       props.deleteVet(newData);
            //       enqueueSnackbar(
            //         "La servicio fue eliminado con exito ",
            //         {
            //           variant: "success",
            //         }
            //       );
            //     })
            //     .catch((err) => {
            //       enqueueSnackbar(
            //         "Error, El servicio no  fue eliminado. " + err.msg,
            //         {
            //           variant: "error",
            //         }
            //       );
            //       console.error("Mutation error:", err);
            //     });
            //      },
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
              emptyDataSourceMessage: "No hay ningun servicio cargado",
            },
            toolbar: {
              searchPlaceholder: "Buscar",
            },
          }}
        />
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
                setVetData({
                  name: "",
                  phone: "",
                  vet: "",
                  apartament: "",
                  street: "",
                  number: "",
                });
                setOpen(true);
              },
              isFreeAction: true,
              tooltip: "Nueva Tarea",
            },
            {
              icon: () => <span>{<tableIcons.Edit />}</span>,
              onClick: (event, rowData) => {
                setVetData(rowData);
                setService(rowData.service);
                setOpen(true);
              },
              onRowUpdate: true,
              tooltip: "Editar Tarea",
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
          title="Agregar veterinaria"
          columns={[
            {
              title: "Nombre",
              field: "name",
            },
            {
              title: "Celular",
              field: "phone",
            },
            {
              title: "Veneterinario",
              field: "vet",
            },
            {
              title: "Calle",
              field: "street",
            },
            {
              title: "Numero",
              field: "number",
            },
            {
              title: "Departamento",
              field: "apartament",
            },
          ]}
          data={vet}
          editable={{
            onRowDelete: (newData) => {
              return api
                ._delete(`/api/vet/${newData._id}`)
                .then((data) => {
                  props.deleteVet(newData);
                  enqueueSnackbar(
                    "La Veterinaria " +
                      vetData.name +
                      " fue eliminada con exito ",
                    {
                      variant: "success",
                    }
                  );
                })
                .catch((err) => {
                  enqueueSnackbar(
                    "Error, La Veterinaria no  fue eliminada. " + err.msg,
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
              emptyDataSourceMessage: "No hay ninguna veterinaria cargada",
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
  return { vet: state.vet };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setVet: (vet) => dispatch(setVet(vet)),
    editVet: (vet) => dispatch(editVet(vet)),
    deleteVet: (vet) => dispatch(deleteVet(vet)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Table));
