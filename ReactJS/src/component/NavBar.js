import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import ExitToAppSharpIcon from "@material-ui/icons/ExitToAppSharp";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import logo from "../lg-zentricx.png";
import "./logo.css";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class NavBar extends React.Component {
  About = (e) => {
    e.preventDefault();
    localStorage.setItem("token", undefined);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <img src={logo} alt="" className="logo" />
            <Typography variant="h6" className={classes.title}>
              Challenge-Developer{" "}
            </Typography>
            <Tooltip title="Dashboard">
              <IconButton>
                <Link to="/Dashboard">
                  <DashboardOutlinedIcon className="color" />
                </Link>
              </IconButton>
            </Tooltip>
            <Tooltip title="Perfil">
              <IconButton>
                <Link to="/Profile">
                  <AccountCircle className="color" />
                </Link>
              </IconButton>
            </Tooltip>
            <Tooltip title="Cerrar Session">
              <IconButton onClick={this.About}>
                <Link to="/Login">
                  <ExitToAppSharpIcon className="color" />
                </Link>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(useStyles)(NavBar);
