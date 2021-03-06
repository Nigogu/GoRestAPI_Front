import React from "react";
import Backend from "./Backend";
import UserModal from "./UserModal";
import { Row, Col, Table, Typography, Button, Spin } from "antd";

import "./App.css";

const { Title } = Typography;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (
            <Title level={4} style={{ marginBottom: 0 }}>
              Nombre de usuario
            </Title>
          ),
          dataIndex: "user",
          align: "center",
        },
        {
          title: (
            <Title level={4} style={{ marginBottom: 0 }}>
              Detalles
            </Title>
          ),
          dataIndex: "details",
          align: "center",
          render: (text, record) => (
            <Button type="link" onClick={() => this.showModal(record.key)}>
              Ver más información
            </Button>
          ),
        },
      ],
      data: [],
      page: 1,
      total_users: 0,
      loadingTable: true,
      loadingModal: false,
      userModalVisible: false,
      selectedUserInfo: {},
    };
  }

  componentDidMount() {
    this.makeUsersQuery(this.state.page);
  }

  makeUsersQuery(page) {
    Backend.SendRequest("users?page=".concat(page), "GET", {}).then(
      async (response) => {
        if (response.status === 200) {
          let res = await response.json();
          let users_array = [];
          res.data.forEach((user) => {
            users_array.push({
              key: user.id,
              user: user.name,
            });
          });

          let total_users = res.meta.pagination.total;

          if (page > 1) {
            let pre = new Array((page - 1) * 20);
            pre.fill({});
            users_array = pre.concat(users_array);
          }

          if (total_users !== users_array.length) {
            let pos = new Array(total_users - users_array.length);
            pos.fill({});
            users_array = users_array.concat(pos);
          }

          this.setState({
            data: users_array,
            total_users: total_users,
            loadingTable: false,
          });
        } else {
          console.error("Error making the request: " + response.status);
        }
      }
    );
  }

  pagChange = (currentPage) => {
    this.setState(
      {
        loadingTable: true,
      },
      () => this.makeUsersQuery(currentPage)
    );
  };

  showModal(id) {
    this.setState({
      loadingModal: true,
    });
    Backend.SendRequest("users/".concat(id), "GET", {}).then(
      async (response) => {
        if (response.status === 200) {
          let res = await response.json();
          this.setState({
            selectedUserInfo: res.data,
            userModalVisible: true,
            loadingModal: false,
          });
        }
      }
    );
  }

  closeModal = () => {
    this.setState({ userModalVisible: false });
  };

  render() {
    return (
      <Spin spinning={this.state.loadingModal}>
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
                size="small"
                columns={this.state.columns}
                dataSource={this.state.data}
                loading={this.state.loadingTable}
                pagination={{
                  defaultPageSize: 20,
                  position: ["topRight"],
                  size: "big",
                  showSizeChanger: false,
                  onChange: this.pagChange,
                }}
              ></Table>
            </Col>
          </Row>

          <UserModal
            closeModal={this.closeModal}
            visible={this.state.userModalVisible}
            userInfo={this.state.selectedUserInfo}
          ></UserModal>
        </div>
      </Spin>
    );
  }
}

export default App;
