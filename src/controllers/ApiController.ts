import * as express from "express";
import AdminController from "./AdminController";

const router = express.Router();

router.use("/admin", AdminController);

export = router;