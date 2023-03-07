import {InputType, Field} from 'type-graphql';
// import {minLength} from 'class-validator';

@InputType()
export class customerSignupDetails
{
    @Field()
    first_name: string;

    @Field()
    last_name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    confirm_password: string;

}