import express, { Express, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import connectDB from "@/config/connectDB";
import router from "@/routes/userRoute";
import path from "node:path";
dotenv.config()
const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine',  'ejs');

app.use(router)

app.get('/', (req: Request, res: Response) => {
    res.send('index')
})




connectDB()
app.listen(3000, () => {
    console.log('Server started on port 3000')
})