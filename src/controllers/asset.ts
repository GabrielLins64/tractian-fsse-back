import Asset, { IAsset } from "../models/asset";
import Image, { IImage } from "../models/image";
import { IUnit } from "../models/unit";

interface IAssetInput {
  name: IAsset["name"];
  description: IAsset["description"];
  model: IAsset["model"];
  owner: IAsset["owner"];
  status: IAsset["status"];
  health: IAsset["health"];
  unit: IUnit["_id"];
  image?: IImageInput;
}

interface IImageInput {
  contentType: IImage["contentType"];
  data: IImage["data"];
}

export async function findAssetById(id: string): Promise<IAsset | null> {
  return Asset.findById(id)
    .then((data) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function findAllAssets(): Promise<Array<IAsset>> {
  return Asset.find({});
}

export async function findAssetByUnit(unitId: string): Promise<Array<IAsset>> {
  return Asset.find({ unit: unitId });
}

export async function updateAsset(
  id: string,
  assetInput: IAssetInput,
  image: IImageInput | null
): Promise<IAsset | null> {
  let oldAsset = await Asset.findById(id);
  if (!oldAsset) return null;

  let newAsset = { ...assetInput };

  if (image) {
    await Image.findByIdAndDelete(oldAsset.image);
    await Image.create(image).then((data: IImage) => {
      newAsset.image = data._id;
    });
  }

  let query = {_id: id}
  return Asset.findOneAndUpdate(query, newAsset, { new: true })
    .then((data: IAsset | null) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function createAsset(
  asset: IAssetInput,
  image: IImageInput
): Promise<IAsset> {
  return Image.create(image)
    .then(async (data: IImage) => {
      let newAsset = new Asset({ ...asset });
      newAsset.image = data._id;

      return Asset.create(newAsset)
        .then((data: IAsset) => {
          return data;
        })
        .catch(async (error: Error) => {
          await Image.findByIdAndDelete(newAsset.image);
          throw error;
        });
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function deleteAsset(id: string): Promise<IAsset | null> {
  return Asset.findByIdAndDelete(id)
    .then(async (data: IAsset | null) => {
      let imageId = data?.image;
      if (imageId) await Image.findByIdAndDelete(imageId);

      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}
