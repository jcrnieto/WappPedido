import { Router } from 'express';
import { 
    createProductController, 
    getAllProductByIdController, 
    deleteProductController,
    getProductByCategoryIdController,
    getProductsWithoutCategoryController,
    updateProductController,
    getProductByIdController
} from './controller';

const router = Router();

router.post('/createProduct', createProductController);
router.get('/getAllProductsByUserId/:userId', getAllProductByIdController);
router.get('/getAllProductByCategoryId/:categoryId', getProductByCategoryIdController);
router.delete('/deleteProduct/:productId', deleteProductController);
router.get('/no-category', getProductsWithoutCategoryController);
router.patch('/updateProduct/:id', updateProductController);
router.get('/getProductById/:userId/:productId', getProductByIdController);

export default router;