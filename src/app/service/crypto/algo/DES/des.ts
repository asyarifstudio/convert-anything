import { DESKey } from './des-key';
import { Utils } from '../../utils/utils';
import { Injector } from "@angular/core";
import { TextConverterService } from 'src/app/service/text-converter/text-converter.service';
const injector = Injector.create({ 
    providers: [ 
        { 
            provide: TextConverterService,
            deps:[]
        }
    ]
  });
export class DES {

    /**
    * Constant table 
    */
    private static TABLE_KEY_PC1: number[] = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
    private static TABLE_KEY_PC2: number[] = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
    private static TABLE_KEY_ITERATOR: number[] = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

    private static TABLE_INPUT_IP: number[] = [58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7];
    private static TABLE_INPUT_IP_INVERSE: number[] = [40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25];
    private static TABLE_INPUT_EXPANSION_S_BOX: number[] = [32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32, 1];
    private static TABLE_INPUT_P: number[] = [16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25];
    private static TABLE_INPUT_S: number[][] = [[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7, 0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8, 4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0, 15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
    [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10, 3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5, 0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15, 13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
    [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8, 13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1, 13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7, 1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
    [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15, 13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9, 10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4, 3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 1],
    [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9, 14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6, 4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14, 11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
    [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11, 10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8, 9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6, 4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
    [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1, 13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6, 1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2, 6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
    [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7, 1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2, 7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8, 2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]];


    private static textConverterService:TextConverterService = injector.get(TextConverterService);

    public static compute(key: DESKey, input: string,encrypt:boolean): string {

        //convert input to binary
        let binKey: string = DES.textConverterService.convert(key.getKey(),TextConverterService.FORMAT_HEX,TextConverterService.FORMAT_BIN);
        let binInput: string = DES.textConverterService.convert(input,TextConverterService.FORMAT_HEX,TextConverterService.FORMAT_BIN);

        let resultBin: string;

        resultBin = DES.computeDES(binKey, binInput,encrypt);


        return Utils.StrBin2StrHex(resultBin);
    }


    private static computeDES(keyBin: string, inputBin: string,encrypt:boolean): string {
        let subkeys: string[];

        subkeys = DES.generateSubkeys(keyBin);

        let init:string = DES.initialPermutation(inputBin);
        let round:string = DES.roundFunction(init,subkeys,encrypt);
        let final:string = DES.finalPermutation(round);

        return final;

    }


    /**
     * generate 16 of 48 bits subkeys
     * @param {String} keys 64 bits of binary string key
     * 
     * @return {String[]} 16 of 48 bits binary string subkeys
     */
    private static generateSubkeys(keys: string): string[] {

        /**
         * STEP 1 : permutate key with TABLE PC1
         */
        let key_1: string = "";
        //generate key_1 with length 56 bits 
        for (var i = 0; i < DES.TABLE_KEY_PC1.length; i++) {
            //index from table - 1, because table index start from 1
            key_1 = key_1.concat(keys[DES.TABLE_KEY_PC1[i] - 1]);
        }

        /**
         * STEP 2 : generate 16 pair subkeys
         */
        //split the key_1 to C and D with length 28 bits
        var keys_2: string[] = [];
        var c = key_1.substr(0, 28);
        var d = key_1.substr(28, 28);
        //do iteration for each subkey till generate 16 pair concatinated
        for (var i = 0; i < DES.TABLE_KEY_ITERATOR.length; i++) {
            c = Utils.leftShiftStrBin(c, DES.TABLE_KEY_ITERATOR[i], true);
            d = Utils.leftShiftStrBin(d, DES.TABLE_KEY_ITERATOR[i], true);
            keys_2 = keys_2.concat(c + d);
        }

        /**
         * STEP 3 : permutate the 16 pairs key with TABLE_KEY_PC2
         */
        var keys_3: string[] = [];
        var subkey: string;
        var permutated_subkey: string;
        //loop for all key in keys_2 length = 16
        for (var i = 0; i < keys_2.length; i++) {
            subkey = keys_2[i];
            permutated_subkey = "";
            //permutate subkey with TABLE_KEY_PC2 
            for (var j = 0; j < DES.TABLE_KEY_PC2.length; j++) {
                permutated_subkey = permutated_subkey.concat(subkey[DES.TABLE_KEY_PC2[j] - 1]);
            }
            keys_3 = keys_3.concat(permutated_subkey);
        }

        //return the result
        return keys_3;

    }

    /**
    * Do initial permutation for input, whether plain or cipher, using TABLE_INPUT_IP
    * @param {String} input binary String of one block input 64 bits
    * 
    * @return {String} 64 bits of binary string of plain after initial permutation
    */
    private static initialPermutation(input: string): string {
        var result: string = "";
        for (var i = 0; i < DES.TABLE_INPUT_IP.length; i++) {
            //index from table - 1, because table index start from 1
            result = result.concat(input[DES.TABLE_INPUT_IP[i] - 1]);
        }
        return result;
    }
    /**
     * Do final permutation for input, either plain or cipher, using TABLE_INPUT_IP_INVERSE
     * @param {String} input binary string of one block input 64 bits 
     * @return {String} 64 bits of binary string of plain after final permutation
     */
    private static finalPermutation(input: string): string {
        var result = "";
        for (var i = 0; i < DES.TABLE_INPUT_IP_INVERSE.length; i++) {
            //index from table - 1, because table index start from 1
            result = result.concat(input[DES.TABLE_INPUT_IP_INVERSE[i] - 1]);
        }
        return result;
    }
    /**
    * Do Round Function for permutated input with 16 of 48 bits binary string subkeys
    * 
    * @param {String} input input after final or initial permutation, length is 64 bits of binary string
    * @param {String[]} keys 16 of 48 bits binary string subkeys @see generateSubkeys
    * @param {boolean} encrypt true if encryption, false for decryption
    * 
    * @return {String} 64 bits of binary string 
    */
    private static roundFunction(input: string, keys: string[], encrypt: boolean):string {

        /**
         * STEP 1 : split the input to half, each 32 bits
         */
        let l: string = input.substr(0, 32);
        let r: string = input.substr(32, 32);

        /**
         * STEP 2 : compute the round function for 16 times
         */
        var tempL: string;
        let tempR: string;
        //for encryption, use key from 0 to 15
        if (encrypt) {
            for (var i = 0; i < 16; i++) {
                tempL = r;
                tempR = Utils.xor_strBin(l,DES.f(r, keys[i]));
                l = tempL;
                r = tempR;
            }
        }
        //for decryption, use key from 15 to 0
        else {
            for (var i = 15; i >= 0; i--) {
                tempL = r;
                tempR = Utils.xor_strBin(l, DES.f(r, keys[i]));
                l = tempL;
                r = tempR;
            }
        }


        //return inverse of L and R
        return r + l;

    }
    /**
     * component of roundFunction, to compute the f function of DES 
     * @param {String} r 32 bit leftmost from the input after i-th iteration
     * @param {String} key the i-th key from 16 of 48 bits subkeys
     * 
     * @return {String} 32 bit of binary String
     */
    private static f(r:string,key:string):string{

        //expand the R, generating 48 bits of data
        var r_expanded = DES.expansionPermutationBox(r);
        //xor the 48 bit R with key
        var r_xor = Utils.xor_strBin(r_expanded,key);
        //compute S BOX, resulting 32 bits of data
        var r_sbox = DES.subtitutionBox(r_xor);
        //compute straight permutation
        return DES.straightPermutation(r_sbox);

    }
    /**
     * component of f, to compute expansion Permutation of R with TABLE_INPUT_EXPANSION_S_BOX
     * @param {String} input 32 bits of binary string
     * @return {String} 48 bits of binary string
     */
    private static expansionPermutationBox(input:string):string{
        var result = "";
        for(var i=0;i<DES.TABLE_INPUT_EXPANSION_S_BOX.length;i++){
            //index from table - 1, because table index start from 1
            result = result.concat(input[DES.TABLE_INPUT_EXPANSION_S_BOX[i] - 1]);
        }
        return result;
    }
    /**
     * component of f, to compute Subtitution Box from input with TABLE_INPUT_S
     * @param {String} input 48 bits of binary string
     * @return {String} 32 bits of binary string
     */
    private static subtitutionBox (input:string):string{
        let Bi:string;
        let Si:number[];
        let col:number,row:number;
        let result:string = "";
        for(var i=0;i<8;i++){
            Bi = input.substr(i*6,6);
            Si = DES.TABLE_INPUT_S[i];
            row = parseInt(Bi[0] + Bi[5],2);
            col = parseInt(Bi.substr(1,4),2);
            result = result.concat(Utils.Int2Bin(Si[row * 16 + col],4));
        }

        return result;
    }
    /**
     * component of f, compute permutation of input with TABLE_INPUT_P
     * @param {String} input 32 bits of binary string
     * @return {String} 32 bits of binary string
     */
    private static straightPermutation (input:string):string{
        var result:string = "";
        for(var i=0;i<DES.TABLE_INPUT_P.length;i++){
            //index from table - 1, because table index start from 1
            result = result.concat(input[DES.TABLE_INPUT_P[i] - 1]);
        }
        return result;
    }
    
}