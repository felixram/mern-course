import { Router } from "express";

const router = Router();

import {
  createJob,
  deleteJob,
  getJob,
  getAllJobs,
  updateJob,
  showStats,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import { chechForTestUser } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllJobs)
  .post(chechForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(chechForTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(chechForTestUser, validateIdParam, deleteJob);

export default router;
