import {Field, InputType, ObjectType} from "type-graphql";

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

@InputType()
export class MethodParam {
    @Field()
    name: string;

    @Field()
    value: string;
}

@InputType()
export class CertInput {
    @Field()
    checkCount: number;

    @Field()
    functionName: string;

    @Field(() => [MethodParam])
    params: [MethodParam]
}

@ObjectType()
export class CertOutPut {
    @Field()
    encoded: string;

    @Field()
    sign: CertSign;

    @Field()
    recover: string;

    @Field()
    expiration: number;

    @Field()
    certificate: string;
}
