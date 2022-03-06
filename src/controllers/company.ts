import { Request, Response } from "express";
import Company, { ICompany } from "../models/company";

interface ICompanyInput {
  name: ICompany["name"];
}

export async function findCompanyById(req: Request, res: Response) {
  Company.findById(req.params.id)
    .then((company) => {
      if (!company) {
        return res.status(204).send();
      }

      return res.status(200).send(company);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}

export async function findCompanies(req: Request, res: Response) {
  Company.find()
    .where(req.params.field, req.params.value)
    .then((companies: Array<Object>) => {
      if (companies.length == 0) {
        return res.status(204).send();
      }

      return res.send(companies);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}

export async function findAllCompanies(req: Request, res: Response) {
  Company.find({})
    .then((companies) => {
      return res.status(200).send(companies);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}

export async function updateCompany(req: Request, res: Response) {
  let query = { _id: req.params.id };

  Company.findOneAndUpdate(query, req.body, { new: true })
    .then(async (newCompany) => {
      if (!newCompany) {
        return res.status(204).send();
      }

      return res.status(200).send(newCompany);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}

export async function createCompany(req: Request, res: Response) {
  let company = await Company.findOne({ name: req.body.name });

  if (company) {
    return res.status(400).send({
      error: `A company with the name "${req.body.name}" already exists!`,
    });
  }

  Company.create({
    name: req.body.name,
  })
    .then((company: ICompany) => {
      return res.status(201).send(company);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}

export async function deleteCompany(req: Request, res: Response) {
  Company.findByIdAndDelete(req.params.id)
    .then((company) => {
      if (!company) {
        return res.status(204).send();
      }

      return res.status(200).send(company);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}
