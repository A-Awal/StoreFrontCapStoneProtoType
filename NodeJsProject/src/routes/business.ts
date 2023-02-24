// import express, { Request, Response } from "express";
// import session from "express-session";
// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import jwt from "jsonwebtoken";

// interface User {
//   id: number;
//   username: string;
// }

// const app = express();

// // initialize session middleware
// app.use(
//   session({
//     secret: "your_secret_key_here",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // initialize passport middleware
// app.use(passport.initialize());
// app.use(passport.session());


// passport.use(
//   new LocalStrategy((username, password, done) => {
//     // TODO: Implement your own logic to validate the user's credentials
//     if (username === "user" && password === "password") {
//       return done(null, { id: 1, username: "user" });
//     } else {
//       return done(null, false, { message: "Invalid username or password" });
//     }
//   })
// );

// // configure JWT
// const jwtSecret = "your_jwt_secret_here";
// const jwtExpiration = "1h";



// // endpoint to generate JWT
// app.post(
//   "/login",
//   passport.authenticate("local"),
//   (req: Request, res: Response) => {
//     // authentication succeeded, generate JWT and return it
//     const token = jwt.sign({ id: req.user.id }, jwtSecret, {
//       expiresIn: jwtExpiration,
//     });
//     res.json({ token });
//   }
// );

// // protected endpoint that requires authentication with JWT
// app.get("/protected", authenticateWithJwt, (req: Request, res: Response) => {
//   res.json({
//     message: "You are authorized to access this protected endpoint!",
//   });
// });

// app.listen(3000, () => {
//   console.log("Server listening on port 3000");
// });
