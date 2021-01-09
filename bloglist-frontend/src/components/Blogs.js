import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Blogs = () => {

  const compareLikes = (a, b) => { return b.likes - a.likes }
  const blogs = useSelector(
    state => state.blogs.slice().sort(compareLikes))


  return (
    <div>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          <tr><th>Title</th><th>Author</th></tr>
          {blogs.map(blog =>
            <tr className='blog' key={ blog.id }>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}
export default Blogs