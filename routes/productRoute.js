const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const middleware = require('../middleware/auth')

//Get all products
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM products", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});


// Gets one product
router.get("/:id", (req, res) => {
    try {
      con.query(`SELECT * FROM products WHERE product_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
      // res.send({ id: req.params.id });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });


  router.put("/:id", (req, res) => {
    if(req.body.user_type === "Uchiha") {
    // the below allows you to only need one const, but every input required is inside of the brackets
    const {
        sku,
        name,
        price,
        weight,
        descriptions,
        thumbnail,
        image,
        category,
        create_date,
        stock,
    } = req.body;
    // OR
    // the below requires you to add everything one by one
    //   const email = req.body.email;
    try {
      con.query(
        //When using the ${}, the content of con.query MUST be in the back tick
        `UPDATE products set sku="${sku}", name="${name}", price="${price}", weight="${weight}", descriptions="${descriptions}", thumbnail="${thumbnail}", image="${image}", category="${category}", create_date="${create_date}}", stock="${stock}" WHERE product_id = "${req.params.id}"`,
        (err, result) => {
          if (err) throw err;
          res.send("product successfully updated");
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }}else{
      res.send("Not an Uchiha, access denied!");
    } 
  });


  // Add new products
  router.post("/", middleware, (req, res) => {
    if(req.body.user_type === "Uchiha") {
    // the below allows you to only need one const, but every input required is inside of the brackets
    const {
      sku,
      name,
      price,
      weight,
      descriptions,
      thumbnail,
      image,
      category,
      create_date,
      stock,
    } = req.body;
    // OR
    // the below requires you to add everything one by one
    //   const email = req.body.email;
    try {
      con.query(
        //When using the ${}, the content of con.query MUST be in the back tick
        `INSERT INTO products (sku,
            name,
            price,
            weight,
            descriptions,
            thumbnail,
            image,
            category,
            create_date,
            stock) VALUES ("${sku}", "${name}", "${price}", "${weight}", "${descriptions}", "${thumbnail}", "${image}", "${category}", "${create_date}", "${stock}")`,
        (err, result) => {
          if (err) throw err;
          res.send("product successfully created");
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }}else{
      res.send("Not an Uchiha, access denied!");
    } 
  });
  
  // Delete one products
  router.delete("/:id", (req, res) => {
    if(req.body.user_type === "Uchiha") {
      try {
        con.query(`DELETE FROM products WHERE product_id = ${req.params.id}`, (err, result) => {
          if (err) throw err;
          res.send("Sucessfully deleted this product");
        });
        // res.send({ id: req.params.id });
      } catch (error) {
        console.log(error);
        res.status(400).send(error);
      }}else{
        res.send("Not an Uchiha, access denied!");
      } 
    });


module.exports = router;