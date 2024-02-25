const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT


//middleware
app.use(express.json());
app.use(cors())


const arr = [];

app.get('/', (req, res) => {
    res.send("hello world")
})

// get all users
app.get('/api/v1/users', (req, res) => {
    
    res.send(arr)
    
})

//add user
app.post('/api/v1/users', (req, res) => {
    const { todo } = req.body;
    arr.push({
        todo: todo,
        id: Date.now(),
    })
    res.send('todo added successfully');
})

//delete user
app.delete('/api/v1/users/:id', (req, res) => {
    const { id } = req.params
    const index = arr.findIndex((user) => user.id === Number(id));
    if (index === -1) {
        res.send('user not found');
        return
    }
    arr.splice(index, 1);
    res.send('user deleted');
})

// edit user
app.put('/api/v1/users/:id', (req, res) => {
    const { editValue } = req.body;
    const { id } = req.params;
    const index = arr.findIndex((user) => user.id === Number(id));
    if (index === -1) {
        res.send('user not found');
        return
    }
    arr[index].todo = editValue
    res.send('user edited successfully')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})