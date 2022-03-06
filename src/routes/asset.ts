import express from "express";
import {
  createAsset,
  deleteAsset,
  findAllAssets,
  findAssetById,
  updateAsset,
  getImage,
  findAssets,
} from "../controllers/asset";
import { uploadImage } from "../middlewares/storage";

const router = express.Router();

router
  .route("/")
  .get(findAllAssets)
  .post(uploadImage, createAsset);

router
  .route("/:id")
  .get(findAssetById)
  .patch(uploadImage, updateAsset)
  .delete(deleteAsset);

router.get("/image/:imageId", getImage);
router.get("/find/:field/:value", findAssets);

export { router as assetRouter };
