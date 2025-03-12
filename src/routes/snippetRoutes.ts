import {Router} from 'express';
import {createSnippet} from '../controllers/snippetController';

const router = Router();

router.post('/snippets', createSnippet);

export default router;