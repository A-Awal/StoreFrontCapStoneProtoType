import passport from "passport";
import {
  Profile,
  Strategy as GoogleOAuth2Strategy,
  VerifyCallback,
} from "passport-google-oauth20";
import {
  Profile as FacebookProfile,
  Strategy as FacebookStrategy,
} from "passport-facebook";
import { User, UserType } from "../entities/user";
import { Strategy as LocalStrategy } from "passport-local";

//login
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
          return done(null, false, { message: "Invalid email or password." });
        }
        if (!user.activated) {
          return done(null, false, {
            message: "Please, activate your account.",
          });
        }
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
          return done(null, false, {
            message: "Invalid email or password.",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Google auth config
passport.use(
  new GoogleOAuth2Strategy(
    {
      clientID: process.env.GoogleClientId!,
      clientSecret: process.env.GoogleClientSecret!,
      callbackURL: process.env.Google_Redirect_Url!,
      scope: ["profile", "email"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const user = await User.findOne({
          where: { email: profile._json.email },
        });

        if (!user) {
          const newUser = User.create({
            first_name: profile._json.given_name,
            last_name: profile._json.family_name,
            email: profile._json.email,
            role: UserType.customer,
            activated: true,
          });

          await newUser.save();

          if (newUser) {
            return done(null, newUser);
          }
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FacebookClientID,
      clientSecret: process.env.FacebookClientSecret,
      callbackURL: process.env.Facebook_Redirect_Url,
      profileFields: ["id", "email", "name"], // specify the fields to retrieve from Facebook
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: FacebookProfile,
      done
    ) => {
      try {
        const user = await User.findOne({
          where: { email: profile._json.email },
        });
        if (!user) {
          const newUser = User.create({
            first_name: profile._json.first_name,
            last_name: profile._json.last_name,
            email: profile._json.email,
            role: UserType.business,
            activated: true,
          });
          await newUser.save();

          if (newUser) {
            return done(null, newUser);
          }
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, (user as any).id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findOne({ where: { id: id } });

    if (user) {
      done(null, user);
    } else {
      done(new Error("User not found"));
    }
  } catch (err) {
    done(err);
  }
});
