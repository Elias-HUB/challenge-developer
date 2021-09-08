import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Layout from "./layout";
import axios from "axios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  root: {
    flexGrow: 1,
  },
  paperpass: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const MySwal = withReactContent(Swal);
function mostrarToastNuevo(message, icon) {
  const Toast = MySwal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", MySwal.stopTimer);
      toast.addEventListener("mouseleave", MySwal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: message,
  });
}

class Profile extends React.Component {
  state = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    token: "",
    inputPass: "",
    inputPass2: "",
  };

  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token === "undefined") {
      this.props.history.push("/Login");
    } else {
      var url = `http://localhost:3000/api/tasks/user/?token=` + token;
      axios(url)
        .then((response) => {
          this.setState({
            name: response.data.User.name,
            lastName: response.data.User.lastName,
            email: response.data.User.email,
            password: response.data.User.password,
            token: response.data.User.token,
            inputPass: "",
            inputPass2: "",
          });
        })
        .catch((error) => {
          console.log(error);
          mostrarToastNuevo("Token Invalido.", "error");
          this.props.history.push("/Login");
        });
    }
  }

  changeHandle = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  UpdatePass = (e) => {
    e.preventDefault();
    console.log("Entre");
    if (this.state.inputPass === this.state.inputPass2) {
      MySwal.fire({
        icon: "warning",
        title: "¿Desea modificar su contraseña?",
        showCancelButton: true,
        confirmButtonColor: "#c82333",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Modificar",
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          var data = {
            email: this.state.email,
            password: this.state.inputPass,
            token: this.state.token,
          };
          var url = `http://localhost:3000/api/tasks/changePass`;
          axios
            .post(url, data)
            .then((response) => {
              mostrarToastNuevo(
                "Se ha actualizado su contraseña de manera correcta.",
                "success"
              );
            })
            .catch((error) => {
              console.log(error);
              localStorage.setItem("token", undefined);
              mostrarToastNuevo("Problemas Con el token.", "error");
            });
        }
      });
    } else {
      mostrarToastNuevo("Las contraseñas deben coincidir", "error");
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <Layout>
        <Container component="main">
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>{this.state.name}</Avatar>
            <form noValidate autoComplete="off">
              <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    id="Nombre"
                    label="Nombre"
                    value={this.state.name}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    id="Apellido"
                    label="Apellido"
                    value={this.state.lastName}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    id="Email"
                    label="Email"
                    value={this.state.email}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
            <br />
          </Paper>
        </Container>

        <Container component="main">
          <Paper className={classes.paperpass}>
            <Typography variant="h6" className={classes.title}>
              Cambiar Contraseña
            </Typography>
            <form
              autoComplete="off"
              className={classes.form}
              onSubmit={this.UpdatePass}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="inputPass"
                    label="Contraseña"
                    onChange={this.changeHandle}
                    inputPass={this.state.inputPass}
                    type="password"
                    id="inputPass"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="inputPass2"
                    label="Nueva Contraseña"
                    onChange={this.changeHandle}
                    inputPass2={this.state.inputPass2}
                    type="password"
                    id="inputPass2"
                  />
                </Grid>
              </Grid>

              <Button variant="contained" type="submit" color="primary">
                Modificar Contraseña
              </Button>
            </form>
            <br />
          </Paper>
        </Container>
      </Layout>
    );
  }
}
export default withStyles(useStyles)(Profile);
