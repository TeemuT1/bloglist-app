import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import Blog from './Blog'
import { BrowserRouter as Router } from 'react-router-dom'
import store from '../store'

afterEach(cleanup)

let testStore
describe("Component Blog", () => {
  const testBlog = {
    id: '1',
    title: 'Test Blog',
    author: 'Test Author',
    likes: 3,
    url: 'www.test.com',
    user: {
      id: '123',
      username: 'testuser',
      name: 'Test Name'
    },
    comments :[ {blog: '1', comment: 'Nice blog', id: 123} ] 
  }
  
  beforeEach(() => {
    testStore = store
  })
  test('renders and includes blog details', async () => {
    const { getByText } = render(
      <Provider store={testStore}>
        <Router><Blog blog={testBlog}/></Router>
      </Provider>
    )
    expect(getByText(/Blog d/i).textContent).toBe('Blog details')
    expect(getByText(/Test Blog/i).textContent).toBe('Test Blog by Test Author')
    expect(getByText(/Likes:/i).textContent).toBe('Likes: 3 like')
    expect(getByText(/Url:/i).textContent).toBe('Url: www.test.com')
    expect(getByText(/Nice/i).textContent).toBe('Nice blog')

  })
})