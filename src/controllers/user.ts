import jwt from 'jsonwebtoken';
import User from "@/models/User";
import { Request, Response, NextFunction } from "express";

import bcryptjs from "bcryptjs";

export const register = async (req: Request, res: Response):Promise<void> => {
    const { name, email, password  } = req.body;
    if (!name || !email || !password || !name.trim()) {
        res.status(400).json({
            type: 'Error',
            message: 'Please fill in all fields'
        })
    }
    try {
        const user = await User.findOne({ email })

        if (user) {
            res.status(400).json({
                type: 'Error',
                message: 'Email already exists'
            })
        }

        const createUser = new User({ email, name, password })
        await createUser.save()

        res.status(201).json({
            type: 'Success',
            data: createUser
        })

    } catch (e: unknown) {
         if (e instanceof Error) {
             res.status(500).json({
                 type: 'Server Error',
                 message: e.message
             })
         } else {
             res.status(500).json({
                 type: 'Server Error',
                 message: 'An unknown error occurred.'
             })
         }
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;
        if (!email || !password) {
             res.status(400).json({
                type: 'Error',
                message: 'Please fill in all fields'
            })
        }

        try {

            const user = await User.findOne({ email })

            if (user && (await user.matchPassword(password))) {
                const token =  jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '15m' })
                 res.json({
                    user,
                    token
                });
            } else {
                res.status(401).json({ type: 'Error' , message: 'İnvalid Email or Password' });
            }


        } catch (error: unknown) {
            if (error instanceof Error) {
                 res.status(500).json({
                    type: 'Server Error',
                    message: error.message
                })
            }
        }

}


export const userInfo = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.find({ })
    res.render('admin', { user })



}

