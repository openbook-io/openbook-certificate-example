import { Arg, Query, Resolver  } from 'type-graphql';
import { CertInput, CertOutPut, CertSign } from './model/Certificate';
import  Web3 from 'web3';

@Resolver()
export class CertificateResolver {
  @Query(() => CertOutPut)
  async getCertificate(
      @Arg("data") {
        checkCount,
        functionId
      }: CertInput
  ):Promise<CertOutPut | null> {

    const web3: any = new Web3();

    // Certificate Singer PrivateKey to be replaced from config file
    const signerPrivateKey: string = "0x1d715754e960770dc46da3704157e3b91fb57c21e50b4f706b8af31272aaf022";

    // OpenBook Token Address to be replaced from config file
    const tokenAddress: string     = "0x91620735349a0B25750facc8e3354c9f02B1518B";

    // Transaction Expiration 20 minutes in seconds
    const expiration: number       = Math.floor(Number(new Date()) / 1000) + 1200;

    const data: any = web3.utils.soliditySha3(
        {
          t: 'bytes',
          v: functionId
        },
        {
          t: 'address',
          v: tokenAddress,
        },
        {
          t: 'uint256',
          v: expiration,
        },
        {
          t: 'uint256',
          v: checkCount
        }
    );

    const signature: CertSign = web3.eth.accounts.sign(data, signerPrivateKey); // involves 65 bites hash
    const recover: string = web3.eth.accounts.recover(signature); // wallet address

    return {
      sign: signature,
      recover: recover,
      expiration: expiration,
      cert: signature.signature + expiration.toString(16)
    };
  }
}
