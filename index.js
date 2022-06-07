const express = require('express')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const User = require('./User');

const port = process.env.PORT || 5007;

const app = express()
app.use(express.json(options = {limit: '10mb'}))
app.use(express.urlencoded({limit: '10mb'}));
app.use(cors())
app.use(compression());
app.use(helmet())

app.get("/", async (req, res) => {
    res.send("<h2>Greetings!</h2>");
})

app.get("/user", async (req, res) => {
    const users = await User.findAll();
    //console.dir(users)
    res.send(users);
})

app.post("/user", async (req, res) => {
    //console.dir(req.body);
    const data = await User.create(req.body);
    //console.dir(data);
    res.send(data);
})

app.get("/user/:id", async (req, res) => {
    const requestedId = req.params.id;
    const user = await User.findOne({
        where: {
            id: requestedId
        }
    });
    //console.dir(user);
    res.send(user);
})

app.put("/user/:id", async (req, res) => {
    const requestedId = req.params.id;
    const user = await User.findOne({
        where: {
            id: requestedId
        }
    });
    //console.dir(user);
    if(!user) {
        return res.send(user);
    }
    const {userName, email, password} = req.body;
    //console.log(userName, email, password);
    user.userName = userName ?? user.userName;
    user.email = email ?? user.email;
    user.password = password ?? user.password;

    const updatedUser = await user.save();
    //console.dir(updatedUser);
    res.send(updatedUser);
})

app.delete("/user/:id", async (req, res) => {
    const requestedId = req.params.id;
    await User.destroy({
        where: {
            id: requestedId
        }
    })
    res.send("user deleted");
})

const httpServer = app.listen(port,async () => {

    console.log(`Server listening on ${port}...`)
})
