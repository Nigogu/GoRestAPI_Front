import React from "react";
import { Modal, Typography, Row, Col, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

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
        <Row justify="center">
          <Title className="App-Title" level={3}>
            {this.props.userInfo.name}
          </Title>
        </Row>
        <Row align="middle">
          <Col xs={10} md={8} lg={7}>
            <Row justify="center">
              <Avatar
                size={{ xs: 80, sm: 90, md: 100, lg: 110, xl: 140, xxl: 150 }}
                icon={<UserOutlined />}
              />
            </Row>
          </Col>
          <Col className="UserModal-Info" xs={14} md={16} lg={17}>
            <Text strong>Email: </Text>
            <Text
              copyable={{
                tooltips: [
                  "Copiar e-mail en el portapapeles",
                  "¡E-mail Copiado!",
                ],
              }}
            >
              {this.props.userInfo.email}
            </Text>
            <br />
            <Text strong>Género: </Text>
            <Text>{this.translate("Gender", this.props.userInfo.gender)}</Text>
            <br />
            <Text strong>Estado del usuario: </Text>
            <Text>{this.translate("Status", this.props.userInfo.status)}</Text>
            <br />
            <Text strong>Registro: </Text>
            <Text>
              {this.translate("Date", this.props.userInfo.created_at)}
            </Text>
            <br />
            <Text strong>Última actualización: </Text>
            <Text>
              {this.translate("Date", this.props.userInfo.updated_at)}
            </Text>
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Button
              className="UserModal-Button"
              type="primary"
              onClick={this.props.closeModal}
            >
              Volver
            </Button>
          </Col>
        </Row>
      </Modal>
    );
  }
}
