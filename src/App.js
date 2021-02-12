import React from "react";
import Backend from "./Backend";
import { Row, Col, Table, Typography } from "antd";

import "./App.css";

const { Title } = Typography;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Nombre de usuario", dataIndex: "user", align: "center" },
        { title: "Detalles", dataIndex: "details", align: "center" },
      ],
      data: [],
    };
  }

  componentDidMount() {
    Backend.SendRequest("users", "GET", {}).then(async (response) => {
      if (response.status === 200) {
        let res = await response.json();
        let auxdata = [];
        res.data.forEach((user) => {
          auxdata.push({
            key: user.id,
            user: user.name,
          });
        });
        this.setState({
          data: auxdata,
        });
      } else {
        console.error("Error making the request: " + response.status);
      }
    });
  }

  render() {
    return (
      <div className="App-Div-Main">
        <Row justify="center">
          <Col className="App-Col-Title" xs={22} md={21} lg={20}>
            <Title className="App-Title">LISTA DE USUARIOS</Title>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={22} md={18} lg={12}>
            <Table
              bordered
              columns={this.state.columns}
              dataSource={this.state.data}
            ></Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
