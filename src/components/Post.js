import React from 'react'
import styled from 'styled-components'

const Post = ({ onSubmit, handleChange, value }) => {
  return (
    <PostStyles className="ui bottom attached segment">
      <form className="form" onSubmit={onSubmit}>
        <textarea
          name="post"
          id=""
          cols="30"
          rows="2"
          onChange={handleChange}
          value={value}
          className="text"
        />
        <button className="ui button primary">
          <i className="large material-icons">arrow_forward_ios</i>
        </button>
      </form>
    </PostStyles>
  )
}

export default Post

const PostStyles = styled.div`
  max-width: 100vw;
  .ui.button.primary {
    height: 40px;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 400px) {
      padding: 0 10px;
    }
  }
  .form {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
  }
  .text {
    border: 2px solid #1578c2;
    width: 100%;
    margin: 5px;
    border-radius: 4px;
  }
`
