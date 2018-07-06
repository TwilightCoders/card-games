import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter
} from 'mdbreact';

export default props => {
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
