import express , {Request , Response , Application} from 'express'
import userRoute from './routes/user.route'
import blogRoute from './routes/blog.route'

import {connectDB}  from './config/db'


const app:Application = express()
const port:number = 3000

app.use(express.json())


connectDB()

app.use('/blogs' ,blogRoute)
app.use('/users' ,userRoute)


app.listen(port , ()=> {
    console.log(`Express running on port:${port}`);
})