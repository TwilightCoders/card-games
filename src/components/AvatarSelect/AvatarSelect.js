import React, { Component } from 'react';
import {
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
} from 'mdbreact';

import { PlayersContext } from '../../contexts/Players';

const defaultAvatar = require('../../avatars/default.svg');

const circleSize = '2em';

export default class AvatarSelect extends Component {
	defaultState = {
		color: null,
    avatar: null,
	}
	
  state = Object.assign({}, this.defaultState);
	
	setColor = (color) => {
		this.setState({color: color});
	}
	
	alertAvatar = () => {
    //alert(`You chose avatar: ${this.state.avatar}, and the color is ${this.state.color}`);
    const playerInfo = this.getPlayerInfo();

		this.props.assign(playerInfo.avatar, playerInfo.color, this.props.player.index);
		this.setState(Object.assign({}, this.defaultState));
		this.props.toggle();
  }
  
  getPlayerInfo = () => {
    const playerInfo = { color: this.state.color, avatar: this.state.avatar };

    if (this.props.open && (playerInfo.color === null || playerInfo.avatar === null) && this.props.player) {
      playerInfo.color = playerInfo.color || this.props.player.color;
      playerInfo.avatar = playerInfo.avatar || this.props.player.avatar;
    }

    return playerInfo;
  }
	
	render() {
    const playerInfo = this.getPlayerInfo();

		return (
			<PlayersContext.Consumer>
				{value => (
          <Modal isOpen={this.props.open} toggle={this.props.toggle} backdrop={false}>
		        <ModalHeader toggle={this.props.toggle}>Avatars!</ModalHeader>
		        <ModalBody>
		        	<h3>Select Color:</h3>
		        	<div className='row pb-3 pl-3'>
		        		{value.colorOptions.map(color => {
		        			const addBorder = (color === 'white') ? 'border-top border-bottom border-right border-left border-dark' : '';
		        			const active = (color === playerInfo.color) ? 'z-depth-2' : '';
		        			const classNames = `${color} rounded-circle d-inline m-1 ${addBorder} ${active}`;
		        			return (
		        				<div
		        					style={{width: circleSize, height: circleSize, cursor: 'pointer'}}
		        					className={classNames}
		        					onClick={()=>this.setColor(color)}
		        					key={`colorSwatch${color}`}></div>);
		        		})}
			        </div>
		          <h3>View Avatars:</h3>
		          <div className='row' id='avatarSelect'>
		          	{value.images.map((image, index) => {
		          		return (
		          			<div key={`avatarsModal${index}`} className='col'>
		          				<img
		          					src={image}
		          					alt={`avatar ${index}`}
		          					onClick={() => this.setState({avatar: image})}
		          					className={`rounded-circle m-3 ${playerInfo.color} ${(image === playerInfo.avatar ? 'z-depth-2 selected' : '')}`} />
		          			</div>
		          		);
		          	})}
		          	<div className='col mr-auto'>
		          		<img
		          			src={defaultAvatar}
		          			alt='Default Avatar'
		          			onClick={() => this.setState({avatar: defaultAvatar})}
		          			className={`rounded-circle m-3 ${playerInfo.color} ${(defaultAvatar === playerInfo.avatar ? 'z-depth-2 selected' : '')}`} />
		          	</div>
		          </div>
		        </ModalBody>
		        <ModalFooter>
		          <Button outline color='danger' onClick={this.props.toggle}>Cancel</Button>{' '}
		          <Button color="primary" onClick={this.alertAvatar}>Select Avatar</Button>
		        </ModalFooter>
		      </Modal>
		  	)}
			</PlayersContext.Consumer>
		);
	}
}

