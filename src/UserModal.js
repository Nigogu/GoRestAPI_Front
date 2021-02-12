import React from "react";
import { Modal } from "antd";

export default class UserModal extends React.Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.closeModal}
        footer={null}
        closable={false}
      >
        <div>Hola.</div>
      </Modal>
    );
  }
}
