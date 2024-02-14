import express from 'express';
import usersController from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';


const userRouter = express.Router();

// Create a new user
userRouter.post('/register', upload.single('image'), usersController.createUser);

//loging user
userRouter.post('/login', usersController.loginUser);

// Get all users
userRouter.get('/', usersController.getAllUsers);

//get a user by ID
userRouter.get('/:id', usersController.findUserById);

//update user
userRouter.patch('/:id', usersController.updateUser);

//delete a user
userRouter.delete('/:id', usersController.deleteUser);

//Update user profile
userRouter.patch('/updatepicture/:id', upload.single('image'), usersController.UpdateUserProfile);

export default userRouter;