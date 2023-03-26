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
import { User } from "../entities/user";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { userSchema } from "../utils/validator";


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET as string,
};

passport.use(
    new JwtStrategy(jwtOptions, (jwtPayload, done) => {
        User.findOne({ where: { id: jwtPayload.id } })
            .then((user) => {
                if (user) {
                    done(null, user);
                } else {
                    done(null, false, { message: "User not found" });
                }
            })
            .catch((err) => {
                console.error(`error authenticating : ${err}`);
                done(err, false, { message: "Erorr logging in" });
            });
    })
);

//login
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            const loginSchema = userSchema.pick({
                email: true,
                password: true,
            });
            const validUser = await loginSchema.safeParseAsync({
                email,
                password,
            });

            if (validUser.success === false) {
                return done(null, false, validUser.error);
            }

            try {
                const { data } = validUser;
                const user = await User.findOne({
                    where: { email: data.email },
                });

                if (!user) {
                    return done(null, false, {
                        message: "Invalid credentials.",
                    });
                }
                if (!user.activated) {
                    return done(null, false, {
                        message: "Please, activate your account.",
                    });
                }
                const isPasswordMatch = await user.comparePassword(password);
                if (!isPasswordMatch) {
                    return done(null, false, {
                        message: "Invalid credentials.",
                    });
                }

                return done(null, user);
            } catch (err) {
                console.error(`error authenticating : ${err}`);
                return done(err);
            }
        }
    )
);

// Google auth config
passport.use(
    new GoogleOAuth2Strategy(
        {
            clientID: process.env.GoogleClientId,
            clientSecret: process.env.GoogleClientSecret,
            callbackURL: process.env.Google_Redirect_Url,
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
                    where: { oauth_id: profile.id },
                });
                const userEmail = await User.findOne({
                    where: { email: profile._json.email },
                });

                if (!user) {
                    if (userEmail) {
                        return done(null, false, {
                            message:
                                "Email already exist, Please use a different account or login",
                        });
                    }
                    const newUser = User.create({
                        oauth_id: profile.id,
                        first_name: profile._json.given_name,
                        last_name: profile._json.family_name,
                        email: profile._json.email,
                        activated: true,
                    });
                    await newUser.save();
                    return done(null, newUser);
                }
                return done(null, user);
            } catch (err) {
                console.error(`error authenticating : ${err}`);
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
                    where: { oauth_id: profile.id },
                });
                const userEmail = await User.findOne({
                    where: { email: profile._json.email },
                });

                if (!user) {
                    if (userEmail) {
                        return done(null, false, {
                            message:
                                "Email already exist, Please use a different account or login",
                        });
                    }
                    const newUser = User.create({
                        oauth_id: profile.id,
                        first_name: profile._json.first_name,
                        last_name: profile._json.last_name,
                        email: profile._json.email,
                        activated: true,
                    });
                    await newUser.save();
                    return done(null, newUser);
                }

                return done(null, user);
            } catch (err) {
                console.error(`error authenticating : ${err}`);
                return done(err);
            }
        }
    )
);
