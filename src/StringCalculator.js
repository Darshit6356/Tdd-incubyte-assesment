class StringCalculator{
    add(numbers)
    {
        // Return 0 for empty input
        if(!numbers)                  
                return 0; 

        // Default delimiters: comma and newline
        let delimiters=[",","\n"];  
        
        //custom delimeter logic
        if(numbers.startsWith("//"))
        {
            const newlineIndex=numbers.indexOf("\n");

            // for extracting the delemeters between the "//" and "\n"
            const delimeterSection=numbers.substring(2,newlineIndex);  
            
            //Extract the actual number string (after "\n")
            numbers=numbers.substring(newlineIndex+1);

            if(delimeterSection.startsWith("[") && delimeterSection.endsWith("]")){
                // Multiple or multi-character delimiters like //[***][%%]
                delimiters=[];      // Clear default delimiters

                let currentDelimiter="";
                let collecting = false;

                for(let char of delimeterSection)
                {
                    if(char==="[")
                    {
                        currentDelimiter=""
                        collecting=true;
                    }
                    else if(char==="]")
                    {
                        collecting=false;
                        delimiters.push(currentDelimiter);
                    }
                    else if(collecting){
                        currentDelimiter+=char;
                    }
                }
                
            }
            else
            {
                // Single-character delimiter
                delimiters=[delimeterSection];              
            }
            
        }

        // Escape special characters manually
        const escapedDelimeter=delimiters.map(d=>this.checkForSpecialChar(d));

        //creating one regular expression for all delimeters
        const splitRegX=new RegExp(escapedDelimeter.join("|"));


        const nums=numbers.split(splitRegX).map(Number);

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