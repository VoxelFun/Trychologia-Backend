import * as express from "express";
import AdminController from "./AdminController";
import SafeController from "./SafeController";

const router = express.Router();

router.use("/admin", AdminController);
router.use("/safe", SafeController);

export = router;