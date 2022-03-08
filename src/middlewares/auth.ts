import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import blacklist from "../blacklist";
import config from "../config";
import { IUser } from "../models/user";

interface JWTData {
  id: string;
}

function validateJWT(req: Request, res: Response, next: NextFunction) {
  let token = req.headers.authorization?.split(" ")[1];

  if (token && req.headers.userid) {
    if (blacklist.includes(token)) {
      return res.status(401).send({
        error: "Session expired. Please login again",
      });
    }

    jwt.verify(token, config.SERVER_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).send({ error });
      }

      if (req.headers.userid != (decoded as JWTData).id) {
        return res.status(401).send({
          error: "Invalid credentials",
        });
      }

      next();
    });
  } else {
    return res.status(401).send({
      error: "No token or credentials provided.",
    });
  }
}

function createJWT(req: Request, res: Response, next: NextFunction) {
  let user: IUser = res.locals.user;
  var timeSinchEpoch = new Date().getTime();
  var expirationTime =
    timeSinchEpoch + Number(config.SERVER_TOKEN_EXPIRETIME) * 100000;
  var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  try {
    jwt.sign(
      {
        id: user._id,
      },
      config.SERVER_TOKEN_SECRET,
      {
        issuer: config.SERVER_TOKEN_ISSUER,
        algorithm: "HS256",
        expiresIn: expirationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          throw error;
        } else if (token) {
          res.status(200).send({ accessToken: token });
        }
      }
    );
  } catch (error) {
    res.status(500).send({ error });
  }
}

export { validateJWT, createJWT };
