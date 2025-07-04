class StringCalculator{
    add(numbers)
    {
        if(!numbers)                  //if the string is empty
                return 0; 
        let delimeter=/,|\n/;
        if(numbers.startsWith("//"))
        {
            const newlineIndex=numbers.indexOf("\n");
            const delimeters=numbers.substring(2,newlineIndex);         // for extracting the delemeters between the "//" and "\n"
            delimeter=new RegExp(delimeters);              //generating regular expression
            numbers=numbers.substring(newlineIndex+1);
        }
        const parts=numbers.split(delimeter);
        return parts.map(Number).reduce((sum,n)=>sum+n,0);
    }

    
}

module.exports=StringCalculator;