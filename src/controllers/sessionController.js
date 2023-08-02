import jwt from 'jsonwebtoken';
import passport from 'passport';
import { envCoderSecret, envCoderCookie } from '../config.js';

export const registerUser = (req, res, next) => {
    passport.authenticate('register', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                message: info.message
            });
        }
        res.json({
            message: 'Registro exitoso',
            user
        });
    })(req, res, next);
};

export const loginUser = (req, res, next) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                message: info.message
            });
        } else {
            let token = jwt.sign({ email: user.email, first_name: user.first_name }, envCoderSecret, {
                expiresIn: 10 * 10 * 10,
            });
            res.cookie(envCoderCookie, token, { httpOnly: true }).send({ status: 'success' });
        }
    })(req, res, next);
};

export const getCurrentUser = (req, res) => {
    res.send(req.user);
};

export const authenticateWithGitHub = (req, res, next) => {
    passport.authenticate('github', { session: false }, async (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Error en la autenticación con GitHub.' });
        } else {
            try {
                const token = jwt.sign({ email: user.email, first_name: user.first_name }, envCoderSecret, {
                    expiresIn: '1h',
                });
                res.cookie(envCoderCookie, token, { httpOnly: true }).redirect('/realtimeproducts');
            } catch (error) {
                return next(error);
            }
        }
    })(req, res, next);
};
