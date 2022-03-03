import { ICompany } from "../models/company";
import Unit, { IUnit } from "../models/unit";

interface IUnitInput {
  name: IUnit["name"];
  address?: IUnit["address"];
  company: ICompany["_id"];
}

export async function findUnitById(id: string): Promise<IUnit | null> {
  return Unit.findById(id)
    .then((data) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function findUnitByName(
  name: string
): Promise<IUnit | null> {
  return Unit.findOne({ name: name })
    .then((data) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function findAllCompanies(): Promise<Array<IUnit>> {
  return Unit.find({});
}

export async function findUnitByCompany(companyId: string): Promise<Array<IUnit>> {
  return Unit.find({company: companyId});
}

export async function updateUnit(
  id: string,
  newUnit: IUnitInput
): Promise<IUnit | null> {
  let query = { _id: id };

  return Unit.findOneAndUpdate(query, newUnit, { new: true })
    .then((data: IUnit | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function createUnit(unit: IUnitInput): Promise<IUnit> {
  return Unit.create(unit)
    .then((data: IUnit) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function deleteUnit(id: string): Promise<IUnit | null> {
  return Unit.findByIdAndDelete(id)
    .then((data: IUnit | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}
