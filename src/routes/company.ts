import express from "express";
import { Request, Response } from "express";
import {
  createCompany,
  deleteCompany,
  findAllCompanies,
  findCompanyById,
  findCompanyByName,
  updateCompany,
} from "../controllers/company";

const router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  let company = await findCompanyByName(req.body.name);

  if (company) {
    return res.status(400).send({
      error: `A company with the name "${req.body.name}" already exists!`,
    });
  }

  createCompany({
    name: req.body.name,
  })
    .then((company) => {
      return res.status(201).send({ company });
    })
    .catch((err: Error) => {
      return res.status(500).send(err.message);
    });
});

router.get("/id/:id", async (req: Request, res: Response) => {
  findCompanyById(req.params.id)
    .then((company) => {
      if (!company) {
        return res.status(204).send();
      }

      return res.status(200).send({ company });
    })
    .catch((err: Error) => {
      return res.status(500).send(err.message);
    });
});

router.get("/name/:name", async (req: Request, res: Response) => {
  findCompanyByName(req.params.name)
    .then((company) => {
      if (!company) {
        return res.status(204).send();
      }

      return res.send({ company });
    })
    .catch((err: Error) => {
      return res.status(500).send(err.message);
    });
});

router.get("/all", async (req: Request, res: Response) => {
  findAllCompanies().then((companies) => {
    return res.status(200).send({companies});
  }).catch((err: Error) => {
    return res.status(500).send(err.message);
  });
});

router.patch("/update/:id", async (req: Request, res: Response) => {
  updateCompany(req.params.id, req.body)
    .then(async (newCompany) => {
      if (!newCompany) {
        return res.status(204).send();
      }

      return res.status(200).send({ newCompany });
    })
    .catch((err: Error) => {
      return res.status(500).send(err.message);
    });
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  deleteCompany(req.params.id)
    .then((company) => {
      if (!company) {
        return res.status(204).send();
      }

      return res.status(200).send({ company });
    })
    .catch((err: Error) => {
      return res.status(500).send(err.message);
    });
});

export { router as companyRouter };
