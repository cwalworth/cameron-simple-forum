import React from 'react'
import styled from 'styled-components'

const TopicTabs = ({ makeActive, handleTopicChange, topics }) => {
  return (
    <TopicTabsStyles className="ui top attached tabular menu">
      <a
        name="topic1"
        title={topics.topic1}
        onClick={handleTopicChange}
        className={`item ${makeActive('topic1')}`}
      >
        <div className="icon-wrapper">
          <i className="large material-icons">whatshot</i>
          <span>{topics.topic1}</span>
        </div>
      </a>
      <a
        name="topic2"
        title={topics.topic2}
        onClick={handleTopicChange}
        className={`item ${makeActive('topic2')}`}
      >
        <div className="icon-wrapper">
          <i className="large material-icons">code</i>
          <span>{topics.topic2}</span>
        </div>
      </a>
      <a
        name="topic3"
        title={topics.topic3}
        onClick={handleTopicChange}
        className={`item ${makeActive('topic3')}`}
      >
        <div className="icon-wrapper">
          <i className="large material-icons">videogame_asset</i>
          <span>{topics.topic3}</span>
        </div>
      </a>
      <a
        name="topic4"
        title={topics.topic4}
        onClick={handleTopicChange}
        className={`item ${makeActive('topic4')}`}
      >
        <div className="icon-wrapper">
          <i className="large material-icons">face</i>
          <span>{topics.topic4}</span>
        </div>
      </a>
    </TopicTabsStyles>
  )
}

export default TopicTabs

const TopicTabsStyles = styled.div`
  & .active {
    text-shadow: 2px 2px 2px rgba(65, 131, 196, 0.5);
    border-bottom: 1px solid white !important;
  }
  & a {
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    font-size: 5px;
    background: transparent !important;
    & span {
      visibility: hidden;
    }
    & .icon-wrapper {
      z-index: -1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
  & i {
    font-size: 10vw;
  }
  @media screen and (min-width: 381px) {
    & a {
      font-size: 10px;
      & span {
        visibility: visible;
      }
    }
    & i {
      font-size: 30px;
    }
  }
  @media screen and (min-width: 481px) {
    & a {
      font-size: 14px;
      & span {
        visibility: visible;
      }
    }
    & i {
      font-size: 30px;
    }
  }
  @media screen and (min-width: 768px) {
    & a {
      font-size: 20px;
    }
    & i {
      font-size: 40px;
    }
  }
`
