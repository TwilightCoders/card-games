import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter
} from 'mdbreact';

export default class ConfirmModal extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.toggle();
  }

  render() {
    const { open } = this.props;
    return (
      <Modal isOpen={open} toggle={this.toggle}>
        <ModalBody>
          <h4>{this.props.message}</h4>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>OK!</Button>
        </ModalFooter>
      </Modal>
    );
  }
}