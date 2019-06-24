import React, { Component } from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'

import * as ROUTES from '../../constants/routes'

const INITIAL_STATE = {
  firstName: '',
  userName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}

class SignUpFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }
  onSubmit = e => {
    const { firstName, userName, email, passwordOne } = this.state
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // create user in firestore
        return this.props.firebase.user(authUser.user.uid).set({
          firstName,
          userName,
          email
        })
      })
      .then(() => {
        this.setState({
          ...INITIAL_STATE
        })
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        this.setState({ error })
      })
    e.preventDefault()
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleReset = () => {
    this.setState({
      ...INITIAL_STATE
    })
  }
  render() {
    const {
      firstName,
      userName,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state
    const isValid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      firstName === '' ||
      userName === ''
    return (
      <FormWrapper>
        <div className="ui segment wrapper">
          <form onSubmit={this.onSubmit} className="ui form">
            <div className="field">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="field">
              <label htmlFor="">User Name</label>
              <input
                type="text"
                name="userName"
                placeholder="User Name"
                value={userName}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="field">
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="field">
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="passwordOne"
                placeholder="Password"
                value={passwordOne}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="field">
              <label htmlFor="">Confirm Password</label>
              <input
                type="password"
                name="passwordTwo"
                placeholder="Password"
                value={passwordTwo}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <button disabled={isValid} className="ui blue button" type="submit">
              Create Account
            </button>
            <button
              className="ui red button"
              type="submit"
              onClick={this.handleReset}
            >
              Reset
            </button>
            {error && (
              <div className="ui error message">
                <p>{error.message}</p>
              </div>
            )}
          </form>
        </div>
      </FormWrapper>
    )
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase)

export default SignUpForm

const FormWrapper = styled.div`
  .wrapper {
    background: #c1e6f4;
  }
`
