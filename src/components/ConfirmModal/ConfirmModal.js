import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter
} from 'mdbreact';

class ConfirmModal extends Component {
  close = () => {
    this.props.toggle();
  }

  confirm = () => {
    this.props.action();
    this.props.toggle();
  }

  render() {
    const { open } = this.props;
    return (
      <Modal isOpen={open} toggle={this.close}>
        <ModalBody>
          <h4>{this.props.question}</h4>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="mr-1" onClick={this.confirm}>Yes</Button>{' '}
          <Button color="secondary" onClick={this.close}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ConfirmModal.propTypes = {
  question:PropTypes.string,
  action:PropTypes.func,
  open:PropTypes.bool.isRequired,
  toggle:PropTypes.func.isRequired,
}

export default ConfirmModal;