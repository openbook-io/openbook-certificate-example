import { Resolver, Query } from 'type-graphql';
@Resolver()
export class CertificateResolver {
  @Query(() => Boolean)
  async getCertificate():Promise<Boolean> {
    return true;
  }
}
