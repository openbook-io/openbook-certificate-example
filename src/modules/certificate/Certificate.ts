import {Arg, Query, Resolver} from 'type-graphql';
import {CertInput, CertOutPut, CertSign} from './model/Certificate';
import contractArtifacts from "./ContractArtifacts";
import Web3 from 'web3';

@Resolver()
export class CertificateResolver {
    @Query(() => CertOutPut)
    async getCertificate(
        @Arg("data") {
            checkCount,
            functionName,
            functionId,
            params
        }: CertInput
    ): Promise<CertOutPut | null> {

        const web3: any = new Web3();
        const contract: any = new web3.eth.Contract(contractArtifacts.abi);

        // certificate singer's private key to be replaced from config file.
        const signerPrivateKey: string = "0x20244D96C84FCB6ECB00372F08B30D0ACF87514163788CD0386DA1227CFAAAC8";
        // token address to be replaced from config file.
        const tokenAddress: string = "0xefe4a184c8e8556149541577e1f78c48d66ea2f9";
        // temporal certificate to generate encoded abi.
        const tempCert: string = "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
        const certSize: number = 96 * 2; // 96 bytes

        // make params to generate encoded abi.
        const args: string[] = params.map(param => param.value);
        args.push(tempCert);

        // encode abi from params.
        const encodedABI: string = contract.methods[functionName](...args).encodeABI();

        // extract encoded params from encoded abi.
        const encodedParams: string = encodedABI.substring(0, encodedABI.length - certSize);

        // transaction expiration 20 minutes in seconds
        const expiration: number = Math.floor(Number(new Date()) / 1000) + 1200;

        const data: any = web3.utils.soliditySha3(
            {
                t: 'bytes',
                v: functionId
            },
            {
                t: 'bytes',
                v: encodedParams
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

        const certSign: CertSign = web3.eth.accounts.sign(data, signerPrivateKey); // involves 65 bites hash
        const certificate: string = certSign.signature + expiration.toString(16);
        const recover: string = web3.eth.accounts.recover(certSign); // wallet address

        return {
            encoded: encodedParams,
            sign: certSign,
            recover: recover,
            expiration: expiration,
            certificate
        };
    }
}
