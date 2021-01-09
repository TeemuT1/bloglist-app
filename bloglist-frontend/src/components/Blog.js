import React from 'react'
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Blog = ({ blog }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleComment = async (event) => {
    event.preventDefault()
    const comment = event.target.newComment.value
    if(comment !== '') {
      dispatch(addComment(blog.id, comment))
      event.target.newComment.value = ''
    }
    else {
      dispatch(setNotification('Cannot add an empty comment', 'danger'))
    }
  }

  if(!blog) {
    return null
  }

  let showButtonToOwner = { display: 'none' }
  if (user) {
    showButtonToOwner = { display: blog.user.username === user.username ? '' : 'none' }
  }

  return (
    <div className='blog' style={blogStyle}>
      <h2>Blog details</h2>

      <Table striped>
        <tbody>

          <tr className='blog-info'>
            <td>{blog.title} by {blog.author}</td>
          </tr>

          <tr className='blog-url'>
            <td>Url: {blog.url}</td>
          </tr>

          <tr className='blog-likes'>
            <td>Likes: <span className='like-value'>{blog.likes} </span>
              <Button className='like-button' variant='primary'
                onClick={() => dispatch(likeBlog(blog.id))}>like</Button>
            </td>
          </tr>

          <tr>
            <td>Added by: {blog.user.name}</td>
          </tr>

        </tbody>
      </Table>

      <div style={showButtonToOwner}>
        <Button variant='danger' onClick={() => dispatch(deleteBlog(blog.id))}>remove blog</Button>
      </div>

      <hr/>

      <div className='comments'>
        <h3 className='comments-heading'>Comments</h3>

        <Form onSubmit={handleComment}>
          <Form.Control
            id='newComment'
            name='newComment'
            type='text'
          />
          <Button id='add-comment-button' variant='primary' type="submit">add comment</Button>
        </Form>

        <ul className='comment-list'>
          {blog.comments.map(comment =>
            <div key={ comment.id } className='comment-item'>
              <li>{comment.comment}</li>
            </div>
          )}
        </ul>

      </div>
    </div>
  )
}
export default Blog
