import express from "express";
import {
  createUnit,
  deleteUnit,
  findAllUnits,
  findUnitById,
  findUnits,
  updateUnit,
} from "../controllers/unit";

const router = express.Router();

router
  .route("/")
  .get(findAllUnits)
  .post(createUnit);

router
  .route("/:id")
  .get(findUnitById)
  .patch(updateUnit)
  .delete(deleteUnit);

router
  .route("/find/:field/:value")
  .get(findUnits);

export { router as unitRouter };
