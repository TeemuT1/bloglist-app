import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from '../store'

afterEach(cleanup)

let testStore

beforeEach(() => {
  testStore = store
})

test('BlogForm can change the field values', () => {
  const createBlog = jest.fn()

  const component = render(
    <Provider store={testStore}>
      <Router><BlogForm /></Router>
    </Provider>
  )


  const title = component.container.querySelector('#newBlogTitle')
  const author = component.container.querySelector('#newBlogAuthor')
  const url = component.container.querySelector('#newBlogUrl')

  fireEvent.change(title, {
    target: { value: 'Test Title' }
  })
  fireEvent.change(author, {
    target: { value: 'Test Author' }
  })
  fireEvent.change(url, {
    target: { value: 'www.testurl.com' }
  })

  expect(title.value).toBe('Test Title')
  expect(author.value).toBe('Test Author')
  expect(url.value).toBe('www.testurl.com')

})