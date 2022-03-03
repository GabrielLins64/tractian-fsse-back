import Company, { ICompany } from "../models/company";

interface ICompanyInput {
  name: ICompany["name"];
}

export async function findCompanyById(id: string): Promise<ICompany | null> {
  return Company.findById(id)
    .then((data) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function findCompanyByName(
  name: string
): Promise<ICompany | null> {
  return Company.findOne({ name: name })
    .then((data) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function findAllCompanies(): Promise<Array<ICompany>> {
  return Company.find({});
}

export async function updateCompany(
  id: string,
  newCompany: ICompany
): Promise<ICompany | null> {
  let query = { _id: id };

  return Company.findOneAndUpdate(query, newCompany, { new: true })
    .then((data: ICompany | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function createCompany({
  name,
}: ICompanyInput): Promise<ICompany> {
  return Company.create({
    name,
  })
    .then((data: ICompany) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function deleteCompany(id: string): Promise<ICompany | null> {
  return Company.findByIdAndDelete(id)
    .then((data: ICompany | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}
