DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("clothes", "retail", 100, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shoes", "retail", 50, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("purses", "retail", 250, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("phones", "electronics", 200, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tv", "electronics", 300, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptops", "electronics", 230, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("books", "library", 75, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("milk", "grocery", 10, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("banana", "grocery", 5, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("apple", "grocery", 7, 55);

