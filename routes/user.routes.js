import { Router } from "express";
import { getUsers, getUser } from '../controllers/user.controller.js'

const userRouter = Router();

userRouter.get('/', getUsers)

userRouter.get('/:id', getUser)

userRouter.post('/', (req, res) => {
    res.send({ title: "CREATE new user" });
})

userRouter.put('/:id', (req, res) => {
    res.send({ title: "UPDATE all users" });
})

userRouter.delete('/:id', (req, res) => {
    res.send({ title: "DELETE a users" });
})

export default userRouter;      