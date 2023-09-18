const express = require('express')
const app = express()
const port = 3000
const cors = require('cors'); 

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let items = []

app.get('/items', (req, res) => {  
    res.send({"items" : items})

})

app.post('/items', (req, res) => {
    const newItem = {
      x: req.body.x,
      y: req.body.y,
      r: req.body.r,
      g: req.body.g,
      b: req.body.b,
    }
  
    items.push(newItem);
    res.send({"response" : `New Item at ${newItem.x}, ${newItem.y}`});
})
  

app.post('/clear', (req, res) => {    
    items = []
    res.send('Server cleared')
})


app.get('/', (req, res) => {    
    res.send('Server started')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
