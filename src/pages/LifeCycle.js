import React from "react";
import ReportsService from "./report-services";

export default class LifeCycles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hello: "World!" };
  }

  componentWillMount() {
    ReportsService.all().then((res) => {
      console.log(res);
    });
  }

  changeState() {
    this.setState({ hello: "Geek!" });
  }

  render() {
    return (
      <div className="products">
        <p>GeeksForGeeks.org, Hello{this.state.hello}</p>
        <h2>
          <a onClick={this.changeState.bind(this)}>Press Here!</a>
        </h2>
      </div>
    );
  }
}
