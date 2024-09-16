const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const cors = require('cors')
const CryptoJS = require('crypto-js')


dotenv.config()



// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passify';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();

const secretKey = process.env.REACT_APP_SECRET_KEY ? process.env.REACT_APP_SECRET_KEY : '12345'

app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.find({}).toArray();
    findResult.map(item => {
        const bytes = CryptoJS.AES.decrypt(item.password, secretKey )
        item.password = bytes.toString(CryptoJS.enc.Utf8)
    })
    res.json(findResult)
})

app.post('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const data = req.body
    const Password = data.password
    const cipherText = CryptoJS.AES.encrypt(Password, secretKey).toString()
    data.password = cipherText
    const findResult = await collection.insertOne(data);
    res.send({succes:true,result:findResult})
})

app.delete('/', async(req, res) => {
    const Password = req.body
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.deleteOne(Password);
    res.send({succes:true,result:findResult})
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
