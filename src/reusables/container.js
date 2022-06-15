import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";

// import Drawer from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import { Link } from "react-router-dom";
import { SidebarData } from "../Components/SideBarData";
import { IconContext } from "react-icons";
import "../Components/Navbar.css";
import "../App.css";

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
      <SwipeableDrawer
        open={this.state.menuOpen}
        onClose={() => this.setState({ menuOpen: !this.state.menuOpen })}
      >
        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars />
            </Link>
          </div>
          <nav className={this.state.menuOpen ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items">
              <li className="nambar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose
                    onClick={() =>
                      this.setState({ menuOpen: !this.state.menuOpen })
                    }
                  />
                </Link>
              </li>
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
          </nav>
        </IconContext.Provider>
      </SwipeableDrawer>
    );
  };

  header = () => {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
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
          background: "#525252",
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
        {this.footer()}
      </div>
    );
  }
}
