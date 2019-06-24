import React from 'react'
import styled from 'styled-components'

const Post = () => {
  return (
    <div className="ui raised link card">
      <div className="content">
        <div className="header">This is the header</div>
        <div className="meta">
          <span className="category">This is some category</span>
        </div>
        <div className="description">
          <p>This is some content</p>
        </div>
        <div className="extra content">
          <div className="right floated author">
            <img src="" alt="avatar" className="ui avatar image" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
