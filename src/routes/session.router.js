import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

// Importaciòn variables de entorno: 
import { envCoderSecret, envCoderCookie} from "../config.js";

const router = Router();

// router.js
router.post('/register', (req, res, next) => {
    passport.authenticate('register', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // La autenticación falló, enviamos el mensaje de error en formato JSON
            return res.status(401).json({
                message: info.message
            });
        }
        // La autenticación es exitosa, respondemos con los datos del usuario
        res.json({
            message: 'Registro exitoso',
            user
        });
    })(req, res, next);
});

// Login:
router.post('/login', (req, res, next) => {

    passport.authenticate('login', { session: false },(err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                message: info.message
            });
        } else{
            let token = jwt.sign({email: user.email, first_name: user.first_name}, envCoderSecret,{
            expiresIn: 10 * 10 * 10, });
            res.cookie(envCoderCookie, token, {httpOnly: true}).send({status: 'success'});
        }

    })(req, res, next);
});

// Current:
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) =>{
    res.send(req.user);
});

// Autenticación con GitHub:
router.get('/github', passport.authenticate('github', {session: false, scope: 'user: email'}));

router.get('/githubcallback', (req, res, next) => {
    passport.authenticate('github', { session: false }, async (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Error en la autenticación con GitHub.' });
        } else {
            try {
                // Generar el token JWT utilizando la información del usuario
                const token = jwt.sign({ email: user.email, first_name: user.first_name }, envCoderSecret, { expiresIn: '1h' });
                
                // Enviar el token JWT al cliente en una cookie
                res.cookie(envCoderCookie, token, { httpOnly: true }).redirect('/realtimeproducts');
            } catch (error) {
                return next(error);
            }
        }
    })(req, res, next);
});

/*
// Cerrar sesión:
router.get('/logout', (req, res) => {
    req.logout(); // Eliminar la sesión de Passport
    req.session.destroy(); // Destruir sesión
    res.send('Sesión cerrada');
});
*/

export default router;