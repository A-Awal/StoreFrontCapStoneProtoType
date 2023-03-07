import {ArgsType, Field} from 'type-graphql';
// import {minLength} from 'class-validator';

@ArgsType()
export class LoginArgument
{
    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;
}