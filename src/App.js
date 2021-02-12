import React from "react";
import "./App.css";
import Backend from "./Backend";

class App extends React.Component {
  componentDidMount() {
    Backend.SendRequest("users", "GET", {}).then(async (response) => {
      let res = await response.json();
      console.log(res);
    });
  }

  render() {
    return (
      <div className="App">
        <p>Hi.</p>
      </div>
    );
  }
}

export default App;
