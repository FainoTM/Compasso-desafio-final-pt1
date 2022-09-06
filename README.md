<h1 align="center">CompassMart</h1>
Final challenge Compasso part 1 <br>
<br>
This project is the first part of the final challenge proposed by the Compass's instructors <br><br>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=mongoDB&message=database&color=green&style=for-the-badge&logo=MONGODB"/>
  <img src="https://img.shields.io/static/v1?label=typescript&message=language&color=blue&style=for-the-badge&logo=TYPESCRIPT"/>
  <img src="https://img.shields.io/static/v1?label=eslint&message=framework&color=blue&style=for-the-badge&logo=ESLINT"/>
  <img src="https://img.shields.io/static/v1?label=express&message=framework&color=black&style=for-the-badge&logo=EXPRESS"/>
</p>

### Developer
👤 **THEO FAINO**

- Github: [@FainoTM](https://github.com/FainoTM)

### How to run 
<img src="https://img.shields.io/static/v1?label=NPM 8.12.1&message=framework&color=red&style=for-the-badge&logo=NPM"/>
To run this product is necessary
  1. Clone the REPOSITORY
  2. Install all dependencies using `npm install`
  3. Create a .env document using what is descripted in .env.example
  4. Run code in terminal: `npm run dev`

### Dependences
 - Eslint
 - Express
 - joi
 - mongoose
 - mongoose-paginate-v2
 - nodemon
 - multer

<h3>Language</h3>
TypeScript

### Database
The database used on this project is mongoose

### Routes
 - Product
    - GET:    /api/v1/product        => Find all
    - GET:    /api/v1/product/low_stock   => Find by low stock
    - GET:    /api/v1/product/:id    => Find by Id
    - POST:   /api/v1/product        => Create
    - POST:   /api/v1/product/csv    => Read csv
    - PUT:    /api/v1/product/:id    => Update
    - PATCH:   /api/v1/product/:id   => Update Parcial
    - DELETE: /api/v1/product/:id    => Delete
