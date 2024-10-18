import  jwt  from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from './user/user.model';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Lógica para buscar o crear un usuario
    let user = await UserModel.findOne({ googleId: profile.id }); // Ajustar según tu repositorio

    if (!user) {
      // Si el usuario no existe, crearlo
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : "No email found";
      user = await UserModel.findOne({ email });// Verifica si ya existe el usuario con este email
      if (!user) {
        user = new UserModel({
          googleId: profile.id,
          email: email
        });
        await user.save();
      }else {
        console.log('Usuario con este correo ya existe.');
      }
    }

    // Aquí generamos el token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Información que quieres almacenar en el token
      process.env.JWT_SECRET!, // Llave secreta para firmar el token
      { expiresIn: '1h' } // El token expirará en 1 hora
    );

    (user as any).token = token;
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

// Serializar el usuario
passport.serializeUser((user, done) => {
  done(null, (user as any).id);
});

// Deserializar el usuario
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
