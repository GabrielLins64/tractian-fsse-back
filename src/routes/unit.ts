import express from "express";
import { Request, Response } from "express";
import {
  createUnit,
  deleteUnit,
  findAllCompanies,
  findUnitByCompany,
  findUnitById,
  findUnitByName,
  updateUnit,
} from "../controllers/unit";

const router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  let unit = await findUnitByName(req.body.name);

  if (unit) {
    return res.status(400).send({
      error: `A unit with the name "${req.body.name}" already exists!`,
    });
  }

  createUnit({
    name: req.body.name,
    address: req.body.address || "",
    company: req.body.company,
  })
    .then((unit) => {
      return res.status(201).send({ unit });
    })
    .catch((err: Error) => {
      return res.status(500).send(err.message);
    });
});

router.get("/id/:id", async (req: Request, res: Response) => {
  findUnitById(req.params.id)
    .then((unit) => {
      if (!unit) {
        return res.status(204).send();
      }

      return res.status(200).send({ unit });
    })
    .catch((err: Error) => {
      return res.status(500).send(err.message);
    });
});

router.get("/name/:name", async (req: Request, res: Response) => {
  findUnitByName(req.params.name)
    .then((unit) => {
      if (!unit) {
        return res.status(204).send();
      }

      return res.send({ unit });
    })
    .catch((err: Error) => {
      return res.status(500).send(err.message);
    });
});

router.get("/all", async (req: Request, res: Response) => {
  findAllCompanies()
    .then((units) => {
      return res.status(200).send({ units });
    })
    .catch((err: Error) => {
      return res.status(500).send(err.message);
    });
});

router.get("/company/:companyId", async (req: Request, res: Response) => {
  findUnitByCompany(req.params.companyId)
    .then((units) => {
      return res.status(200).send({units});
    })
    .catch((err: Error) => {
      return res.status(500).send(err.message);
    })
});

router.patch("/update/:id", async (req: Request, res: Response) => {
  updateUnit(req.params.id, req.body)
    .then(async (newUnit) => {
      if (!newUnit) {
        return res.status(204).send();
      }

      return res.status(200).send({ newUnit });
    })
    .catch((err: Error) => {
      return res.status(500).send(err.message);
    });
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  deleteUnit(req.params.id)
    .then((unit) => {
      if (!unit) {
        return res.status(204).send();
      }

      return res.status(200).send({ unit });
    })
    .catch((err: Error) => {
      return res.status(500).send(err.message);
    });
});

export { router as unitRouter };
