import { Router } from 'express';

import { verMensajes, nuevoMensaje, eliminarMensaje } from '../controllers/chatController.js';

const msmRouter = Router();

msmRouter.get('/', verMensajes);
msmRouter.post('/', nuevoMensaje);
msmRouter.delete('/:mid', eliminarMensaje);

export default msmRouter;