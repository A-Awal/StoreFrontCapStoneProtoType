import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { Request } from "express";
import { Individual } from "../entities/user";



// Configure the Passport Local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      // Check the email and password against the database
      try {
        const user = await Individual.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }
        const isValidPassword = password == user.password ? true : false
        if (!isValidPassword) {
          return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Configure Passport to serialize and deserialize the user object
passport.serializeUser( (user : any, done) => {
  return done(null, user.id);
});

passport.deserializeUser( async ( req : Request, id:number, done) => {
  // TODO: fetch user from database using id
  const user =  await Individual.findOne({where : {id}})
  return done(null, user);
});

export default passport