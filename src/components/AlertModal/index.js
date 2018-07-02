import React from "react";
import { AlertContext } from "../../contexts/Alerts";
import AlertModal from './AlertModal';

/*export default props => (
  <AlertModal {...props} />
);*/


export default props => (
  <AlertContext.Consumer>
    {({ alertOpen, alertMessage, alertToggle }) => (
      <AlertModal {...props} open={alertOpen} message={alertMessage} toggle={alertToggle} />
    )}
  </AlertContext.Consumer>
);
