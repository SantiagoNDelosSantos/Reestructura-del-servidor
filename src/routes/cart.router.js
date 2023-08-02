import {
    Router
} from "express";

import {
    consultarCarts,
    consultarCartPorId,
    crearCart,
    agregarProductoEnCarrito,
    eliminarProductoDelCarrito,
    eliminarTodosLosProductosDelCarrito,
    actualizarCarrito,
    actualizarProductoEnCarrito
} from '../controllers/cartController.js';

const cartRouter = Router();

cartRouter.get('/', consultarCarts);
cartRouter.get('/:id', consultarCartPorId);
cartRouter.post('/', crearCart);
cartRouter.post('/:cid/products/:pid', agregarProductoEnCarrito);
cartRouter.delete('/:cid/products/:pid', eliminarProductoDelCarrito);
cartRouter.delete('/:cid', eliminarTodosLosProductosDelCarrito);
cartRouter.put('/:cid', actualizarCarrito);
cartRouter.put('/:cid/products/:pid', actualizarProductoEnCarrito);

export default cartRouter;