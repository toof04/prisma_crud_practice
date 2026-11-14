import {Router} from "express";
import userRoutes from "./userRoutes.js";
import postRoutes from "./postRoutes.js";
import commentRoutes from "./commentRoutes.js";
const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/comments", commentRoutes);
router.use("/api/posts", postRoutes);
export default router;