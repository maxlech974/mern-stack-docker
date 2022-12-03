const express = require('express');
const { MongoClient } = require('mongodb');

const url = process.env.NODE_ENV === 'production' ?  
`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@db:27017` : 
`mongodb://db:27017`;

console.log(url)

const client = new MongoClient(url);
let db;
let count;

const main = async () => {
  await client.connect();
  db = client.db('test');
  count = db.collection('count');
  return 'done';
};

main()
  .then(() => console.log('connection successful'))
  .catch((e) => console.error(e))


const app = express();

app.get('/api/count', (req, res) => {
  count.findOneAndUpdate({}, { $inc: { count: 1 } }, { rerurnNewDocument: true }).then((doc) => {
    const count = doc.value;
    res.status(200).json(count.count);
  })
  
})

app.all('*', (req, res) => {
  res.status(404).end();
})

app.listen(80);