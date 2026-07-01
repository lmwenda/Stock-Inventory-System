# Database

### User Table
    - User ID (Primary Key)
    - Username
    - PhoneNumber
    - Email
    - Password 
    - Orders[] (Foreign Key)
    - Inventory[] 
    - Transactions[] ( Foreign Key )

### Product Table
    - Product ID (Primary Key)
    - Product Name
    - Product Price 
    - Product Reviews 
    - Product Image

### Order Table
    - Order ID (Primary Key)
    - Product ID (Foreign Key)
    - Product Name
    - UserID (Foreign Key) // Who this Order is connected to 
    - DeliveryDate
    - OrderDate 
    - Product Quantity
    - Status // OrderCreated, OrderFailed, etc

### Transaction Table
 - Transacation ID (Primary Key)
 - Order ID (Foreign Key)
 - User ID (Foreign Key)
 - Date 
 - Total // Price
 - Status // Completed, Failed, Pending, etc

### Inventory Table
    - UserID
    - Orders[]