import express from "express";
import controller from "../controllers/asset";
import auth from "../middlewares/auth";
import { uploadImage } from "../middlewares/storage";

const router = express.Router();

router
  .route("/")
  .get(auth.validateJWT, controller.findAllAssets)
  .post(auth.validateJWT, uploadImage, controller.createAsset);

router
  .route("/:id")
  .get(auth.validateJWT, controller.findAssetById)
  .patch(auth.validateJWT, uploadImage, controller.updateAsset)
  .delete(auth.validateJWT, controller.deleteAsset);

router.get("/image/:imageId", auth.validateJWT, controller.getImage);
router.get("/find/:field/:value", auth.validateJWT, controller.findAssets);

export { router as assetRouter };
