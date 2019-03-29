export class Utils {
    
    public static StrHex2StrBin(input:string):string{
        let result:string = "";
        let i:number;
    
        input = Utils.doPadding(input,2,"0");
    
        for(i = 0 ;i < input.length; i+=2){
          result += Utils.doPadding(parseInt(input.substr(i,2),16).toString(2),8,"0");
        }
        return result;
    }

    public static StrBin2StrHex(input:string):string{
        let result:string = "";
        let i:number;

        input = this.doPadding(input,8,"0");

        for(i =0 ;i < input.length ; i += 8){
        result += this.doPadding(parseInt(input.substr(i,8),2).toString(16),2,"0");
        }
        
        return result;
    }

    public static leftShiftStrBin(input:string, step:number, cycled:boolean){
        var result:string = input;
        var temp:string;
        while(step-->0){
            temp = result.substr(0,1);
            result = result.substr(1);
            if(cycled){
                result = result.concat(temp);
            }
            else{
                result = result.concat("0");
            }
        }

        return result;
    }

    /**
     * compute binary xor of two binary string output. 
     * ex : xor_strBin("0100","1100") => "1000"
     * length of a and b must be same
     * @param {String} a binary string of input a 
     * @param {String} b binary string of input b
     * 
     * @return {String} result
     */
    public static xor_strBin(a:string,b:string):string{
        //check length is same
        
        var result:string = "";
        var temp:string;
        for(var i=0;i<a.length;i++){
            if(a[i]===b[i]){
                temp = "0";
            }
            else{
                temp = "1";
            }
            result = result.concat(temp);
        }

        return result;
    }

     /**
     * convert a integer to binary string,
     * if outLength<result.length or outLength==0, no padding applied 
     * @param {number} input integer input
     * @param {number} outLength the length of binary string as output. function will left pad the result with 0 until reach outLength
     * 
     * @return {String} result
     */
    public static Int2Bin(input:number,outLength:number):string{
        var result = input.toString(2);
        if(outLength!=0 && outLength>result.length){
            result = Utils.doPadding(result,outLength,"0");
        }
        return result;
    }
    
    private static doPadding(input:string,modulus:number,pad:string){
        if(input.length % modulus != 0){
          let remaining:number = modulus - (input.length%modulus);
          input = input.padStart(input.length + remaining,pad);
        }
    
        return input;
    }
    
}