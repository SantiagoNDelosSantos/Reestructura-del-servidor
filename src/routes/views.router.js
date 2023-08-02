import { Router } from 'express';
import passport from 'passport';

import { verProductosEnTiempoReal, verChat, verUsuario, verPerfil} from '../controllers/viewsController.js';

const viewsRouter = Router();

viewsRouter.get('/cart', (req, res) => {
    res.render('cart', { title: 'Productos' });
});

viewsRouter.get('/realtimeproducts', verProductosEnTiempoReal);

viewsRouter.get('/chat', verChat);

viewsRouter.get('/register', (req, res) => {
    res.render('register', { title: 'Registro' });
});

viewsRouter.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

viewsRouter.get('/api/user', passport.authenticate('jwt', { session: false }), verUsuario);

viewsRouter.get('/', passport.authenticate('jwt', { session: false }), verPerfil);

export default viewsRouter;
