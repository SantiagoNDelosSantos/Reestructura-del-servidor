// github.passport.js

import passport from 'passport';
import { Strategy as GitHubStrategy} from 'passport-github2';
import userModel from '../daos/mongodb/models/users.model.js';
import ManagerCarts from '../daos/mongodb/CartManager.class.js';

// Importación de variables de entorno:
import { envClientID, envClientSecret, envCallbackURL } from '../config.js';

const managerCarts = new ManagerCarts();

export const initializePassportGitHub = () => {

    passport.use('github', new GitHubStrategy({
        clientID: envClientID,
        clientSecret: envClientSecret,
        callbackURL: envCallbackURL,
    }, async (accessToken, refreshToken, profile, done) => {

        try {
            let user = await userModel.findOne({
                first_name: profile._json.name,
            })

            if (!user) {
                const cart = await managerCarts.crearCart();

                let newUser = {
                    first_name: profile._json.name,
                    last_name: "X",
                    email: profile._json.email ||"X",
                    age: 19,
                    password: "X",
                    role: "User",
                    cart: cart._id
                };
                const result = await userModel.create(newUser);
                return done(null, result);
            } else {
                return done(null, user);
            }

        } catch (error) {
            return done(error);
        }
    }));

};
