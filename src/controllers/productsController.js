import ManagerProducts from '../daos/mongodb/ProductsManager.class.js'

const managerProducts = new ManagerProducts();

export const consultarProductoPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await managerProducts.consultarProductoPorId(id);
        if (!product) {
            console.log(`No se encontró ningún producto con el ID ${id}.`)
            res.status(404).json({
                error: `No se encontró ningún producto con el ID ${id}.`
            });
        } else {
            res.send({
                product
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Error al consultar el producto.'
        });
    }
};

export const consultarProductos = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        let sort = Number(req.query.sort) || 1;
        let filtro = req.query.filtro || null;
        let filtroVal = req.query.filtroVal || null;

        const data = await managerProducts.consultarProductos(limit, page, sort, filtro, filtroVal);

        res.send(data);
        console.log(data.products.docs);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Error al consultar los productos.'
        });
    }
};

export const crearProducto = async (req, res) => {
    try {
        const productData = req.body;
        const createdProduct = await managerProducts.crearProducto(productData);

        // Actualización Real Time: 
        const products = await managerProducts.consultarProductos();
        req.socketServer.sockets.emit('productos', products);

        res.send({
            product: createdProduct
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Error al crear el producto.'
        });
    }
};

export const actualizarProducto = async (req, res) => {
    try {
        const pid = req.params.pid;
        const updatedFields = req.body;
        const updatedProduct = await managerProducts.actualizarProducto(pid, updatedFields);

        // Actualización Real Time: 
        const products = await managerProducts.consultarProductos();
        req.socketServer.sockets.emit('productos', products);

        if (!updatedProduct) {
            console.log(`No se encontró ningún producto con el ID ${pid}.`)
            res.status(404).json({
                error: `No se encontró ningún producto con el ID ${pid}.`
            });
        } else {
            res.send(updatedProduct);
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Error al actualizar el producto.'
        });
    }
};

export const eliminarProducto = async (req, res) => {
    try {
        const pid = req.params.pid;
        const result = await managerProducts.eliminarProducto(pid);
        if (!result) {
            console.log(`No se encontró ningún producto con el ID ${pid}.`)
            res.status(404).json({
                error: `No se encontró ningún producto con el ID ${pid}.`
            });
        } else {

            // Actualización Real Time: 
            const products = await managerProducts.consultarProductos();
            req.socketServer.sockets.emit('productos', products);

            res.send(result);
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Error al eliminar el producto.'
        });
    }
};