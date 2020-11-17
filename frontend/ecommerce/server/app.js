const express = require("express");
const bodyParser = require("body-parser").json();
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const config = require('./config');
const authenticate = require('./authenticate');

const User = require('./models/user');
const Product = require('./models/product');

mongoose.Promise = global.Promise;
mongoose.connect(
    config.mongoURL,
    {useNewUrlParser: true}
);

//app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')))

app.post('/register', bodyParser, (req, res) => {
    console.log('In register area');
    console.log(req.body);
    const newUser = new User({
        name: req.body.fullName,
        email: req.body.email
    })
    newUser.password = newUser.generateHash(req.body.password);

    newUser.save().then(rec => {
        res.status(201).json(rec);
    })
})

app.post('/login', bodyParser, (req, res) => {
    console.log(req.body);
    User.findOne({email: req.body.email}).then(loginUser => {
        if(!loginUser) {
            return res.status(401).json({message: 'Invalid username or password'})
        }
        if(!loginUser.validatePassword(req.body.password)) {
            return res.status(401).json({message: 'Invalid username or password'})
        }
        const withTokem = {email: loginUser.email, _id: loginUser._id};
        withTokem.token = loginUser.generateJWT();
        res.status(200).json(withTokem)
        
    })
})

//TODO

app.get('/seeddb', bodyParser, (req, res) => {
    const data = [
{_id:"1Leqi2Bwt6Qqdnmww8U76jEuDAGAQ8TW7x",name:"MV Oil Trust",description:"Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",image:"http://dummyimage.com/355x225.png/5fa2dd/ffffff",price:83},
{_id:"1K47w1m2qkGvvNPQTHHdFoK7yjksHzUhjX",name:"First Trust Nasdaq Pharmaceuticals ETF",description:"Ut tellus. Nulla ut erat id mauris vulputate elementum.",image:"http://dummyimage.com/355x225.bmp/5fa2dd/ffffff",price:56},
{_id:"1KexAguTCKPE1atpCPmBs56RZ3XSRxmDjS",name:"Citigroup Inc.",description:"Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit.",image:"http://dummyimage.com/355x225.bmp/dddddd/000000",price:53},
{_id:"18Uc8i2pPbgnVUJWejqz4ZymxgAxBQJ27q",name:"LTC Properties, Inc.",description:"Nullam porttitor lacus at turpis.",image:"http://dummyimage.com/355x225.bmp/ff4444/ffffff",price:92},
{_id:"15keBx28W4pksDLZVjWpjDi8EPgpjgAN1G",name:"TCP Capital Corp.",description:"Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien.",image:"http://dummyimage.com/355x225.png/cc0000/ffffff",price:41},
{_id:"1CZ6bp4zntuYuGpYD62V9Bbn6gxBfx2BXU",name:"Carpenter Technology Corporation",description:"Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien.",image:"http://dummyimage.com/355x225.bmp/5fa2dd/ffffff",price:81},
{_id:"13AvELHbjzNGnVviy4z6XPpiYRjQPT5JFq",name:"ABM Industries Incorporated",description:"Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",image:"http://dummyimage.com/355x225.jpg/ff4444/ffffff",price:42},
{_id:"12mXoLSKBS8Sc7KHx99MDr626rTTXnSpWt",name:"MicroStrategy Incorporated",description:"Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",image:"http://dummyimage.com/355x225.bmp/cc0000/ffffff",price:22},
{_id:"16bMPwjD61qB39vyzP4xXqRpvjBXBJA276",name:"Syndax Pharmaceuticals, Inc.",description:"Sed accumsan felis. Ut at dolor quis odio consequat varius.",image:"http://dummyimage.com/355x225.png/5fa2dd/ffffff",price:93},
{_id:"19rgojCdAfnukNFRAbe8AjQB7FkARdqfA",name:"Rosetta Genomics Ltd.",description:"Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",image:"http://dummyimage.com/355x225.jpg/5fa2dd/ffffff",price:21},
{_id:"1NvZ6XevnX1HibRzRsLgtBmPagiUm1gkn9",name:"Ituran Location and Control Ltd.",description:"Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh.",image:"http://dummyimage.com/355x225.bmp/dddddd/000000",price:66},
{_id:"18aApC55FRzbuvQsDyiFfJjc2vdHXnmous",name:"Lifevantage Corporation",description:"Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula.",image:"http://dummyimage.com/355x225.jpg/cc0000/ffffff",price:78}];

data.forEach((product) => {
    const newProduct = new Product({
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price
        });
    //finished creating product schema
    newProduct.save();
    })
    res.send("ok");
})

app.get('/products', bodyParser, (req, res) => {
    Product.find().then(rec => {
        if(rec) {
            res.status(200).json(rec);
        } else {
            res.status(200).json([]);
        }
    })
})




app.get('/users', bodyParser, authenticate, (req, res) => {
    User.find().then(rec => {
        res.status(200).json(rec);
    }) 
})






app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.listen(3000, () => console.log("Listening on port 3000...."));