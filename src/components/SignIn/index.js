import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { SignUpLink } from '../SignUp'
import { PasswordForgetLink } from '../PasswordForget'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const SignInPage = () => {
  return (
    <SignInPageStyle>
      <h1 className="sign-in">Sign In</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </SignInPageStyle>
  )
}

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class SignInFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }
  handleSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        this.setState({ error })
      })
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    const { email, password, error } = this.state
    const isValid = password === '' || email === ''
    return (
      <FormWrapper>
        <div className="ui segment wrapper">
          <form onSubmit={e => this.handleSubmit(e)} className="ui form">
            <div className="field">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="field">
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <button disabled={isValid} className="ui blue button" type="submit">
              Login
            </button>
          </form>
          {error && (
            <div className="ui error message">
              <p>{error.message}</p>
            </div>
          )}
        </div>
      </FormWrapper>
    )
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase)

export default SignInPage
export { SignInForm }

const FormWrapper = styled.div`
  .wrapper {
    background: #c1e6f4;
  }
`

const SignInPageStyle = styled.div`
  padding: 10px;
  .sign-in {
    text-align: center;
  }
`
