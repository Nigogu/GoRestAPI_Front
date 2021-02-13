import React from "react";
import { Modal, Typography, Row, Col, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default class UserModal extends React.Component {
  translate(type, data) {
    if (type === "Gender") {
      return data === "Male" ? "Masculino" : "Femenino";
    } else if (type === "Status") {
      return data === "Active" ? "Activo" : "Inactivo";
    } else if (type === "Date") {
      let date = new Date(data);
      return date.toLocaleDateString();
    }
  }

  render() {
    return (
      <Modal
        centered
        width={900}
        visible={this.props.visible}
        onCancel={this.props.closeModal}
        footer={null}
        closable={false}
      >
        <Row>
          <Col>
            <Title className="App-Title" level={4}>
              {this.props.userInfo.name}
            </Title>
            <Avatar
              size={{ xs: 60, sm: 60, md: 90, lg: 90, xl: 120, xxl: 120 }}
              icon={<UserOutlined />}
            />
          </Col>
          <Col>
            <p>Email: {this.props.userInfo.email}</p>
            <p>
              Género: {this.translate("Gender", this.props.userInfo.gender)}
            </p>
            <p>
              Estado del usuario:{" "}
              {this.translate("Status", this.props.userInfo.status)}
            </p>
            <p>
              Registro: {this.translate("Date", this.props.userInfo.created_at)}
            </p>
            <p>
              Última actualización:{" "}
              {this.translate("Date", this.props.userInfo.updated_at)}
            </p>
          </Col>
        </Row>
      </Modal>
    );
  }
}
