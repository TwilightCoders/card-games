import React, { Component } from 'react';
import {
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
} from 'mdbreact';

const images = [];

for (let i = 1; i <= 16; ++i) {
	images.push(require(`../../avatars/avatar${i}.svg`));
}

const defaultAvatar = require('../../avatars/default.svg');

const circleSize = '2em';

console.log(defaultAvatar);

export default class AvatarSelect extends Component {
	state = {
		color: 'indigo'
	}
	
	setColor(color) {
		this.setState({color: color});
	}
	
	render() {
		return (
			<Modal isOpen={this.props.open} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Avatars!</ModalHeader>
        <ModalBody>
        	<h3>Select Color:</h3>
        	<div className='row pb-3 pl-3'>
	        	<div style={{width: circleSize, height: circleSize}} className='indigo rounded-circle d-inline m-1' onClick={()=>this.setColor('indigo')}></div>{/*mask pattern-7*/}
	        	<div style={{width: circleSize, height: circleSize}} className='red rounded-circle d-inline m-1' onClick={()=>this.setColor('red')}></div>
	        	<div style={{width: circleSize, height: circleSize}} className='orange rounded-circle d-inline m-1' onClick={()=>this.setColor('orange')}></div>
	        	<div style={{width: circleSize, height: circleSize}} className='yellow rounded-circle d-inline m-1' onClick={()=>this.setColor('yellow')}></div>
	        	<div style={{width: circleSize, height: circleSize}} className='blue rounded-circle d-inline m-1' onClick={()=>this.setColor('blue')}></div>
	        	<div style={{width: circleSize, height: circleSize}} className='green rounded-circle d-inline m-1' onClick={()=>this.setColor('green')}></div>
	        </div>
          <h3>View Avatars:</h3>
          <div className='row'>
          	{images.map((image, index) => {
          		return (
          			<div key={`avatarsModal${index}`} className='col'>
          				<img src={image} alt={`avatar ${index}`} className={`rounded-circle z-depth-1 m-3 ${this.state.color}`} />
          			</div>
          		);
          	})}
          	<div className='col'>
          		<img src={defaultAvatar} alt='Default Avatar' className={`rounded-circle z-depth-1 m-3 ${this.state.color}`} />
          	</div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button outline color='danger' onClick={this.props.toggle}>Cancel</Button>{' '}
          <Button color="primary" onClick={this.props.toggle}>Start Game</Button>
        </ModalFooter>
      </Modal>
		);
	}
}