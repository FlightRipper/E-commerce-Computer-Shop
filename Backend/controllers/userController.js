import User from '../models/usermodel.js';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: "10d" });
};

class userController {

    static async createUser(req, res){
        try{
            const image = req.file.filename;
            const { username, password, email, phonenumber, address } = req.body;
            const errors = [];
    
            if (!password) {
                errors.push("Password is required");
            } else if (!validator.isStrongPassword(password)) {
                errors.push("Password not strong enough");
            }
    
            if (!username) {
                errors.push("Username is required");
            }

            if (!email) {
                errors.push("email is required");
            }

            if (!phonenumber) {
                errors.push("phonenumber is required");
            }

            if (!address) {
                errors.push("address is required");
            }

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            const existingUser = await User.findOne({
            where: {
                username: username,
            },
            });

            if (existingUser) {
            errors.push("Username already exists");
            return res.status(400).json({errors});
            }

            const newUser = await User.create({
                ...req.body, image: image
            });

            if (!newUser) {
            errors.push("Error creating user");
            return  res.status(500).json({ errors });
            }

            const token = createToken(newUser.id);
            return res.status(201).json({ newUser, token });
        }
        catch(error){
            return res.status(500).json({ message: error.message });
        }
    }

    //get all users
    static async getAllUsers(req, res) {
        try {
        const users = await User.findAll();
        if (users.length === 0) {
            return res.status(404).json("there are no available users");
        }
        return res.status(200).json(users);
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    //update a user by id
    static async updateUser(req, res) {
        try {
        const [updatedUser] = await User.update(req.body, {
            where: {
            id: req.params.id,
            },
        });
        if (!updatedUser) {
        return res.status(404).json('please enter the fields you want to edit');
        }
        const user= await User.findByPk(req.params.id);
        return res.status(200).json(user);
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    //delete a user
    static async deleteUser(req, res) {
        try {
        const deleteduser = await User.findByPk(req.params.id)
        if (!deleteduser) {
        return res.status(404).json('the user was not found');
        }

        await User.destroy({
            where:{
            id:req.params.id,
            },
        })

        fs.unlinkSync(deleteduser.image);
        return res.status(200).json({ deleteduser });
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    //find user by id
    static async findUserById(req, res) {
        try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json('user not found');
        }
        return res.status(200).json(user);
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    static async findUserById(req, res) {
        try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json('user not found');
        }
        return res.status(200).json(user);
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    static async UpdateUserProfile(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json('user not found');
            }
            const image = req.file.filename;
            fs.unlinkSync(user.image);
            user.image = req.file.filename;
            await product.save();
            res.status(200).json({ message: 'Image Replaced successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
}

export default userController;