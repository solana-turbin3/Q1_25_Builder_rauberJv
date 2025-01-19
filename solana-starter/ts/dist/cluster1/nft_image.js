"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const turbin3_wallet_json_1 = __importDefault(require("../../turbin3-wallet.json"));
const umi_bundle_defaults_1 = require("@metaplex-foundation/umi-bundle-defaults");
const umi_1 = require("@metaplex-foundation/umi");
const umi_uploader_irys_1 = require("@metaplex-foundation/umi-uploader-irys");
const promises_1 = require("fs/promises");
// Create a devnet connection
const umi = (0, umi_bundle_defaults_1.createUmi)('https://api.devnet.solana.com');
const image_path = "../generug.png";
let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(turbin3_wallet_json_1.default));
const signer = (0, umi_1.createSignerFromKeypair)(umi, keypair);
umi.use((0, umi_uploader_irys_1.irysUploader)());
umi.use((0, umi_1.signerIdentity)(signer));
(async () => {
    try {
        //1. Load image
        //2. Convert image to generic file.
        //3. Upload image
        const image = await (0, promises_1.readFile)(image_path);
        const generic_file = (0, umi_1.createGenericFile)(image, "rug", { displayName: "Rug", contentType: "image/png" });
        const [myUri] = await umi.uploader.upload([generic_file]);
        console.log("Your Image Uri: ", myUri);
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
