import React from 'react'
import styled from 'styled-components'

import { withFirebase } from '../Firebase'

const SignOutButton = ({ firebase }) => {
  const handleClick = () => {
    console.log('signed out')
    firebase.doSignOut()
  }
  return (
    <SignOutStyles>
      <button onClick={() => handleClick()} className="ui red basic button">
        <i className="large material-icons">airline_seat_individual_suite</i>
      </button>
    </SignOutStyles>
  )
}

export default withFirebase(SignOutButton)

const SignOutStyles = styled.div`
  & button {
    font-size: 10px !important;
    padding: 5px 10px !important;
  }
`
