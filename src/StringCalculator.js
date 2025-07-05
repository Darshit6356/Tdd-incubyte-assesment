class StringCalculator{
    add(numbers)
    {
        if(!numbers)                  //if the string is empty
                return 0; 
        let delimeterUsed=/,|\n/;
        if(numbers.startsWith("//"))
        {
            const newlineIndex=numbers.indexOf("\n");
            const delimeterSection=numbers.substring(2,newlineIndex);         // for extracting the delemeters between the "//" and "\n"
            if(delimeterSection.startsWith("[") && delimeterSection.endsWith("]"))
            {
                //extract all substring between [ and ]
                const extractedDelimeter=delimeterSection.slice(1,-1);
                delimeterUsed=new RegExp(this.checkForSpecialChar(extractedDelimeter));
            }
            else
            {
                delimeterUsed=new RegExp(this.checkForSpecialChar(delimeterSection));              //generating regular expression with handling of special chars
            }
            numbers=numbers.substring(newlineIndex+1);
        }
        const nums=numbers.split(delimeterUsed).map(Number);

        const negatives=nums.filter(n=>n<0);                    //finding array of negative numbers

        if(negatives.length>0)
        {
            throw new Error(`Negatives are not allowed : ${negatives.join(', ')}`);
        }

        return nums.filter(n=>n<=1000).reduce((sum,n)=>sum+n,0);                   //reach here only if nums have all non negative numbers
    }

    checkForSpecialChar(delim)
    {
        const special=/[.*+?^${}()|[\]\\]/g;
        return delim.replace(special,'\\$&');
    }
}

module.exports=StringCalculator;