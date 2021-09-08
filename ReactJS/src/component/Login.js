import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import logo from "../lg-zentricx.png";
import "./logo.css";

const MySwal = withReactContent(Swal);
function mostrarToastNuevo(message, icon) {
  const Toast = MySwal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: message,
  });
}

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = (e) => {
    e.preventDefault();
    var data = { email: this.state.email, password: this.state.password };
    var url = `http://localhost:3000/api/tasks/login/`;
    axios
      .post(url, data)
      .then((response) => {
        localStorage.setItem("token", response.data.Token);
        this.props.history.push("/Dashboard");
      })
      .catch((error) => {
        console.log(error);
        localStorage.setItem("token", undefined);
        mostrarToastNuevo("Usuario u contraseña invalida.", "error");
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img src={logo} alt="" className="logoLogin" />
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} onSubmit={this.login}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuario"
              name="email"
              autoComplete="email"
              value={this.state.mail}
              onChange={this.handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete="current-password"
            />
            <Button variant="contained" type="submit" color="primary">
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}
export default withStyles(useStyles)(SignIn);
