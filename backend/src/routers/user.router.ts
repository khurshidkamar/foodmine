import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from 'bcryptjs';


const router = Router();

router.get("/seed", expressAsyncHandler(
    async (req, res) => {
        const usersCount = await UserModel.countDocuments();
        if (usersCount > 0) {
            res.send("Seed is already done");
            return;
        }
        await UserModel.create(sample_users);
        res.send("seed is done now!");
        return;
    }));

router.post("/login", expressAsyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        try {
            const hashedPassword = await bcrypt.hash("abcde", 10);

            console.log('✅ HASH GENERATED SUCCESSFULLY:');
            console.log(hashedPassword);

        } catch (error) {
            console.error('An error occurred during hashing:', error);
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            res.send(generateTokenResponse(user));

        }

        else {
            res.status(HTTP_BAD_REQUEST).send("Username or password is not valid!");
        }
    }));

router.post("/register", expressAsyncHandler(
    async (req, res) => {
        const { name, email, password, address } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(HTTP_BAD_REQUEST).send("User is already registered. Please login.");
            return;
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser: User = {
            id: '',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        }
        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
    })
)
const generateTokenResponse = (user: User) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, process.env.JWT_SECRET!, {
        expiresIn: "30d"
    });

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
};

export default router;