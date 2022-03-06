import express from "express";
import {
  createCompany,
  deleteCompany,
  findAllCompanies,
  findCompanyById,
  findCompanies,
  updateCompany,
} from "../controllers/company";

const router = express.Router();

router
  .route("/")
  .get(findAllCompanies)
  .post(createCompany);

router
  .route("/:id")
  .get(findCompanyById)
  .patch(updateCompany)
  .delete(deleteCompany);

router
  .route("/find/:field/:value")
  .get(findCompanies);

export { router as companyRouter };
