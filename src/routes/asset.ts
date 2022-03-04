import express from "express";
import { Request, Response } from "express";
import {
  createAsset,
  deleteAsset,
  findAllAssets,
  findAssetByUnit,
  findAssetById,
  updateAsset,
} from "../controllers/asset";
import { convertFile, upload } from "../middlewares/storage";

const router = express.Router();

router.post(
  "/create",
  upload.single("image"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).send("Please input an image");
    }
    let finalImage = convertFile(req.file.path, req.file.mimetype);

    try {
      createAsset(JSON.parse(req.body.asset), finalImage)
        .then((asset) => {
          return res.status(201).send({ asset });
        })
        .catch((err: Error) => {
          return res.status(500).send(err.message);
        });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.get("/id/:id", async (req: Request, res: Response) => {
  findAssetById(req.params.id)
    .then((asset) => {
      if (!asset) {
        return res.status(204).send();
      }

      return res.status(200).send({ asset });
    })
    .catch((err: Error) => {
      return res.status(500).send(err.message);
    });
});

router.get("/all", async (req: Request, res: Response) => {
  findAllAssets()
    .then((assets) => {
      return res.status(200).send({ assets });
    })
    .catch((err: Error) => {
      return res.status(500).send(err.message);
    });
});

router.get("/unit/:unitId", async (req: Request, res: Response) => {
  findAssetByUnit(req.params.unitId)
    .then((assets) => {
      return res.status(200).send({ assets });
    })
    .catch((err: Error) => {
      return res.status(500).send(err.message);
    });
});

router.patch(
  "/update/:id",
  upload.single("image"),
  async (req: Request, res: Response) => {
    let finalImage = null;
    if (req.file) {
      finalImage = convertFile(req.file.path, req.file.mimetype);
    }

    updateAsset(req.params.id, JSON.parse(req.body.asset), finalImage)
      .then(async (newAsset) => {
        if (!newAsset) {
          return res.status(204).send();
        }

        return res.status(200).send({ newAsset });
      })
      .catch((err: Error) => {
        return res.status(500).send(err.message);
      });
  }
);

router.delete("/delete/:id", async (req: Request, res: Response) => {
  deleteAsset(req.params.id)
    .then((asset) => {
      if (!asset) {
        return res.status(204).send();
      }

      return res.status(200).send({ asset });
    })
    .catch((err: Error) => {
      return res.status(500).send(err.message);
    });
});

export { router as assetRouter };
