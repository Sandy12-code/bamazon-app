var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require('./keys');

// create the connection information for the sql database
var connection = mysql.createConnection({
    // Your host
    host: keys.host,
    // Your port
    port: keys.port,
    // Your username
    user: keys.user,
    // Your password
    password: keys.password,
    // Your database
    database: keys.database
});

var allProducts = [];

function lookupProductById(id){
    var foundProduct = null;
    if( allProducts.length ){
        for( var i= 0; i< allProducts.length; i++ ){
            var currProduct = allProducts[i];
            if( currProduct.id == id ){
                foundProduct = currProduct;
            }
        }
    }
    return foundProduct;
}

connection.connect(function (err) {
    if (err) throw err;
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        allProducts = result;
        console.log(result);
        runsearch();
    });
}

function runsearch() {

    inquirer.prompt([
        {
            type: "input",
            message: "What is the product id you would like to buy ?",
            name: "productSelection",
        },
        

        {
            type: "input",
            message: "How many do you want to buy ?",
            name: "productQuantity",
        },

    ]).then(function (inquirerResponse) {
        var chosenProduct = lookupProductById(inquirerResponse.productSelection);
        
        if( !chosenProduct || isNaN(inquirerResponse.productQuantity) || parseInt(inquirerResponse.productQuantity) < 0 ){
            console.log('We are not able to process this order.');
            runsearch();
        }

        else {
            var newQty = chosenProduct.stock_quantity - parseInt(inquirerResponse.productQuantity);
            if( newQty >= 0 ){
                updateProduct(chosenProduct.id, newQty);
            }
            else {
                console.log('Insufficient quantity available.');
                runsearch();
            }
        }
    });
}
function updateProduct(productId, newStockQty) {
    connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: newStockQty
    },
    {
        id: productId
    }], function(err, res){
        if (err) throw err;
        console.log('Product ordered successfully.');
        runsearch();
    });

    afterConnection();
}

