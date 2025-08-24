import { Router } from 'express';
import { createSong, getSong, getSongs } from '../controllers/songsController';

const router = Router();

router.get('/', getSongs);
router.post('/', createSong);
router.get('/:id', getSong);

export default router;

