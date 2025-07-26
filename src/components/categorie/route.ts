import { Router } from 'express';
import { 
    createCategoryController, 
    getAllCategorieByUserController, 
    updateCategoryController, 
    deleteCategoryController 
} from './controller';

const router = Router();

router.post('/createCategory', createCategoryController);
router.get('/getAllCategoriesByUser/:userId', getAllCategorieByUserController);
router.patch('/updateCategory/:id', updateCategoryController);
router.delete('/deleteCategory/:id', deleteCategoryController);

export default router;
