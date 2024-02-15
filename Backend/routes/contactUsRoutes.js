import express from "express";
import ContactUsController from "../controllers/contactusController.js";

const contactUsRouter = express.Router();

contactUsRouter.post('/add', ContactUsController.createContactUs);

contactUsRouter.get('/', ContactUsController.getAllContactUs);

contactUsRouter.get('/single/:id', ContactUsController.getContactUs);

contactUsRouter.delete('/:id', ContactUsController.deleteContactUs);

export default contactUsRouter