# Events

## Order Events

### Order Created 

Producer:
    - Order Service

Consumer:
    - Inventory Service 


### Order Updated

Producer:
    - Order Service

Consumer:
    - Inventory Service 
### Order Deleted

Producer:
    - Order Service

Consumer:
    - Inventory Service 

## Inventory Events

###  ReservedStock

Producer:
    - Inventory Service

Consumer:
    - Order Service 
