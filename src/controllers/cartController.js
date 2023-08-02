import ManagerCarts from '../daos/mongodb/CartManager.class.js';

const managerCarts = new ManagerCarts();

export const consultarCarts = async (req, res) => {
    try {
        const carts = await managerCarts.consultarCarts();
        res.send(carts);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Error al consultar los carritos.'
        });
    }
};

export const consultarCartPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await managerCarts.consultarCartPorId(id);
        res.send(cart);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Error al consultar el carrito.'
        });
    }
};

export const crearCart = async (req, res) => {
    try {
        await managerCarts.crearCart();
        res.send({
            status: 'Success.'
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Error al crear un nuevo carrito.'
        });
    }
};

export const agregarProductoEnCarrito = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        await managerCarts.agregarProductoEnCarrito(cartId, productId);
        res.send({
            status: 'Success.'
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Error al agregar un producto al carrito.'
        });
    }
};

export const eliminarProductoDelCarrito = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        await managerCarts.deleteProductFromCart(cartId, productId);
        res.send({
            status: 'Success.'
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Error al eliminar un producto del carrito.'
        });
    }
};

export const eliminarTodosLosProductosDelCarrito = async (req, res) => {
    try {
        const cartId = req.params.cid;
        await managerCarts.deleteAllProductFromCart(cartId);
        res.send({
            status: 'Success.'
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Error al eliminar todos los productos del carrito.'
        });
    }
};

export const actualizarCarrito = async (req, res) => {
    try {
        const cid = req.params.cid;
        const updatedCartFields = req.body;
        const updatedCart = await managerCarts.actualizarCarrito(cid, updatedCartFields);
        if (!updatedCart) {
            res.status(404).json({
                error: `No se encontró ningún carrito con el ID ${cid}.`
            });
        } else {
            res.send(updatedCart);
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Error al actualizar el carrito.'
        });
    }
};

export const actualizarProductoEnCarrito = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const updatedProdInCart = req.body;
        const updatedProdCart = await managerCarts.actualizarProductoEnCarrito(cid, pid, updatedProdInCart);
        if (!updatedProdCart) {
            res.status(404).json({
                error: 'No se encontró el producto en el carrito.'
            });
        } else {
            res.send(updatedProdCart);
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Error al actualizar el producto en el carrito.'
        });
    }
};