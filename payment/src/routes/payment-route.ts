import { Router } from "express";
import expressAsyncHandler from "express-async-handler";

const router: Router = Router();

router.post("/", expressAsyncHandler());
export default router;
