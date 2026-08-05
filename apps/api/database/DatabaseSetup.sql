CREATE DATABASE IF NOT EXISTS StockInventory;

USE StockInventory;

CREATE TABLE IF NOT EXISTS `User` (
    UserID INT NOT NULL AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    PhoneNumber VARCHAR(50) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,

    PRIMARY KEY (UserID),
    UNIQUE KEY unique_user_email (Email)
);

CREATE TABLE IF NOT EXISTS product (
    ProductID INT NOT NULL AUTO_INCREMENT,
    SKU VARCHAR(50) NOT NULL,
    ProductName VARCHAR(100) NOT NULL,
    Description VARCHAR(500),
    Category VARCHAR(50),
    Price DECIMAL(10, 2),
    StockCount INT NOT NULL DEFAULT 0,
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    Image VARCHAR(500),

    PRIMARY KEY (ProductID),
    UNIQUE KEY unique_product_sku (SKU)
);

CREATE TABLE IF NOT EXISTS stock (
    UserID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL DEFAULT 0,

    PRIMARY KEY (UserID, ProductID),

    CONSTRAINT fk_stock_user
        FOREIGN KEY (UserID)
        REFERENCES `User`(UserID)
        ON DELETE CASCADE,

    CONSTRAINT fk_stock_product
        FOREIGN KEY (ProductID)
        REFERENCES product(ProductID)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admin (
    AdminID INT NOT NULL AUTO_INCREMENT,
    UserID INT NOT NULL,

    PRIMARY KEY (AdminID),
    UNIQUE KEY unique_admin_user (UserID),

    CONSTRAINT fk_admin_user
        FOREIGN KEY (UserID)
        REFERENCES `User`(UserID)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `Transaction` (
    OrderID INT NOT NULL AUTO_INCREMENT,
    TransactionID VARCHAR(100),
    UserID INT NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    Currency VARCHAR(10) NOT NULL,
    Status VARCHAR(50) NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (OrderID),
    UNIQUE KEY unique_transaction_id (TransactionID),

    CONSTRAINT fk_transaction_user
        FOREIGN KEY (UserID)
        REFERENCES `User`(UserID)
        ON DELETE CASCADE
);