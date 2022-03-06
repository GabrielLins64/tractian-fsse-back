import { Request, Response, NextFunction } from "express";

export default function logger(req: Request, res: Response, next: NextFunction) {
  let date = new Date().toLocaleString("pt-BR");
  let log = `[${date}] ${req.method} in ${req.originalUrl} from ${req.ip}`;
  console.log(log);
  next();
}
