import express from 'express'
import connectionDB from './db/connectionDB.js'
import userRouter from './src/modules/users/user.routes.js'
import postRouter from './src/modules/posts/post.routes.js'
import commentRouter from './src/modules/comments/comment.routes.js'
const app = express()
const port = 3000

connectionDB()

app.use(express.json())
app.use("/",userRouter)
app.use("/",postRouter)
app.use("/",commentRouter)
app.use('*', (req, res) => res.status(404).json({ msg: "404 not found" }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))