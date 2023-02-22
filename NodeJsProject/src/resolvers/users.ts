import { Resolver, Query} from "type-graphql";

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello(): string {
        return "Welcome to Users"
    }
}