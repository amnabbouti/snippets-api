import {Router} from 'express';
import {createSnippet, getAllSnippets, deleteSnippet, updateSnippet} from '../controllers/snippetController';

const router = Router();

router.post('/snippets', createSnippet);
router.get('/snippets', getAllSnippets);
router.delete('/snippets/:id', deleteSnippet);
router.put('/snippets/:id', updateSnippet);

export default router;