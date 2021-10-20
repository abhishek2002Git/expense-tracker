const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();


const app = express()
const port = 5000

app.get('/express', (req, res) => { res.send('Hello from Express!')})

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/trans', require('./routes/trans'))

app.listen(process.env.PORT || port, () => {
  console.log(`Expense-Tracker BackEnd listening at http://localhost:${port}`)
})
