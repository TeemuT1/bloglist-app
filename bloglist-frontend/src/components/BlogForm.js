import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    const title = event.target.newBlogTitle.value
    const author = event.target.newBlogAuthor.value
    const url = event.target.newBlogUrl.value

    if(title && author && url) {
      const blogObject = {
        title,
        author,
        url
      }
      dispatch(createBlog(blogObject))
      event.target.newBlogTitle.value=''
      event.target.newBlogAuthor.value=''
      event.target.newBlogUrl.value=''
    }
    else {
      dispatch(setNotification('All fields are required to create a blog!', 'danger'))
    }
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="newBlogTitle"
            id="newBlogTitle"
          />

          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="newBlogAuthor"
            id="newBlogAuthor"
          />
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="text"
            name="newBlogUrl"
            id="newBlogUrl"
          />
          <Button id='create-blog-button' variant="primary" type="submit">
                Create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm