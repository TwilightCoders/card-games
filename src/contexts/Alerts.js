import React, { Component } from "react";

export const AlertContext = React.createContext();

export class AlertProvider extends Component {
  state = {
    alertOpen: false,
    alertMessage: 'Alert Modal!',
  };

  toggleAlert(message = '') {
    this.setState(state => {
      const alertMessage = (message === '') ? state.message : message;
      return {
        alertOpen: !state.alertOpen,
        alertMessage: alertMessage
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
          alertToggle: this.toggleAlert.bind(this)
        }}
      >
        {this.props.children}
      </AlertContext.Provider>
    );
  }
}
