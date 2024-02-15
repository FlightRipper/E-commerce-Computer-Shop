import express from "express";
import PostController from "../controllers/postController.js";
import upload from "../middlewares/multer.js";

const postRouter = express.Router();

postRouter.get('/', PostController.getallposts);

postRouter.get('/single/:id', PostController.getPost);

postRouter.patch('/image/:id', upload.single("image"), PostController.updatePostimage);

postRouter.get('/user/:id', PostController.getuserPosts);

postRouter.patch('/:id', PostController.updatePost);

postRouter.delete('/:id', PostController.deletePost);

postRouter.post('/add', upload.single("image"), PostController.createPost);

export default postRouter;