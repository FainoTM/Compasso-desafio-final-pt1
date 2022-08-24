# CompassMart
Final challenge Compasso part 1 

# Developer
Theo Marques Faino

# How to run
To run this product is necessary
  1. Clone the REPOSITORY
  2. Install all dependencies using `npm install`
  3. Create a .env document using what is descripted in .env.example
  4. Run code in terminal: `npm run dev`

# Dependences
 - eslint
 - express
 - joi
 - mongoose
 - mongoose-paginate-v2
 - nodemon
 - multer
 - typescript

# Database
The database used on this project is mongoose

# Routes
 - Product
    - GET:    /api/v1/product        => Find all
    - GET:    /api/v1/product/low_stock   => Find by low stock
    - GET:    /api/v1/product/:id    => Find by Id
    - POST:   /api/v1/product        => Create
    - POST:   /api/v1/product/csv    => Read csv
    - PUT:    /api/v1/product/:id    => Update
    - PATCH:   /api/v1/product/:id   => Update Parcial
    - DELETE: /api/v1/product/:id    => Delete
