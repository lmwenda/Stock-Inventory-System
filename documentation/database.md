# Database

### User Table
    - User ID (Primary Key)
    - First Name
    - Last Name
    - PhoneNumber
    - Email
    - Password 

### Product Table
    - Product ID (Primary Key)
    - SKU
    - Product Name
    - Product Description
    - Product Category
    - Product Price 
    - Product StockCount
    - Product CreatedAt
    - Product UpdatedAt
    - Product Reviews 
    - Product Image

### Transaction Table
 - Transacation ID (Primary Key)
 - User ID (Foreign Key)
 - Orders[] (Multiple Product ID's)
 - Date 
 - Total // Price
 - Status // Completed, Failed, Pending, etc

### Inventory Table
    - UserID
    - ProductID