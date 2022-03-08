import { Router } from "express";
import { assetRouter } from "./asset";
import { companyRouter } from "./company";
import { unitRouter } from "./unit";
import { userRouter } from "./user";

const router = Router();

router.use("/company", companyRouter);
router.use("/unit", unitRouter);
router.use("/asset", assetRouter);
router.use("/user", userRouter);

export default router;
