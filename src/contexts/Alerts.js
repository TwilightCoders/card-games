import React, { Component } from "react";

export const AlertContext = React.createContext();

export class AlertProvider extends Component {
  state = {
    alertOpen: false,
    alertMessage: 'Alert Modal!',
    backdrop: true,
  };

  alertToggle = (message = '', backdrop = true) => {
    this.setState(state => {
      const alertMessage = (message === '') ? state.alertMessage : message;
      return {
        alertOpen: !state.alertOpen,
        alertMessage: alertMessage,
        backdrop: backdrop,
      }
    });
  }

  render() {
    return (
      <AlertContext.Provider
        value={{
          // Add current state variables
          ...this.state,
          // Functions as well
          alertToggle: this.alertToggle,
        }}
      >
        {this.props.children}
      </AlertContext.Provider>
    );
  }
}
