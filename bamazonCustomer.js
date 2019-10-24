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




//  

//     function searchProductName() {
//         inquirer.prompt([
//             {
//                 type: "input",
//                 message: "What is the product name you would like to buy ?",
//                 name: "nameInput"
//             }
//         ]).then(function (inquirerResponse) {

//             var query = connection.query(
//                 "SELECT * FROM bamazon_DB.products WHERE ?",
//                 {
//                     product_name: inquirerResponse.nameInput
//                 },
//                 function (err, response) {
//                     if (err)
//                         throw err;
//                     console.log("------------------------");

//                     for (var i = 0; i < response.length; i++)
//                         console.log(response[i].id + " : " + response[i].product_name + ", " + response[i].price + ", " + response[i].stock_quantity);
//                     console.log("-----------------------");
//                 }
//             );
//         })
//     }


//     function searchProductQuantity() {
//         inquirer.prompt([
//             {
//                 type: "input",
//                 message: "How many units of products would you like to buy ?",
//                 name: "numInput"
//             }
//         ]).then(function (inquirerResponse) {

//             var query = connection.query(
//                 "SELECT * FROM bamazon_DB.products WHERE ?",
//                 {
//                     stock_quantity: inquirerResponse.numInput
//                 },
//                 function (err, response) {
//                     if (err)
//                         throw err;
//                     console.log("------------------------");

//                     for (var i = 0; i < response.length; i--)

//                         if (response.length >= quantityInput)
//                             console.log(response[i].id + " : " + response[i].product_name + ", " + response[i].price + ", " + response[i].stock_quantity);

//                         else {
//                             console.log('insufficient quantity');

//                             updateProduct();
//                         }

//                 }
//             )

//             function updateProduct() {
//                 console.log("Updating stock_quantity...\n");
//                 var query = connection.query(
//                     "UPDATE products SET ? WHERE ?",
//                     [
//                         {
//                             stock_quantity: 50
//                         },

//                         {
//                             product_name: "clothes",
//                         }
//                     ],
//                     function (err, res) {
//                         if (err) throw err;
//                         console.log(res.affectedRows + " products updated!\n");
//                         // Call deleteProduct AFTER the UPDATE completes
//                         deleteProduct();
//                     }
//                 );
//             }

//         })
//     }
// }







