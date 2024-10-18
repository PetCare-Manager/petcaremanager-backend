import { Router } from 'express';
import passport from '../../infrastructure/passport';

const router = Router();

// Ruta para iniciar el proceso de autenticación con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account'}));

// Ruta de callback que Google usará para redirigir
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const { token } = req.user as { token: string };
    res.json({ token });
  }
);

export default router;
