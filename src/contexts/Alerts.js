import React, { Component } from "react";

export const AlertContext = React.createContext();

export class AlertProvider extends Component {
  state = {
    alertOpen: false,
    alertMessage: 'Alert Modal!',
  };

  alertToggle = (message = '') => {
    this.setState(state => {
      const alertMessage = (message === '') ? state.alertMessage : message;
      return {
        alertOpen: !state.alertOpen,
        alertMessage: alertMessage
      }
    });
  }

  /*alertToggle = () => {
    this.setState(state => {
      console.log('setting alertOpen to ' + !state.alertOpen);
      return {
        alertOpen: !state.alertOpen
      };
    })
  }

  setMessage = (message) => {
    this.setState({alertMessage: message});
  }*/

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
