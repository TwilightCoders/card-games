import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
} from 'mdbreact';

const circleSize = '2em';

class AvatarSelect extends Component {
	defaultState = {
		color: (this.props.colorOptions ? this.props.colorOptions[0] : null),
    avatar: this.props.defaultAvatar,
	}
	
  state = Object.assign({}, this.defaultState);
	
	setColor = (color) => {
		this.setState({color: color});
	}
	
	selectAvatar = () => {
    const playerInfo = this.getPlayerInfo();

		this.props.assign(playerInfo.avatar, playerInfo.color, this.props.editingPlayer.index);
		this.setState(Object.assign({}, this.defaultState));
		this.props.toggle();
  }
  
  getPlayerInfo = () => {
    const playerInfo = { color: this.state.color, avatar: this.state.avatar };

    if (this.props.open && (playerInfo.color === null || playerInfo.avatar === null) && this.props.editingPlayer) {
      playerInfo.color = playerInfo.color || this.props.editingPlayer.color;
      playerInfo.avatar = playerInfo.avatar || this.props.editingPlayer.avatar;
    }

    return playerInfo;
  }
	
	render() {
    const playerInfo = this.getPlayerInfo();

    const props = this.props;

    return (
      <Modal isOpen={props.open} toggle={props.toggle} backdrop={false}>
        <ModalHeader toggle={props.toggle}>Avatars!</ModalHeader>
        <ModalBody>
          <h3>Select Color:</h3>
          <div className='row pb-3 pl-3'>
            {props.colorOptions.map(color => {
              const addBorder = (color === 'white') ? 'border-top border-bottom border-right border-left border-dark' : '';
              const active = (color === playerInfo.color) ? 'z-depth-2' : '';
              const classNames = `${color} rounded-circle d-inline m-1 ${addBorder} ${active}`;
              return (
                <div
                  style={{ width: circleSize, height: circleSize, cursor: 'pointer' }}
                  className={classNames}
                  onClick={() => this.setColor(color)}
                  key={`colorSwatch${color}`}>
                </div>
              );
            })}
          </div>
          <h3>View Avatars:</h3>
          <div className='row' id='avatarSelect'>
            {props.images.map((image, index) => {
              return (
                <div key={`avatarsModal${index}`} className='col'>
                  <img
                    src={image}
                    alt={`avatar ${index}`}
                    onClick={() => this.setState({ avatar: image })}
                    className={`rounded-circle m-3 ${playerInfo.color} ${(image === playerInfo.avatar ? 'z-depth-2 selected' : '')}`} />
                </div>
              );
            })}
            <div className='col mr-auto'>
              <img
                src={props.defaultAvatar}
                alt='Default Avatar'
                onClick={() => this.setState({ avatar: props.defaultAvatar })}
                className={`rounded-circle m-3 ${playerInfo.color} ${(props.defaultAvatar === playerInfo.avatar ? 'z-depth-2 selected' : '')}`} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button outline color='danger' onClick={props.toggle}>Cancel</Button>{' '}
          <Button color="primary" onClick={this.selectAvatar}>Select Avatar</Button>
        </ModalFooter>
      </Modal>
    );
	}
}

AvatarSelect.propTypes = {
  open: PropTypes.bool.isRequired,
  editingPlayer: PropTypes.object,
  assign: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,

  players: PropTypes.array,
  updatePlayers: PropTypes.func.isRequired,
  images: PropTypes.array,
  colorOptions: PropTypes.array,
  defaultAvatar: PropTypes.object,
}

export default AvatarSelect;
