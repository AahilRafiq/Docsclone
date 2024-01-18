import express from 'express';
import { getAllDocs, createDoc, getDocById , updateDocById , deleteDocById , patchPublicStatusDocById} from '../controllers/docController.js';

const router = express.Router();

router.get('/', getAllDocs);
router.post('/createdoc', createDoc);
router.get('/:id', getDocById);
router.post('/:id', updateDocById);
router.patch('/:id', patchPublicStatusDocById);
router.delete('/:id', deleteDocById);

export default router;