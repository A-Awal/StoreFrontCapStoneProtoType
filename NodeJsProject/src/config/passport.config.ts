// import passport from "passport";


// import {
//   Profile,
//   Strategy as GoogleOAuth2Strategy,
//   VerifyCallback,
// } from "passport-google-oauth20";
// import {
//   Strategy as FacebookStrategy,
//   Profile as FacebookProfile,
// } from "passport-facebook";

// import { Strategy as AppleStrategy } from "passport-apple";

// import { User, UserType } from "../entities/user";

// // Google auth config
// passport.use(
//   new GoogleOAuth2Strategy(
//     {
//       clientID: process.env.GoogleClientId!,
//       clientSecret: process.env.GoogleClientSecret!,
//       callbackURL: process.env.Google_Redirect_Url!,
//       scope: ["profile", "email"],
//     },
//     async (
//       accessToken: string,
//       refreshToken: string,
//       profile: Profile,
//       done: VerifyCallback
//     ) => {
//       console.log(accessToken);
//       console.log(profile);

//       try {
//         const user = await User.findOne({
//           where: { email: profile._json.email },
//         });

//         // If user doesn't exist creates a new user. (similar to sign up)

//         if (!user) {
//           const newUser = User.create({
//             first_name: profile._json.given_name,
//             last_name: profile._json.family_name,
//             email: profile._json.email,
//             role: UserType.customer,
//           });
//           newUser.activated = true;

//           await newUser.save();

//           if (newUser) {
//             done(null, newUser);
//           }
//         } else {
//           done(null, user);
//         }
//       } catch (err) {
//         throw err;
//       }
//     }
//   )
// );

// // Facebook oauth config
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FacebookClientID,
//       clientSecret: process.env.FacbookClientSecret,
//       callbackURL: process.env.Facebook_Redirect_Url,
//       profileFields: ["id", "emails", "name"], // specify the fields to retrieve from Facebook
//     },
//     async (
//       accessToken: string,
//       refreshToken: string,
//       profile: FacebookProfile,
//       done
//     ) => {
//       try {
//         console.log(profile);
//         let user = await User.findOne({
//           where: { email: profile._json.email },
//         });
//         if (!user) {
//           const newUser = User.create({
//             first_name: profile._json.first_name,
//             last_name : profile._json.last_name,
//             email : profile._json.email,
//             role: UserType.business,
//           });
//           await newUser.save();
//           if (newUser) {
//         done(null, newUser);
//           }
//         } else {
//         done(null, user);
//         }
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user) ;
// });

// passport.deserializeUser(async (id: number, done) => {
//   console.log(id);
//   try {
//     const user = await User.findOne({ where: { id: id } });

//     if (user) {
//       done(null, user);
//     } else {
//       done(new Error("User not found"));
//     }
//   } catch (err) {
//     done(err);
//   }
// });



// passport.use(
//   new AppleStrategy(
//     {
//       clientID: "YOUR_APPLE_ID_CLIENT_ID",
//       teamID: "YOUR_APPLE_ID_TEAM_ID",
//       keyID: "YOUR_APPLE_ID_KEY_ID",
//       privateKeyPath: "PATH_TO_YOUR_APPLE_ID_PRIVATE_KEY",
//       callbackURL: "http://localhost:3000/auth/apple/callback",
//       passReqToCallback: true,
//     },
//     async (
//       req: Request,
//       accessToken: string,
//       refreshToken: string,
//       idToken: any,
//       profile: any,
//       done: any
//     ) => {
//       try {
//         // Extract user data from the ID token
//         const {
//           sub: userId,
//           email,
//           email_verified: emailVerified,
//         } = idToken.payload;

//         // Check if the user is already registered
//         const user = await User.findOne({ where: { appleId: userId } });

//         if (!user) {
//           // If the user is not registered, create a new user
//           const newUser = await User.create({
//             u
//             appleId: userId,
//             email,
//             emailVerified,
//           });
//           done(null, newUser);
//         } else {
//           done(null, user);
//         }
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

