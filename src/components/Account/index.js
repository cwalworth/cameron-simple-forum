import React from 'react'
import styled from 'styled-components'

import PasswordChangeForm from '../PasswordChange'
import { AuthUserContext, withAuthorization } from '../Session'

const AccountPage = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <ProfileStyles>
          <h2 className="email">Email: {authUser.email}</h2>
          <div className="change-your-password">
            <div className="title">
              <p className="change-password">Change your password</p>
            </div>
            <div className="">
              <PasswordChangeForm />
            </div>
          </div>
        </ProfileStyles>
      )}
    </AuthUserContext.Consumer>
  )
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(AccountPage)

const ProfileStyles = styled.div`
  margin: 10px;
  & .email {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 5vw;
  }
  & .change-your-password {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    width: 100% !important;
    max-width: 800px;
    margin: auto;
    & .title {
      font-size: 26px;
      margin-bottom: 10px;
      & .change-password {
        text-align: center;
      }
    }
  }
`
