
import { buildSchema } from "type-graphql";
import { CertificateResolver } from '../modules/certificate/Certificate';

export const createSchema = () =>
  buildSchema({
    resolvers: [
      CertificateResolver
    ]
  });