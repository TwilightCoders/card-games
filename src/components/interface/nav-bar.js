import React from 'react'
import {
  Header,
  Button,
  Menu,
} from 'grommet'

import { useHistory } from 'react-router-dom'

import * as Icons from 'grommet-icons'

import { Auth } from 'aws-amplify';

export const NavBar = () => {
  const history = useHistory()

  return (
    <Header background="brand">
      <Button
        icon={<Icons.Home color="text" />}
        hoverIndicator
        onClick={() => history.push('/')}
      />
      <Menu
        label="Actions"
        color="text"
        justifyContent="end"
        items={[
          {
            label: 'Create Game',
            onClick: () => history.push('/createGame')
          },{
            label: 'Log Out',
            gap: 'small',
            icon: <Icons.Logout />,
            reverse: true,
            onClick: () => Auth.signOut().catch(err => {throw new Error(err)})
          },
        ]}
        icon={<Icons.Down color="text" size="small" />}
      />
    </Header>
  )
}

export default NavBar