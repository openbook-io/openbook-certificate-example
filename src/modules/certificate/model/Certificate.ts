import {Field, InputType, ObjectType} from "type-graphql";


@InputType()
export class CertInput {
    @Field()
    checkCount: number;

    @Field()
    functionId: string;
}

@ObjectType()
export class CertSign {
    @Field()
    message: string;

    @Field()
    signature: string;

    @Field()
    messageHash?: string;

    @Field()
    r: string;

    @Field()
    s: string;

    @Field()
    v: string;

    @Field()
    rawTransaction?: string;

    @Field()
    transactionHash?: string;
}

@ObjectType()
export class CertOutPut {
    @Field()
    sign: CertSign;

    @Field()
    recover: string;

    @Field()
    expiration: number;

    @Field()
    cert: string;
}
