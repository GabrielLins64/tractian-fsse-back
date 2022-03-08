import express from "express";
import controller from "../controllers/unit";
import auth from "../middlewares/auth";

const router = express.Router();

router
  .route("/")
  .get(controller.findAllUnits)
  .post(auth.validateJWT, controller.createUnit);

router
  .route("/:id")
  .get(controller.findUnitById)
  .patch(auth.validateJWT, controller.updateUnit)
  .delete(auth.validateJWT, controller.deleteUnit);

router.get("/find/:field/:value", controller.findUnits);

export { router as unitRouter };
