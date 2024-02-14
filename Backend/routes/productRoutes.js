import express from 'express';
import ProductController from '../controllers/productController.js';;
import protect from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';


const productRouter = express.Router();

// Create a new product
productRouter.post('/add', upload.array('image'), ProductController.createProduct);

// Get all products
productRouter.get('/', ProductController.getAllProducts);

//get a product by ID
productRouter.get('/:id', ProductController.getProduct);

//update product
productRouter.patch('/:id', ProductController.updateProduct);

//delete a product
productRouter.delete('/:id', ProductController.deleteProduct);

//delete a product image
productRouter.delete('/:id/:index', ProductController.deleteProductImage);

//delete a product image
productRouter.post('/:id', upload.array("image"), ProductController.addProductImage);

export default productRouter;