import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  postAddComment,
  deleteComment
} from "../controllers/videoControllers";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.delete(routes.deleteComment, deleteComment);

export default apiRouter;
