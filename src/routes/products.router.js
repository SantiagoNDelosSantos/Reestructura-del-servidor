import { Router } from "express";

import {
    consultarProductoPorId,
    consultarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from '../controllers/productsController.js';

const productsRouter = Router();

productsRouter.get('/:id', consultarProductoPorId);
productsRouter.get('/', consultarProductos);
productsRouter.post('/', crearProducto);
productsRouter.put('/:pid', actualizarProducto);
productsRouter.delete('/:pid', eliminarProducto);

export default productsRouter;