import { RequestHandler, Router } from 'express';

import {
  createSnippet,
  deleteSnippet,
  getAllSnippets,
  updateSnippet,
} from '../controllers/snippetController';

const router = Router();

router
  .route('/snippets')
  .post(createSnippet as RequestHandler)
  .get(getAllSnippets as RequestHandler);

router
  .route('/snippets/:id')
  .delete(deleteSnippet as RequestHandler)
  .put(updateSnippet as RequestHandler);

export default router;
