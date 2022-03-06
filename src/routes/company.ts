import express from "express";
import controller from "../controllers/company";

const router = express.Router();

router
  .route("/")
  .get(controller.findAllCompanies)
  .post(controller.createCompany);

router
  .route("/:id")
  .get(controller.findCompanyById)
  .patch(controller.updateCompany)
  .delete(controller.deleteCompany);

router.get("/find/:field/:value", controller.findCompanies);

export { router as companyRouter };
