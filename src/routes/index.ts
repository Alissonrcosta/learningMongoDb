import { Router } from 'express';

import * as HomeController from '../controllers/homeController';
import * as InfoController from '../controllers/infoController';
import * as UserController from '../controllers/userController';

const router = Router();

router.get('/', HomeController.home);
router.post('/novo-usuario', HomeController.addUserAction);
router.get('/usuario/:id/adicionaridade', HomeController.addIdade);
router.get('/usuario/:id/excluir', HomeController.removeUserAction);
router.get('/usuario/:id/editar', HomeController.editUser);
router.post('/usuario/:id/atualizar', HomeController.updateUser);



router.get('/contato', InfoController.contato);
router.get('/sobre', InfoController.sobre);

router.get('/nome', UserController.nome);
router.get('/idade', UserController.idadeForm);
router.post('/idade-resultado', UserController.idadeAction);

export default router;