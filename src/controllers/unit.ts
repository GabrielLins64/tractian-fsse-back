import { ICompany } from "../models/company";
import { Request, Response } from "express";
import Unit, { IUnit } from "../models/unit";

interface IUnitInput {
  name: IUnit["name"];
  address?: IUnit["address"];
  company: ICompany["_id"];
}

export async function findUnitById(req: Request, res: Response) {
  Unit.findById(req.params.id)
    .then((unit) => {
      if (!unit) {
        return res.status(204).send();
      }

      return res.status(200).send(unit);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}

export async function findAllUnits(req: Request, res: Response) {
  Unit.find({})
    .then((units) => {
      return res.status(200).send(units);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}

export async function updateUnit(req: Request, res: Response) {
  let query = { _id: req.params.id };

  return Unit.findOneAndUpdate(query, req.body, { new: true })
    .then(async (newUnit) => {
      if (!newUnit) {
        return res.status(204).send();
      }

      return res.status(200).send(newUnit);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}

export async function createUnit(req: Request, res: Response) {
  let unit = await Unit.findOne({ name: req.body.name });

  if (unit) {
    return res.status(400).send({
      error: `A unit with the name "${req.body.name}" already exists!`,
    });
  }

  Unit.create(req.body)
    .then((unit) => {
      return res.status(201).send(unit);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}

export async function deleteUnit(req: Request, res: Response) {
  Unit.findByIdAndDelete(req.params.id)
    .then((unit) => {
      if (!unit) {
        return res.status(204).send();
      }

      return res.status(200).send(unit);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}

export async function findUnits(req: Request, res: Response) {
  Unit.find()
    .where(req.params.field, req.params.value)
    .then((units: Array<Object>) => {
      if (units.length == 0) {
        return res.status(204).send();
      }

      return res.send(units);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}
