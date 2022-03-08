import { Router } from "express";
import controller from "../controllers/user";
import { validateJWT, createJWT } from "../middlewares/auth";

const router = Router();

router.get("/", controller.findAllUsers);
router.get("/validate", validateJWT, controller.validateToken);
router.post("/register", controller.register);
router.post("/login", controller.login, createJWT);
router.post("/logout", validateJWT, controller.logout);

router
  .route("/:id")
  .get(controller.findUser)
  .patch(validateJWT, controller.updateUser)
  .delete(validateJWT, controller.deleteUser);

export { router as userRouter };
