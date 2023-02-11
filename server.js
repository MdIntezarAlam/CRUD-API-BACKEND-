import express from 'express'
import dotenv from 'dotenv'
import userRouter from './router/userRouter.js'
import connectDatabse from './database/Db.js'


const app = express()
app.use(express.json())

dotenv.config({ path: "config/.env" })
app.use("/alluser", userRouter)

app.listen(process.env.PORT, () => {
    console.log(`server is on localhost ${process.env.PORT}`);
})
connectDatabse()