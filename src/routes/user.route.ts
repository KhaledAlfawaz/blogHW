import {  getAllUsers ,createUser,getUser,deleteUser } from '../controller/user.controller'
import express from 'express'

const route = express.Router()

route.get('/',getAllUsers )

route.post('/',createUser)

route.get('/:id',getUser)

route.delete('/:id',deleteUser)

export default route;