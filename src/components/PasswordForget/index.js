import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const PasswordForgetPage = () => {
  return (
    <div>
      <h1>Password Forget</h1>
      <PasswordForgetForm />
    </div>
  )
}

const INITIAL_STATE = {
  email: '',
  error: null
}

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }
  handleSubmit = e => {
    e.preventDefault()
    const { email } = this.state

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
      })
      .catch(error => {
        this.setState({ error })
      })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { email, error } = this.state
    const isValid = email === ''

    return (
      <FormWrapper>
        <div className="ui segment wrapper">
          <form action="" className="ui form">
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={this.state.email}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <button disabled={isValid} className="ui blue button">
              Reset Password
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

const PasswordForgetLink = () => {
  return (
    <p>
      <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
  )
}

export default PasswordForgetPage

const PasswordForgetForm = withFirebase(PasswordForgetFormBase)

export { PasswordForgetForm, PasswordForgetLink }

const FormWrapper = styled.div`
  .wrapper {
    background: #c1e6f4;
  }
`
