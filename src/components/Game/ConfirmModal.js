import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter
} from 'reactstrap';

export default class ConfirmModal extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  toggle() {
    this.props.toggle();
  }

  confirm() {
    this.props.action();
    this.toggle();
  }

  render() {
    const { open } = this.props;
    return (
      <Modal isOpen={open} toggle={this.toggle}>
        <ModalBody>
          <h4>{this.props.question}</h4>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="btn-raised mr-1" onClick={this.confirm}>Yes</Button>{' '}
          <Button color="secondary" className="btn-raised" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}