import express from 'express';
import categoryController from '../controllers/categoryController.js';;
import protect from '../middlewares/authMiddleware.js';


const categoryRouter = express.Router();

// Create a new product
categoryRouter.post('/add', categoryController.createCategory);

// Get all products
categoryRouter.get('/', categoryController.getAllCategories);

//get a product by ID
categoryRouter.get('/:id', categoryController.getCategory);


export default categoryRouter;