import {InputType, Field} from 'type-graphql';
import {Length} from 'class-validator';

@InputType()
export class PasswordResetInput
{
    @Field()
    @Length(5)
    password: string;
    
    @Field()
    confirm_password: string;

    @Field()
    id: string;
    
    @Field()
    token: string;

}