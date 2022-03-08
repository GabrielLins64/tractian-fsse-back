import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import User, { IUser } from "../models/user";
import mongoose from "mongoose";
import blacklist from "../blacklist";

function validateToken(req: Request, res: Response, next: NextFunction) {
  return res.status(200).send({
    message: "Authorized",
  });
}

function register(req: Request, res: Response, next: NextFunction) {
  let { name, email, password } = req.body;

  bcryptjs.hash(password, 10, (hashError: Error, hash: string) => {
    if (hashError) {
      return res.status(500).send({ error: hashError.message });
    }

    const _user = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password: hash,
    });

    return _user
      .save()
      .then((user: IUser) => {
        let userWithoutPassword = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };
        return res.status(201).send(userWithoutPassword);
      })
      .catch((error: Error) => {
        return res.status(500).send({ error });
      });
  });
}

function login(req: Request, res: Response, next: NextFunction) {
  let { email, password } = req.body;

  User.findOne({ email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          error: "User not found",
        });
      }

      bcryptjs.compare(password, user.password, (error, result) => {
        if (error) {
          return res.status(500).send({ error });
        }
        if (!result) {
          return res.status(401).send({
            error: "Invalid email or password",
          });
        }

        res.locals.user = user;
        next();
      });
    })
    .catch((error) => {
      return res.status(500).send({ error });
    });
}

function logout(req: Request, res: Response, next: NextFunction) {
  let token = req.headers.authorization?.split(" ")[1] || "";

  if (token) {
    if (!blacklist.includes(token)) blacklist.push(token);
    return res.status(200).send("OK");
  }
}

function findAllUsers(req: Request, res: Response, next: NextFunction) {
  User.find()
    .select("-password")
    .exec()
    .then((users) => {
      return res.status(200).send(users);
    })
    .catch((error) => {
      return res.status(500).send({ error });
    });
}

function findUser(req: Request, res: Response, next: NextFunction) {
  User.findById(req.params.id)
    .select("-password")
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(204).send();
      }

      return res.status(200).send(user);
    });
}

function deleteUser(req: Request, res: Response, next: NextFunction) {
  User.findByIdAndDelete(req.params.id)
    .select("-password")
    .then((user) => {
      if (!user) {
        return res.status(204).send();
      }

      return res.status(200).send(user);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}

export default {
  validateToken,
  register,
  login,
  findAllUsers,
  findUser,
  logout,
  deleteUser,
};
