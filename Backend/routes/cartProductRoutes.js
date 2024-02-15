import express from "express";
import CartController from "../controllers/productCartController.js";

const cartProductRouter = express.Router();

cartProductRouter.post("/add", CartController.CreateCart);

cartProductRouter.delete("/delete/:id", CartController.deleteCart);

export default cartProductRouter