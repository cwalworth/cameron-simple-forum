import React from 'react'
import { Link } from 'react-router-dom'

import SignUpForm from './SignUpForm'

import * as ROUTES from '../../constants/routes'

const SignUpPage = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm />
    </div>
  )
}

const SignUpLink = () => {
  return (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign up</Link>
    </p>
  )
}

export default SignUpPage

export { SignUpLink }
