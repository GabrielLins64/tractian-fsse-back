import { Router } from "express";
import { companyRouter } from "./company";
import { unitRouter } from "./unit";

const router =  Router();

router.use('/company', companyRouter);
router.use('/unit', unitRouter);

export default router;
