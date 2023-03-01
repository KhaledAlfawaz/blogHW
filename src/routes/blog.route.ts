import {  createBlog , getAllBlogs , getUserBlog , updateBlog , deleteAllBlogs , deleteBlog} from '../controller/blog.controller'
import express from 'express'

const route = express.Router()

route.get('/',getAllBlogs )

route.post('/',createBlog)

route.get('/:id',getUserBlog)

route.put('/:id',updateBlog)

route.delete('/user/:user_id',deleteAllBlogs)

route.delete('/:id',deleteBlog)





export default route;