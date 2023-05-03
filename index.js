const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/products',(req,res)=>{
    console.log('Hello from the products');
    res.send('Hello from the products')
});

app.post('/api/user',(req,res)=>{
    console.log(req.body);
    console.log('Hello from user');
    res.send('Hello from user POST');
})
app.get('/',(req,res) => {
    res.send("Hello World")
});

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
