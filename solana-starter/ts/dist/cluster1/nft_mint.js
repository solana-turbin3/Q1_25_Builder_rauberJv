"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const umi_bundle_defaults_1 = require("@metaplex-foundation/umi-bundle-defaults");
const umi_1 = require("@metaplex-foundation/umi");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const wba_wallet_json_1 = __importDefault(require("../wba-wallet.json"));
const bs58_1 = __importDefault(require("bs58"));
const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = (0, umi_bundle_defaults_1.createUmi)(RPC_ENDPOINT);
let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wba_wallet_json_1.default));
const myKeypairSigner = (0, umi_1.createSignerFromKeypair)(umi, keypair);
umi.use((0, umi_1.signerIdentity)(myKeypairSigner));
umi.use((0, mpl_token_metadata_1.mplTokenMetadata)());
const mint = (0, umi_1.generateSigner)(umi);
(async () => {
    let tx = await (0, mpl_token_metadata_1.createNft)(umi, {
        mint,
        sellerFeeBasisPoints: (0, umi_1.percentAmount)(50),
        name: "LUFERAJU",
        uri: "",
        // generate uri on nft_image.ts and put in object below
        // uri: "<uri generated here>"
    }, let, result = await tx.sendAndConfirm(umi));
    const signature = bs58_1.default.encode(result.signature);
    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`);
    console.log("Mint Address: ", mint.publicKey);
})();
