import React, { Component } from 'react'
import styled from 'styled-components'

import { withFirebase } from '../Firebase'

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
}

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.firebase
      .doPasswordUpdate(this.state.passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
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
    const { passwordOne, passwordTwo, error } = this.state
    const isValid = passwordOne !== passwordTwo || passwordOne === ''

    return (
      <FormWrapper>
        <div className="ui segment wrapper">
          <form onSubmit={e => this.handleSubmit(e)} className="ui form">
            <div className="field">
              <label>New Password</label>
              <input
                type="password"
                name="passwordOne"
                value={this.state.passwordOne}
                placeholder="Password"
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="field">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="passwordTwo"
                value={this.state.passwordTwo}
                placeholder="Password"
                onChange={e => this.handleChange(e)}
              />
            </div>
            <button className="ui blue button" type="submit" disabled={isValid}>
              Change Password
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

export default withFirebase(PasswordChangeForm)

const FormWrapper = styled.div`
  .wrapper {
    background: #c1e6f4;
  }
`
