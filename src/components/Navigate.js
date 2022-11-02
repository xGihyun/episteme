import React from 'react'
import { NavLink } from 'react-router-dom'
import { topicItems } from './TopicItems'

const Navigate = () => {
  
  return (
    <div className='topic-container'>
      <div className='topic-grid'>
        {topicItems.map((topic) => {
          return (
            <NavLink to={topic.path} className={({isActive}) => (isActive ? 'topic-card active' : 'topic-card')}>
              <div className='card-body'>
                <h1>{topic.name}</h1>
                <p>{topic.description}</p>
              </div>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default Navigate