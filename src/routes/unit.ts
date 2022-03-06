import express from "express";
import controller from "../controllers/unit";

const router = express.Router();

router
  .route("/")
  .get(controller.findAllUnits)
  .post(controller.createUnit);

router
  .route("/:id")
  .get(controller.findUnitById)
  .patch(controller.updateUnit)
  .delete(controller.deleteUnit);

router.get("/find/:field/:value", controller.findUnits);

export { router as unitRouter };
