import express from 'express';
import OrderController from '../controllers/orderController.js';
import protect from '../middlewares/authMiddleware.js';
import Order from '../models/ordermodel.js';

const orderRouter = express.Router();

// Create a new product
orderRouter.post('/add', OrderController.createOrder);

// Get all products
orderRouter.get('/', OrderController.getAllOrders);

//get a product by ID
orderRouter.get('/single/:id', OrderController.getOrder);

orderRouter.get('/:id', OrderController.getOrdersOfUser);

orderRouter.patch('/status/:id', OrderController.updateOrderStatus);

orderRouter.patch('/cancel/:id', OrderController.cancelOrder)

orderRouter.delete('/:id', OrderController.deleteOrder);

export default orderRouter;