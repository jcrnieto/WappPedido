import { Router } from 'express';
import { registerUserController, loginUserController, getUsersController, getPersonalDataByUserController, getUserByEmailController } from './controller';

const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@ejemplo.com
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del usuario
 *                 email:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Email inválido o registro fallido
 *       500:
 *         description: Error en el servidor
 */


router.get('/allUsers', getUsersController);
router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.get('/:id/personal-data', getPersonalDataByUserController);
router.get('/by-email/:email', getUserByEmailController);



export default router;
