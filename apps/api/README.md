# Stock Inventory System

## File Structure

├───api
    ├───controllers     // API Controllers handles whats being processed in the server and what is going to be send back as a response    
    ├───database        // Set's up the Database so it can be used in our API and basic setup scripts included
    ├───node_modules     
    ├───repositories    // All Database handling such as queries and functions that will be use by services 
    ├───routes          // Sets up API Routes and assigns them to controllers
    ├───services        // Handles all server logic and communications with repositories
    ├───utils           // Exported Entities such as Variables, Interfaces, and Types that will be needed throughout the Codebase
    └───validation      // Validation Entites such as Objects and Types to be used in our API

## Coding Style & Habits

I want to address the strict rules of adding code in our API

- Dependency Injection
- Validation (Must be down for all forms)
- Data Transfer Objects 
- Object Oriented Programming
