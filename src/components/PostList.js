import React from 'react'
import styled from 'styled-components'

const PostList = ({ posts, topic, users }) => {
  return (
    <PostListStyles style={{ overflowY: 'scroll', maxHeight: '80vh' }}>
      <h1>{topic}</h1>
      <div className="ui list">
        {users.map((post, i) => {
          return (
            <div key={post.post + i} className="item">
              <img
                src={`https://api.adorable.io/avatars/285/${post.userId}.png`}
                alt="avatar"
                className="ui avatar image"
              />
              <div className="content">
                <div className="top-line">
                  <a className="header">{post.userName}</a>
                  <span className="timestamp">
                    {new Date(post.date).toLocaleString()}
                  </span>
                </div>
                <div className="description">{post.post}</div>
              </div>
            </div>
          )
        })}
      </div>
    </PostListStyles>
  )
}

export default PostList

const PostListStyles = styled.div`
  .ui.list {
    max-width: 800px;
    margin: auto;
  }
  padding: 5px;
  .item {
    font-size: 18px;
    display: flex !important;
    padding: 10px !important;
    flex-direction: row;
    width: 100%;
    & .avatar {
      border: 1px solid darkgray;
    }
    & .top-line {
      display: flex;
      border-bottom: 2px dashed skyblue;
      & .header {
        margin-right: 10px;
      }
    }
    & .content {
      border: 2px solid lightblue;
      background: aliceblue;
      padding: 5px !important;
      border-radius: 5px;
      width: 100% !important;
      & .description {
        padding-left: 10px;
      }
  }
`
