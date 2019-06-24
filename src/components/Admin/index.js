import React, { Component } from 'react'
import styled from 'styled-components'

import { withFirebase } from '../Firebase'
import { withAuthorization } from '../Session'

const adminAccess = process.env.REACT_APP_ADMIN
const adminAccess2 = process.env.REACT_APP_ADMIN2

class AdminPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      users: [],
      activeUser: {}
    }
  }
  componentDidMount() {
    this.setState({ loading: true })
    this.props.firebase
      .users()
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const usersList = (doc.id, '=>', doc.data())
          usersList.id = doc.id
          this.setState({
            users: [...this.state.users, usersList],
            loading: false
          })
        })
      })
      .catch(error => {
        console.log('Error getting documents', error)
      })
  }
  componentWillUnmount() {
    this.props.firebase.users()
  }
  handleClick = user => {
    this.setState({
      activeUser: user
    })
  }
  render() {
    const currentUser = this.props.firebase.auth.currentUser.email
    const { activeUser, loading } = this.state
    const ul = (
      <ul>
        {this.state.users.map(user => {
          return (
            <li onClick={() => this.handleClick(user)} key={user.email}>
              {user.userName}
            </li>
          )
        })}
      </ul>
    )
    const userInfo = !loading && Object.keys(activeUser).length > 0 && (
      <div>
        <h3>User Info For: {this.state.activeUser.userName}</h3>
        {
          <div className="ui segment">
            <div className="ui two column very relaxed grid">
              <div className="column">
                <p>
                  <i className="users icon" />
                  {this.state.activeUser.firstName}
                </p>
                <p>
                  <i className="mail icon" />
                  {this.state.activeUser.email}
                </p>
                <p>
                  <i className="linkify icon" />
                  {this.state.activeUser.id}
                </p>
                <p>Last Login</p>
              </div>
              {/* <div className="column">
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
              </div> */}
            </div>
            <div className="ui vertical divider">
              <img
                className="ui avatar image"
                style={{ margin: 0 }}
                src={`https://api.adorable.io/avatars/285/${
                  this.state.activeUser.id
                }.png`}
              />
            </div>
          </div>
        }
      </div>
    )
    return (
      <div className="ui container">
        {currentUser === adminAccess || currentUser === adminAccess2 ? (
          <UserInfoStyles>
            <h1>Admin</h1>
            <p>users</p>
            {ul}
            {userInfo}
          </UserInfoStyles>
        ) : (
          <div>
            <h1>You are not authorized to view this page</h1>
          </div>
        )}
      </div>
    )
  }
}

const UserInfoStyles = styled.ul`
  padding: 0 !important;
  & ul {
    border: 1px solid black;
    list-style-type: none;
    max-height: 80px;
    overflow-y: scroll;
    & li:hover {
      color: darkblue;
      cursor: pointer;
    }
  }
`

const condition = authUser => !!authUser
export default withAuthorization(condition)(withFirebase(AdminPage))
