import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title, author, URI and likes', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    likes: 3,
    url: 'www.test.com',
    user: {
      id: '123',
      username: 'testuser',
      name: 'Test Name'
    }
  }

  const component = render(
    <Blog blog={blog}/>
  )

  expect(component.container).toHaveTextContent(
    'Test Blog'
  )
  expect(component.container).toHaveTextContent(
    'Test Author'
  )
  expect(component.container).toHaveTextContent(
    'www.test.com'
  )
  expect(component.container).toHaveTextContent(
    'Likes: 3'
  )
})