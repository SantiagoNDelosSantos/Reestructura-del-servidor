import { Router } from 'express';
import passport from 'passport';
import { registerUser, loginUser, getCurrentUser, authenticateWithGitHub } from '../controllers/sessionController.js';

const sessionRouter = Router();

// Register:
sessionRouter.post('/register', registerUser);

// Login:
sessionRouter.post('/login', loginUser);

// Current user:
sessionRouter.get('/current', passport.authenticate('jwt', { session: false }), getCurrentUser);

// GitHub:
sessionRouter.get('/github', passport.authenticate('github', { session: false, scope: 'user:email' }));

sessionRouter.get('/githubcallback', authenticateWithGitHub);

export default sessionRouter;
