import express from 'express'
import {main} from './Connection/connection.mjs';
import router from './routes/routes.mjs';
const app = express()
const port = 3000

app.use("/uploads", express.static("uploads"));
app.use(express.json())
app.use('/api', router)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
