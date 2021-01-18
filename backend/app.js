const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;
const maxMapKey = 100000000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

function generateMapKey() {
    return Math.floor(Math.random() * maxMapKey);
}

// Putting some products.
products = new Map();
products.set(generateMapKey(), {name: 'Panceta', description: 'Meso'});
products.set(generateMapKey(), {name: 'Voda', description: 'Tecnost'});
products.set(generateMapKey(), {name: 'Sok od pomorandze', description: 'Tecnost'});
products.set(generateMapKey(), {name: 'Oreo', description: 'Grickalice'});
products.set(generateMapKey(), {name: 'Pringles', description: 'Grickalice'});

// Transform raw Map to JSON format.
function productsToJSON() {
    let data = {}
    for ([key, value] of products) {
        data[key] = value
    }

    return data;
};

app.get('/admin/proizvodi', (req, res) => {
    res.send(productsToJSON());
});

app.post('/admin/unos-novog-proizvoda', (req, res) => {
    // Reading data from body.
    let name = req.body.name;
    let description = req.body.description;

    // Adding new product to Map.
    products.set(generateMapKey(), {name: name, description: description});
    res.send(productsToJSON());
});

app.delete('/admin/proizvodi', (req, res) => {
    // Deleting proper product.
    let key = req.body.id;
    products.delete(key);

    // Returning remaining products.
    data = productsToJSON();
    res.send(data);
});


app.listen(port, () => {
    console.log(`Listening on htpp://localhost:${port}`)
})