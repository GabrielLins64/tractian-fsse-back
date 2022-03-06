import { Router } from "express";
import { companyRouter } from "./company";

const router =  Router();

router.use('/company', companyRouter);

export default router;
