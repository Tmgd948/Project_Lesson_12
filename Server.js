import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect("")
    .then(() => {
        console.log("Mongo DB is connected...")
    })
    .catch((error) => {
        console.log("Error connecting to DB: " + error)
    });

const userSchema = new mongoose.Schema({
    "name": String,
    "email": String,
    "password": String
});

const user = mongoose.model("user", userSchema);



//Sign-In
app.post("/SignIn", async (req, res) => {
    const frontMail = req.body.Email;
    const frontPass = req.body.Password;

    const dbUser = await user.findOne({ email: frontMail }, "email password");

    if (dbUser === null) {
        res.send("notFound")
        return
    }
    if (dbUser.password === frontPass) {
        res.send("ok")
        return
    } else { res.send("wrongPass") }

});


// Sign-Up
app.post("/SignUp", async (req, res) => {
    const frontName = req.body.Name;
    const frontMail = req.body.Email;
    const frontPass = req.body.Password;

    const dbUser = await user.findOne({ email: frontMail });

    if (dbUser !== null) {
        res.send("exists");
        return;
    }

    const newUser = new user({
        name: frontName,
        email: frontMail,
        password: frontPass
    });

    await newUser.save();
    res.send("success");
});


//Shop
// get products part
app.get("/products", async (req, res) => {
    try {
        const products = await mongoose.connection.db.collection("products").find().toArray();
        res.json(products);
    } catch (error) {
        res.send("Error");
    }
});


const orderSchema = new mongoose.Schema({
    user: String,
    products: [{ name: String, price: Number }]
});

const Order = mongoose.model("Order", orderSchema);


// Handle buying part
app.post("/buy", async (req, res) => {
    const user = req.body.user;
    const products = req.body.products;

    if (!products || products.length === 0) {
        res.send("Error")
        return
    }

    try {
        const newOrder = new Order({ user: user, products: products });
        await newOrder.save();
        res.send("OK");
    } catch (error) {
        res.send("Error");
    }
});

//admin only part
app.get("/all", async (req, res) => {
    if (req.query.admin !== "true") {
        res.status(400).send("Access denied")
        return
    }
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.send("Error");
    }
});



app.listen(port, () => {
    console.log("Listening on " + port)
});
