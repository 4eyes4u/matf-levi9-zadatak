const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Putting some products.
products = new Map();
products.set(0, {name: 'Panceta', description: 'Meso'});
products.set(1, {name: 'Voda', description: 'Tecnost'});
products.set(2, {name: 'Sok od pomorandze', description: 'Tecnost'});
products.set(3, {name: 'Oreo', description: 'Grickalice'});
products.set(4, {name: 'Pringles', description: 'Grickalice'});

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
    products.set(products.size, {name: name, description: description});
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