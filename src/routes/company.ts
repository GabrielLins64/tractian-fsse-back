import express from "express";
import controller from "../controllers/company";
import auth from "../middlewares/auth";

const router = express.Router();

router
  .route("/")
  .get(controller.findAllCompanies)
  .post(auth.validateJWT, controller.createCompany);

router
  .route("/:id")
  .get(controller.findCompanyById)
  .patch(auth.validateJWT, controller.updateCompany)
  .delete(auth.validateJWT, controller.deleteCompany);

router.get("/find/:field/:value", controller.findCompanies);

export { router as companyRouter };
