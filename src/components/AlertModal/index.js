import React from "react";
import { AlertContext } from "../../contexts/Alerts";
import AlertModal from './AlertModal';

export default props => (
  <AlertContext.Consumer>
    {({ alertOpen, alertMessage, alertToggle, backdrop }) => (
      <AlertModal {...props} open={alertOpen} message={alertMessage} toggle={alertToggle} backdrop={backdrop} />
    )}
  </AlertContext.Consumer>
);
