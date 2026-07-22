CREATE DATABASE stockinventory;

USE stockinventory;

CREATE TABLE user (
    UserID Int AUTO_INCREMENT PRIMARY KEY,
    FirstName VarChar(50) NOT NULL,
    LastName VarChar(50) NOT NULL ,
    PhoneNumber Varchar(50) NOT NULL,
    Email Varchar(50) NOT NULL,
    Password Varchar(100) NOT NULL
);

CREATE TABLE stock(
    UserID Int NOT NULL,
    ProductID Int NOT NULL,
    Quantity Int NOT NULL
);

CREATE TABLE product(
    ProductID Int AUTO_INCREMENT PRIMARY KEY,
    SKU Varchar(50) NOT NULL,
    ProductName Varchar(100) NOT NULL,
    Description Varchar(500),
    Category VarChar(50),
    Price Int, 
    StockCount Int,
    CreatedAt Date,
    UpdatedAt Date,
    Image Varchar(500) 
);

CREATE Table admin(
    UserID Int,
    AdminID Int AUTO_INCREMENT PRIMARY KEY
);