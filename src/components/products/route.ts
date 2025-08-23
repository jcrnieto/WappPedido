import { Router } from 'express';
import { 
    createProductController, 
    getAllProductByIdController, 
    deleteProductController,
    getProductByCategoryIdController,
    getProductsWithoutCategoryController,
    updateProductController,
    getProductByIdController,
    getProductByNameController,
    getAllProductByIdCategoryIsNullController
} from './controller';

const router = Router();

router.post('/createProduct', createProductController);
router.get('/getAllProductsByUserId/:userId', getAllProductByIdController);
router.get('/getAllProductByCategoryId/:categoryId', getProductByCategoryIdController);
router.delete('/deleteProduct/:productId', deleteProductController);
router.get('/no-category', getProductsWithoutCategoryController);
router.patch('/updateProduct/:id', updateProductController);
router.get('/getProductById/:userId/:productId', getProductByIdController);
router.get('/getProductByName/:userId/:searchName', getProductByNameController);
router.get('/getAllProductsByIdCategoryIsNull/:userId', getAllProductByIdCategoryIsNullController);

export default router;