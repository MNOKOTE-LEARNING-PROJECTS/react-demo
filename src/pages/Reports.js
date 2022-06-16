import React, { Component } from "react";
import Button from "@mui/material/Button";
import ReportsService from "./report-services";

export default class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Manage Reports",
      users: [],
    };

    console.log("proseeee", props);
  }

  changeTitleState = () => {
    this.setState({ title: "Title Changed" });
  };

  getUserList = () => {
    ReportsService.all().then((res) => {
      console.log(res);
    });
  };

  render() {
    return (
      <div className="reports" style={{ height: 400, width: "100%" }}>
        <p>{this.state.title}</p>
        <Button onClick={this.getUserList}>Change Name</Button>
      </div>
    );
  }
}
