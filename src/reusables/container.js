import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import * as FaIcons from "react-icons/fa";

import Drawer from "@mui/material/Drawer";

import { Link } from "react-router-dom";
import { SidebarData } from "../Components/SideBarData";
import { IconContext } from "react-icons";
import "../Components/Navbar.css";
import "../App.css";

const drawerWidth = 260;

export default class container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
    };
  }

  showSidebar = () => {
    return this.setState({ menuOpen: false });
  };

  sidebar = () => {
    return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        open={this.state.menuOpen}
        onClose={() => this.setState({ menuOpen: !this.state.menuOpen })}
      >
        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="navbar">
            <div className="app-name">{"ReactJS App"}</div>
            <Link to="#" className="menu-bars">
              {/* <AiIcons.AiOutlineClose
                onClick={() =>
                  this.setState({ menuOpen: !this.state.menuOpen })
                }
              /> */}
            </Link>
          </div>
          <ul className="nav-menu-items ">
            <li className="nambar-toggle"></li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </IconContext.Provider>
      </Drawer>
    );
  };

  header = () => {
    return (
      <div>
        <AppBar position="static">
          <Toolbar className="header">
            <IconButton
              onClick={() => {
                this.setState({ menuOpen: true });
              }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <FaIcons.FaBars />
            </IconButton>
            <h1>Header</h1>
          </Toolbar>
        </AppBar>{" "}
      </div>
    );
  };

  footer = () => {
    return (
      <Toolbar
        style={{
          position: "static",
          background: "#1a83ff",
          height: "8vh",
          color: "white",
        }}
      >
        <h1>Footer</h1>
      </Toolbar>
    );
  };

  render() {
    return (
      <div>
        {this.sidebar()}
        {this.header()}
        <div style={{ height: "100vh" }}>{this.props.children}</div>
        {/* {this.footer()} */}
      </div>
    );
  }
}
