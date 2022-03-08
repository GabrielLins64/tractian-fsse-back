import dotenv from "dotenv";

dotenv.config();

const DATABASE_URI =
  process.env.DATABASE_URI || "mongodb://localhost:27017/tractian-challenge";
const PORT = process.env.PORT || 3000;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "someIssuer";
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || "mysecret";

export default {
  PORT,
  DATABASE_URI,
  SERVER_TOKEN_EXPIRETIME,
  SERVER_TOKEN_ISSUER,
  SERVER_TOKEN_SECRET,
};
