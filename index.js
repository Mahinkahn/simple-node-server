const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Simple Node Server Running');
});

app.use(cors());
app.use(express.json());

const users = [
    { id: 1, name: 'Sabana', email: 'sabana@gamil.com' },
    { id: 2, name: 'Sabnoor', email: 'sabnoor@gamil.com' },
    { id: 3, name: 'Sabila', email: 'sabila@gamil.com' },
];

// usernam: dbUser
// pass: RP33oGvbabNUZobz

// https://cloud.mongodb.com/v2/63837244dc189130ac0ecdd3#metrics/replicaSet/6383731cbf78f155b4624afe/explorer



const uri = "mongodb+srv://dbUser:RP33oGvbabNUZobz@cluster0.jnh0xtx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users');
        // const user = { name: 'Nahim khan', email: 'nehi@gmail.com' }
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users)
        })

        app.post('/users', async (req, res) => {
            console.log('Post API called');
            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;
            res.send(user);
        })
    }
    finally {

    }
}

run().catch(err => console.log(err))


// app.get('/users', (req, res) => {
//     if (req.query.name) {
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) > 0);
//         res.send(filtered);
//     }
//     else {
//         res.send(users);
//     }

// });

// app.post('/users', (req, res) => {
//     console.log('Post API called');
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(user)
//     res.send(user);
// })

app.listen(port, () => {
    console.log(`Simple not server runing on port ${port}`);
})