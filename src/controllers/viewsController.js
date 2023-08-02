import userModel from '../daos/mongodb/models/users.model.js';
import ManagerProducts from '../daos/mongodb/ProductsManager.class.js';
import ManagerMessage from '../daos/mongodb/MessagesManager.class.js';
import ManagerCarts from '../daos/mongodb/CartManager.class.js';

const managerProducts = new ManagerProducts();
const managerMessage = new ManagerMessage();
const managerCarts = new ManagerCarts();

export const verProductosEnTiempoReal = async (req, res) => {
    try {
        const limit = Number(req.query.limit);
        const page = Number(req.query.page);
        let sort = Number(req.query.sort);
        let filtro = req.query.filtro;
        let filtroVal = req.query.filtroVal;

        const products = await managerProducts.consultarProductos(limit, page, sort, filtro, filtroVal);

        res.render('realTimeProducts', { title: 'Productos Actualizados', products });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error al consultar los productos. Por favor, inténtelo de nuevo más tarde.' });
    }
};

export const verChat = async (req, res) => {
    try {
        const messages = await managerMessage.verMensajes();
        res.render('chat', { title: 'Mensajes Actualizados', messages });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error al consultar los mensajes. Por favor, inténtelo de nuevo más tarde.' });
    }
};

export const verUsuario = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });
        const cart = await managerCarts.consultarCartPorId(user.cart);
        const cartID = cart._id;
        res.send({ user, cartID });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al cargar el carrito. Por favor, inténtelo de nuevo más tarde.' });
    }
};

export const verPerfil = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });
        if (!user) {
            return res.redirect('/login');
        }
        const { first_name, last_name, email, age, role } = user;
        res.render('profile', {
            user: {
                first_name,
                last_name,
                email,
                age,
                role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al cargar el perfil. Por favor, inténtelo de nuevo más tarde.' });
    }
};