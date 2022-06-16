import React, { Component } from "react";
import Button from "@mui/material/Button";

export default class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Manage Reports",
    };

    console.log("proseeee", props);
  }

  changeTitleState = () => {
    this.setState({ title: "Title Changed" });
  };

  render() {
    return (
      <div className="reports" style={{ height: 400, width: "100%" }}>
        <p>{this.state.title}</p>
        <Button onClick={this.changeTitleState}>Change Name</Button>
      </div>
    );
  }
}
