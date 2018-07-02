import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter
} from 'mdbreact';

const AlertModal = (props) => {
  return (
    <Modal isOpen={props.open} backdrop={false} toggle={props.toggle}>
      <ModalBody>
        <h4>{props.message}</h4>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.toggle}>OK!</Button>
      </ModalFooter>
    </Modal>
  );
}

export default AlertModal;
