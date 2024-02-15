import Cart from "../models/cartmodel.js";
import Product from "../models/productmodel.js";

export default class CartController {
    static async CreateCart(req, res){
        try{
            const {ProductId, quantity, OrderId} = req.body
            const product = await Product.findByPk(ProductId)
            if(!product) return res.status(404).json({message: "Product not found"})
            const ProductPrice = product.price
            const totalPrice = ProductPrice * quantity
            const cart = await Cart.create({quantity: quantity, totalprice: totalPrice, ProductId: ProductId, OrderId: OrderId})
            
            return res.status(200).json(cart)
        }catch(error){return res.status(500).json({message: error.message});}
    }

    static async deleteCart(req, res){
        try{
            const cart = await Cart.findByPk(req.params.id)
            if(!cart) return res.status(404).json({message: "CartProduct not found"})
            await Cart.destroy({where:{id:req.params.id}})
            return res.status(200).json({cart})
        }catch(error){return res.status(500).json({message: error.message});}
    }
}