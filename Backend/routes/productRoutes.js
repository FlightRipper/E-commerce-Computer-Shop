import express from 'express';
import ProductController from '../controllers/productController.js';;
import protect from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';


const productRouter = express.Router();

// Create a new product
productRouter.post('/add', upload.single('image'), ProductController.createProduct);

// Get all products
productRouter.get('/', ProductController.getAllProducts);

//get a product by ID
productRouter.get('/single/:id', ProductController.getProduct);

//update product
productRouter.patch('/:id', ProductController.updateProduct);

//delete a product
productRouter.delete('/:id', ProductController.deleteProduct);

//update product image
productRouter.patch('/image/:id', upload.single('image'), ProductController.UpdateProductImage);

//update product quantity
productRouter.patch("/quantity/:id", ProductController.updateProductquantity);

export default productRouter;