import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Layout from "./layout";

import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = (theme) => ({
  table: {
    marginTop: theme.spacing(5),
    minWidth: 700,
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
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: message,
  });
}

class CustomizedTables extends React.Component {
  state = {
    data: [],
  };

  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token === "undefined") {
      this.props.history.push("/Login");
    } else {
      var url = `http://localhost:3000/api/tasks/users?token=` + token;
      axios(url)
        .then((response) => {
          this.setState({
            data: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
          mostrarToastNuevo("Token Invalido.", "error");
          this.props.history.push("/Login");
        });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Layout>
        <Container component="main">
          <TableContainer>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nombre</StyledTableCell>
                  <StyledTableCell>Apellido</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map((item, i) => {
                  return (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">
                        {item.name}
                      </StyledTableCell>
                      <StyledTableCell>{item.lastName}</StyledTableCell>
                      <StyledTableCell>{item.email}</StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Layout>
    );
  }
}
export default withStyles(useStyles)(CustomizedTables);
