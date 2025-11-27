import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import {main} from './Connection/connection.mjs';
import router from './routes/routes.mjs';
import cors from 'cors';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api', router)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
