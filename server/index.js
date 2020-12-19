const {  REDIS_PORT, REDIS_HOST, POSTGRES_USER, POSTGRES_HOST, POSTGRES_DATABASE, POSTGRES_PASSWORD, POSTGRES_PORT } = require('./keys');
const express = require('express');
const cors = require('cors');
const redis = require('redis');

const app = express();
app.use(cors())
app.use(express.json())

const { Pool } = require('pg');

const pgClient = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DATABASE,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT
});

pgClient.on('error', () => console.log('Lost PG connection!'))
pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)')
.catch(err => console.log(err));


const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();


app.get('/values/all', async (req,res) => {
    
    const values = await pgClient.query('SELECT * FROM values');

    res.send(values.rows);
})


app.get('/values/current', async (req,res) => {
    
     redisClient.hgetall('values', (err, values) => {
         res.send(values);
     })

})


app.post('/values', async (req,res) => {

    const index = req.body.index;
    if(parseInt(index) > 40){
        return status(422).send('Index too high');
    }

    redisClient.hset('values', index, 'nothing yet!');
    redisPublisher.publish('insert', index);
    pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

    res.send({ woring: true });
})

app.get('/', (req,res) => {
    res.send('hi')
})

app.listen(5000, () => console.log('listeinig'))