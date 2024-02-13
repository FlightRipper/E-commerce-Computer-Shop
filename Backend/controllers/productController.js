import Product from "../models/productmodel" ;
import SubCategory from "../models/subcategorymodel";
import fs from 'fs';
import path from 'path';

class ProductController {

    static async createProduct(req, res){
        try {
            const { name, price, description, quantity, subcategoryId } = req.body;
            if (!name || !price || !description || !quantity || !subcategoryId) {
              return res.status(400).json({ error: "All fields are required" });
            }
        
            const images = req.files
            if (!images || images.length === 0) {
              return res.status(400).json({ error: "At least one image is required" });
            }
        
            const imagePaths = images.map((image) => image.path);
            const product = await Product.create({ ...req.body, image: imagePaths });
        
            await product.save();
            res.status(200).json(product);
        } catch (error) {
        res.status(400).json({ error: error });
        }
    }

    static async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            if (products.length === 0) {
                return res.status(404).json('there are no available memes');
            }
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    //update product
    static async updateProduct(req, res) {
        try {
        const oldProduct = await Product.findByPk(req.params.id);
        console.log(req.body)

        const [upatedProduct] = await Product.update(...req.body, {
            where: {
            id: req.params.id,
            },
        });

        if (!upatedProduct) {
            return res.status(404).json("please enter the fields you want to edit");
        }

        const newProduct = await Product.findByPk(req.params.id);
        return res.status(200).json(newProduct);
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }
}
