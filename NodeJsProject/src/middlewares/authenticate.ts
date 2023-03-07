import { MiddlewareFn } from "type-graphql";
import { HttpContext } from "../controllers/graphqlTypes/context";
import jwt from 'jsonwebtoken';
export const isAuth: MiddlewareFn<HttpContext> = async ({context}, next) => {
    const token = context.req.headers["auth-token"].split(" ")[1];

    console.log(`I am working they way like on ${token}`);

    if(!token){
        return "not authenticated";
    }

    try{
        const verified = jwt.verify(token, 'secretepassword');
    }
    catch(err)
    {
        return "Can't verify you";
    }
    next();
}