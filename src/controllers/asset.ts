import * as fs from "fs";
import { Request, Response } from "express";
import Asset, { IAsset } from "../models/asset";
import Image, { IImage } from "../models/image";

export function convertFile(filePath: string, mimetype: string) {
  let image = fs.readFileSync(filePath);
  let encodedImage = image.toString("base64");
  let finalImage = {
    contentType: mimetype,
    data: Buffer.from(encodedImage, "base64"),
  };
  fs.unlink(filePath, (err) => {});

  return finalImage;
}

export async function findAssetById(req: Request, res: Response) {
  Asset.findById(req.params.id)
    .then((data) => {
      if (!data) return res.status(204).send();

      return res.status(200).send(data);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}

export async function findAllAssets(req: Request, res: Response) {
  Asset.find({})
    .then((assets) => {
      return res.status(200).send(assets);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}

export async function findAssets(req: Request, res: Response) {
  Asset.find()
    .where(req.params.field, req.params.value)
    .then((assets: Array<Object>) => {
      if (assets.length == 0) {
        return res.status(204).send();
      }

      return res.send(assets);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}

export async function updateAsset(req: Request, res: Response) {
  let finalImage = null;
  let oldAsset = await Asset.findById(req.params.id);
  let newAsset = { ...JSON.parse(req.body.asset) };

  if (!oldAsset) {
    return res.status(204).send();
  }
  if (req.file) {
    finalImage = convertFile(req.file.path, req.file.mimetype);
    await Image.findByIdAndDelete(oldAsset.image);
    await Image.create(finalImage).then((data: IImage) => {
      newAsset.image = data._id;
    });
  }

  let query = { _id: req.params.id };
  Asset.findOneAndUpdate(query, newAsset, { new: true })
    .then((data: IAsset | null) => {
      return res.status(200).send(data);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}

export async function createAsset(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).send("Please input an image");
  }
  let finalImage = convertFile(req.file.path, req.file.mimetype);
  let newAsset = { ...JSON.parse(req.body.asset) };

  Image.create(finalImage)
    .then(async (data: IImage) => {
      newAsset.image = data._id;

      Asset.create(newAsset).then((asset) => {
        return res.status(201).send(asset);
      });
    })
    .catch(async (err: Error) => {
      await Image.findByIdAndDelete(newAsset.image);
      return res.status(500).send({ error: err.message });
    });
}

export async function deleteAsset(req: Request, res: Response) {
  Asset.findByIdAndDelete(req.params.id)
    .then(async (data: IAsset | null) => {
      if (!data) {
        return res.status(204).send();
      }

      let imageId = data.image;
      await Image.findByIdAndDelete(imageId);

      return res.status(200).send(data);
    })
    .catch((err: Error) => {
      return { error: err.message };
    });
}

export async function getImage(req: Request, res: Response) {
  Image.findById(req.params.imageId)
    .then(async (data: IImage | null) => {
      if (!data) return res.status(204);

      res.writeHead(200, {
        "Content-Type": data.contentType,
      });
      return res.end(data.data);
    })
    .catch((err: Error) => {
      return res.status(500).send({ error: err.message });
    });
}
