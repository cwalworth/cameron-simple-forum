import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SignOutButton from '../components/SignOut'
import * as ROUTES from '../constants/routes'
import { withFirebase } from './Firebase'
import { AuthUserContext, withAuthorization } from './Session'
import '../_sass/hamburgers/hamburgers.scss'

const adminAccess = process.env.REACT_APP_ADMIN

const INITIAL = {
  home: false,
  profile: false,
  admin: false,
  signUp: false,
  signIn: false,
  forgotPassword: false
}
let active = { ...INITIAL }

const handleHighlight = e => {
  active = { ...INITIAL }
  active[e.target.name] = true
}
class NavigationAuth extends Component {
  state = {
    animation: 'overlay',
    direction: 'right',
    visible: false
  }
  toggleShowClick = () =>
    this.setState(prevState => ({ visible: !prevState.visible }))
  render() {
    const { admin } = this.props
    return (
      <MobileNavStyles
        onClick={this.toggleShowClick}
        visible={this.state.visible}
      >
        <button
          className={`hamburger hamburger--collapse ${
            this.state.visible ? 'is-active' : ''
          }`}
          type="button"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
        <Sidebar
          as={Menu}
          animation={this.state.animation}
          direction={this.state.direction}
          icon="labeled"
          inverted
          vertical
          visible={this.state.visible}
          width="thin"
        >
          <Menu.Item>
            <Link
              to={ROUTES.HOME}
              name="home"
              className="item"
              onClick={e => handleHighlight(e)}
            >
              <i className="home icon" />
              Home
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to={ROUTES.PROFILE}
              name="profile"
              className="item"
              onClick={e => handleHighlight(e)}
            >
              <i className="address card outline icon" />
              Profile
            </Link>
          </Menu.Item>
          {admin && (
            <Menu.Item>
              <Link
                to={ROUTES.ADMIN}
                name="admin"
                className="item"
                onClick={e => handleHighlight(e)}
              >
                <i className="terminal icon" />
                Admin
              </Link>
            </Menu.Item>
          )}
          <Menu.Item>
            <Link to={ROUTES.SIGN_IN} className="item">
              <SignOutButton />
            </Link>
          </Menu.Item>
        </Sidebar>
      </MobileNavStyles>
    )
  }
}

const NavigationNonAuth = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link
        name="signUp"
        onClick={e => handleHighlight(e)}
        to={ROUTES.SIGN_UP}
        className={`item ${active.signUp ? 'active' : ''}`}
      >
        Sign up
      </Link>
      <Link
        name="signIn"
        onClick={e => handleHighlight(e)}
        to={ROUTES.SIGN_IN}
        className={`item ${active.signIn ? 'active' : ''}`}
      >
        Sign in
      </Link>
      <Link
        name="forgotPassword"
        onClick={e => handleHighlight(e)}
        to={ROUTES.PASSWORD_FORGET}
        className={`item ${active.forgotPassword ? 'active' : ''}`}
      >
        Forgot Password
      </Link>
    </div>
  )
}

class Navigation extends React.Component {
  render() {
    const currentUser = this.props.firebase.auth.currentUser
    const currentUserEmail = currentUser !== null ? currentUser.email : null
    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? (
              <NavigationAuth admin={adminAccess === currentUserEmail} />
            ) : (
              <NavigationNonAuth />
            )
          }
        </AuthUserContext.Consumer>
      </div>
    )
  }
}

export default withFirebase(Navigation)

const NavStyles = styled.nav`
  position: fixed;
  background: lightblue !important;
  z-index: 1;
  width: 100vw;
  top: 0;
  .logout-button {
    padding: 5px !important;
  }
`
const MobileNavStyles = styled.nav`
  position: fixed;
  background: rgba(135, 206, 235, 0.5) !important;
  z-index: 1;
  width: ${props => (props.visible ? '100vw' : '0px')};
  height: ${props => (props.visible ? '100vh' : '0px')};
  top: 0;
  right: 0;
  & .menu {
    background: darkslategray !important;
    padding-top: 40px !important;
  }
  & .hamburger {
    position: fixed;
    z-index: 103;
    top: 0;
    right: 0;
  }
`
