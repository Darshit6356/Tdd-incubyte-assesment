class StringCalculator{
    add(numbers)
    {
        if(!numbers)                  //if the string is empty
                return 0; 
        const parts=numbers.split(/,|\n/);
        return parts.map(Number).reduce((sum,n)=>sum+n,0);
    }
}

module.exports=StringCalculator;