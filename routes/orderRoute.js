const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

//Get all orders
router.get("/", (req, res) => {
    try {
      con.query("SELECT * FROM orders", (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (error) {
      console.log(error);
    }
  });
  
  
  // Gets one order
  router.get("/:id", (req, res) => {
      try {
        con.query(`SELECT * FROM orders WHERE order_id = ${req.params.id}`, (err, result) => {
          if (err) throw err;
          res.send(result);
        });
        // res.send({ id: req.params.id });
      } catch (error) {
        console.log(error); 
        res.status(400).send(error);
      }
    });
  
  
    // Add new orders
    router.post("/:id", (req, res) => {
      // the below allows you to only need one const, but every input required is inside of the brackets
      const {
        amount,
        shipping_address,
        order_email,
        order_date,
        order_status
    } = req.body;
      // OR
      // the below requires you to add everything one by one
      //   const email = req.body.email;
      try {
        con.query(
          //When using the ${}, the content of con.query MUST be in the back tick
          `INSERT INTO orders (
            order_id,
            amount,
            shipping_address,
            order_email,
            order_date,
            order_status) 
            VALUES ("${req.params.id}", "${amount}", "${shipping_address}", "${order_email}", "${order_date}", "${order_status}")`,
          (err, result) => {
            if (err) throw err;
            res.send("order successfully created");
          }
        ); 
      } catch (error) {
        console.log(error);
        res.status(400).send(error);
      }
    });
    
    // Delete one orders
    router.delete("/:id", (req, res) => {
        try {
          con.query(`DELETE FROM orders WHERE order_id = ${req.params.id}`, (err, result) => {
            if (err) throw err;
            res.send("Sucessfully deleted this order");
          });
          // res.send({ id: req.params.id });
        } catch (error) {
          console.log(error);
          res.status(400).send(error);
        }
      });


      router.put("/:id", (req, res) => {
        // the below allows you to only need one const, but every input required is inside of the brackets
        const {
            user_id,
            amount,
            shipping_address,
            order_email,
            order_date,
            order_status
        } = req.body;
        // OR
        // the below requires you to add everything one by one
        //   const email = req.body.email;
        try {
          con.query(
            //When using the ${}, the content of con.query MUST be in the back tick
            `UPDATE orders set user_id="${user_id}", amount="${amount}", shipping_address="${shipping_address}", order_email="${order_email}" order_date="${order_date}", order_status="${order_status}", WHERE order_id = "${req.params.id}"`,
            (err, result) => {
              if (err) throw err;
              res.send("order successfully updated");
            }
          );
        } catch (error) {
          console.log(error);
          res.status(400).send(error);
        }
      });
  

module.exports = router;