import React, { Component } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { withAuthorization } from './Session'
import TopicTabs from './TopicTabs'
import Post from './Post'
import PostList from './PostList'

const INITIAL_STATE = {
  topic: 'topic1',
  title: 'General',
  youtube: '',
  image: '',
  userName: '',
  posts: []
}

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }
  componentDidMount() {
    this.props.firebase.db
      .collection('users')
      .doc(this.props.firebase.auth.currentUser.uid)
      .get()
      .then(doc => {
        return this.setState({
          userName: doc.data().userName
        })
      })
      .catch(err => console.log(err))

    const collectionRef = this.props.firebase.db.collection(this.state.topic)

    collectionRef
      .orderBy('date', 'desc')
      // .limit(50)
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data())
        this.setState({
          posts: data
        })
      })
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.topic !== prevState.topic) {
      const collectionRef = this.props.firebase.db.collection(this.state.topic)
      collectionRef
        .orderBy('date', 'desc')
        // .limit(50)
        .onSnapshot(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data())
          this.setState({
            posts: data
          })
        })
    }
  }
  onSubmit = e => {
    e.preventDefault()
    const { topic, post, youtube, image, userName } = this.state
    this.props.firebase.db
      .collection(topic)
      .add({
        userId: this.props.firebase.auth.currentUser.uid,
        post,
        date: Math.floor(Date.now()),
        userName
      })
      .then(function(docRef) {})
      .then(
        this.setState({
          post: '',
          date: '',
          youtube: '',
          image: ''
        })
      )
      .catch(function(error) {
        console.error('Error adding document:', error)
      })
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  getPosts = () => {
    return this.state.posts
  }
  render() {
    const { topic } = this.state
    const makeActive = t => {
      return topic === t ? 'active' : ''
    }
    const handleTopicChange = e => {
      e.preventDefault()
      this.setState({
        topic: e.target.name,
        title: e.target.title
      })
    }
    return (
      <TopicTabsStyles>
        <TopicTabs
          makeActive={makeActive}
          handleTopicChange={e => handleTopicChange(e)}
          topics={{
            topic1: 'General',
            topic2: 'Dev Stuff',
            topic3: 'Video Games',
            topic4: 'Hobby Talk'
          }}
        />
        <Post
          onSubmit={this.onSubmit}
          handleChange={this.handleChange}
          value={this.state.post}
        />
        <PostList
          users={this.state.posts}
          topic={this.state.title}
          posts={() => this.getPosts()}
        />
      </TopicTabsStyles>
    )
  }
}

const condition = authUser => !!authUser
export default withAuthorization(condition)(HomePage)

const TopicTabsStyles = styled.div`
  margin-top: 10px;
`
