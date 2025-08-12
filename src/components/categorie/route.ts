import { Router } from 'express';
import { 
    createCategoryController, 
    getAllCategorieByUserController, 
    updateCategoryController, 
    deleteCategoryController,
    getCategoriesWithProductsController 
} from './controller';

const router = Router();

router.post('/createCategory', createCategoryController);
router.get('/getAllCategoriesByUser/:userId', getAllCategorieByUserController);
router.patch('/updateCategory/:id', updateCategoryController);
router.delete('/deleteCategory/:id', deleteCategoryController);
router.get('/with-products/:userId', getCategoriesWithProductsController);

export default router;
