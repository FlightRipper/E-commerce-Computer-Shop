import express from "express";
import SubCategoryController from "../controllers/subcategoryController.js";
import protect from "../middlewares/authMiddleware.js";

const subcategoryRouter = express.Router();

// Create a new product
subcategoryRouter.post('/add/:id', SubCategoryController.createSubCategory);

// Get all products
subcategoryRouter.get('/:id', SubCategoryController.getAllSubCategories);

//get a product by ID
subcategoryRouter.get('/single/:id', SubCategoryController.getSubCategory);

export default subcategoryRouter;