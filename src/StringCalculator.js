class StringCalculator{
    constructor(){
        // Default delimiters
        this.DELIMETER=/,|\n/;
    }

    processDelimeterSection(section)
    {
        if(section.startsWith("[") && section.endsWith("]")){
            // Multiple or multi-character delimiters like //[***][%%]
            const delimiters=[];      // Clear default delimiters

            let currentDelimiter="";
            let collecting = false;

            for(let char of section)
            {
                if(char==="["){
                    currentDelimiter=""
                    collecting=true;
                }
                else if(char==="]"){
                    collecting=false;
                    delimiters.push(currentDelimiter);
                }
                else if(collecting){
                    currentDelimiter+=char;
                }
            }
            
            // Escape special characters manually
            const escapedDelimeter=delimiters.map(d=>this.checkForSpecialChar(d));

            //returning one regular expression for all delimeters
            return new RegExp(escapedDelimeter.join("|"));

        }
        else{
            // Single-character delimiter
            return new RegExp(this.checkForSpecialChar(section));             
        }
    }

    containsNegatives(nums)
    {
        //finding array of negative numbers
        const negatives=nums.filter(n=>n<0);                    

        if(negatives.length>0)
        {
            throw new Error(`Negatives are not allowed : ${negatives.join(', ')}`);
        }
    }

    sumValidNumbers(nums)
    {
        // Ignore numbers greater than 1000 and return sum
        return nums.filter(n=>n<=1000).reduce((sum,n)=>sum+n,0);
    }

    checkForSpecialChar(delim)
    {
        const specials=['.','*','+','?','^','$','{','}','(',')','|','[',']','\\'];
        let escaped='';
        for(let char of delim)
        {
            // If the character is special, prefix it with a backslash
            if(specials.includes(char))
            {
                escaped+="\\"+char;
            }
            else
            {
                //otherwise add it as it is
                escaped+=char;
            }
        }
        return escaped;
    }

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

            this.DELIMETER=this.processDelimeterSection(delimeterSection);  
        }

        // Split the numbers string into array of integers
        const nums=numbers.split(this.DELIMETER).map(Number);
        this.containsNegatives(nums);

        return this.sumValidNumbers(nums);
                          
    }
}

module.exports=StringCalculator;