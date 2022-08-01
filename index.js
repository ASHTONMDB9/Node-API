const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally
const { Router } = require("express");
const jwt = require('jsonwebtoken');


const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 6969); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Dont let local development give errors




app.get("/", (req, res) => {
    res.json({ Greeting: "Welcome to my API" });
});

app.use('/users', require('./routes/userRoute'))

app.use('/products', require('./routes/productRoute'))

app.use('/orders', require('./routes/orderRoute'))

app.use('/categories', require('./routes/catergoryRoute'))


app.listen(app.get("port"), () => {
    console.log(`Listening for calls on port ${app.get("port")}`);
    console.log("Press Ctrl+C to exit server");
});

