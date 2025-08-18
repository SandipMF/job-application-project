import { Router } from "express";
import job_application from "./job_application";
import authentication from "./authentication";

const router = Router();

export default () => {
  job_application(router);
  authentication(router);
  return router;
};
