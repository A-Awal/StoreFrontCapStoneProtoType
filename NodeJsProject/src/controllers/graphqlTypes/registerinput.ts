import {InputType, Field} from 'type-graphql';
// import {minLength} from 'class-validator';

@InputType()
export class RegisterInput
{
    @Field()
    business_name: string;

    @Field()
    email: string;

    @Field()
    // @minLength(5)
    password: string;

    @Field()
    confirm_password: string;

}