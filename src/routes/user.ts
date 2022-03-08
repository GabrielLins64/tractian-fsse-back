import { Router } from "express";
import controller from "../controllers/user";
import auth from "../middlewares/auth";

const router = Router();

router.get("/", controller.findAllUsers);
router.get("/validate", auth.validateJWT, controller.validateToken);
router.post("/register", controller.register);
router.post("/login", controller.login, auth.createJWT);
router.post("/logout", auth.validateJWT, controller.logout);

router
  .route("/:id")
  .get(controller.findUser)
  .patch(auth.validateJWT, controller.updateUser)
  .delete(auth.validateJWT, controller.deleteUser);

router
  .route("/:field/:value")
  .get(controller.findUsers);

export { router as userRouter };
