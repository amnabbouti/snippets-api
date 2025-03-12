import {Router} from 'express';
import {createSnippet, getAllSnippets, deleteSnippet} from '../controllers/snippetController';

const router = Router();

router.post('/snippets', createSnippet);
router.get('/snippets', getAllSnippets);
router.delete('/snippets/:id', deleteSnippet);

export default router;