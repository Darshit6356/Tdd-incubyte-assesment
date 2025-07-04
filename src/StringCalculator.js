class StringCalculator{
    add(numbers)
    {
        if(!numbers)                  //if the string is empty
                return 0; 
        let delimeter=/,|\n/;
        let parts=numbers.split(delimeter);
        return parts.map(Number).reduce((sum,n)=>sum+n,0);
    }
}

module.exports=StringCalculator;