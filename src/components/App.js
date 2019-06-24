import React from 'react'
import { HashRouter as Router, Route, history } from 'react-router-dom'

import Navigation from './Navigation'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import HomePage from './HomePage'
import Account from './Account'
import PasswordForget from './PasswordForget'
import Admin from './Admin'
import * as ROUTES from '../constants/routes'
import { withAuthentication } from './Session'

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Navigation params={``} />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.PROFILE} component={Account} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
          <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
          <Route
            exact
            path={ROUTES.PASSWORD_FORGET}
            component={PasswordForget}
          />
          <Route exact path={ROUTES.ADMIN} component={Admin} />
        </div>
      </Router>
    </div>
  )
}

export default withAuthentication(App)
