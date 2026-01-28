import express from 'express';
import { 
  getAllWorkshops, 
  getWorkshopById, 
  createWorkshop, 
  updateWorkshop, 
  deleteWorkshop,
  getMyWorkshops 
} from '../controllers/workshopController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllWorkshops);
router.post('/', protect, createWorkshop);
router.get('/my', protect, getMyWorkshops);
router.get('/:id', getWorkshopById);
router.put('/:id', protect, updateWorkshop);
router.delete('/:id', protect, deleteWorkshop);

export default router;