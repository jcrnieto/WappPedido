import { Router } from 'express';
import { 
    createProductController, 
    getAllProductByIdController, 
    deleteProductController,
    getProductByCategoryIdController,
    getProductsWithoutCategoryController,
    updateProductController
} from './controller';

const router = Router();

router.post('/createProduct', createProductController);
router.get('/getAllProductsByUserId/:userId', getAllProductByIdController);
router.get('/getAllProductByCategoryId/:categoryId', getProductByCategoryIdController);
router.delete('/deleteProduct/:productId', deleteProductController);
router.get('/no-category', getProductsWithoutCategoryController);
router.patch('/updateProduct/:id', updateProductController);

export default router;