const express = require('express')
const app = express()
const connect = require('./schemas/index')
const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comments')

connect()
app.listen(3000, () => console.log(`sever live at "http://localhost:3000"`))

app.use(express.json());
app.use('/api/comment', commentRouter)
app.use('/api/post', postRouter)