import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

// fetch
    router.get("/", getProducts);
   
   // create
   router.post("/", createProduct);
   
   // update
   router.put("/:id", updateProduct);
   
   // delete
   router.delete("/:id", deleteProduct);

export default router;