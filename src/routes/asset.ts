import express from "express";
import controller from "../controllers/asset";
import { uploadImage } from "../middlewares/storage";

const router = express.Router();

router
  .route("/")
  .get(controller.findAllAssets)
  .post(uploadImage, controller.createAsset);

router
  .route("/:id")
  .get(controller.findAssetById)
  .patch(uploadImage, controller.updateAsset)
  .delete(controller.deleteAsset);

router.get("/image/:imageId", controller.getImage);
router.get("/find/:field/:value", controller.findAssets);

export { router as assetRouter };
