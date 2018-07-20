import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter
} from 'mdbreact';

const AlertModal = props => {
  return (
    <Modal isOpen={props.open} backdrop={(props.backdrop ? props.backdrop : false)} toggle={props.toggle}>
      <ModalBody>
        <h4>{props.message}</h4>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={props.toggle}>OK!</Button>
      </ModalFooter>
    </Modal>
  );
}

AlertModal.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  backdrop: PropTypes.bool,
}

export default AlertModal;
