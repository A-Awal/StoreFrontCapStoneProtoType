import {InputType, Field} from 'type-graphql';
import {Length} from 'class-validator';

@InputType()
export class RegisterInput
{
    @Field(() => String)
    business_name: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;

    @Field(() => String)
    @Length(5)
    confirm_password: string;

}