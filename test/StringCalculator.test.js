const StringCalculator =require("../src/StringCalculator");
describe("starting calculator...",()=>{
    let calculator;
    beforeEach(()=>{
        calculator=new StringCalculator();
    });


    test("test for empty string.",()=>{
        expect(calculator.add("")).toBe(0);
    });


    test("test for single number.",()=>{
        expect(calculator.add("4")).toBe(4);
        expect(calculator.add("98")).toBe(98);
    });


    test("test for two numbers.",()=>{
        expect(calculator.add("1,2")).toBe(3);
        expect(calculator.add("12,8")).toBe(20);
        expect(calculator.add("0,3")).toBe(3);
    });


    test("test for multiple numbers.",()=>{
        expect(calculator.add("1,2,3,4")).toBe(10);
        expect(calculator.add("10,20,30")).toBe(60);
    });


    test("test for numbers with comma(,) and newline.",()=>{
        expect(calculator.add("1\n2,3")).toBe(6);
        expect(calculator.add("1,2\n3\n4,5")).toBe(15);
    });


    test("test for other single char delimeter between the numbers.",()=>{
        expect(calculator.add("//;\n1;2;3")).toBe(6);
        expect(calculator.add("//k\n4k2k6")).toBe(12);
        expect(calculator.add("//>\n1>2>3")).toBe(6);
    });


    test("test for special char delimeter between the numbers.",()=>{
        expect(calculator.add("//*\n1*2*3")).toBe(6);
        expect(calculator.add("//.\n1.2.3")).toBe(6);
    });



    test("test for single negative number.",()=>{
        expect(()=>calculator.add("1,2,-3")).toThrow("Negatives are not allowed : -3");
        expect(()=>calculator.add("3,4,-500,6,7")).toThrow("Negatives are not allowed : -500");
    });


    test("test for multiple negative number.",()=>{
        expect(()=>calculator.add("1,-2,-3,4")).toThrow("Negatives are not allowed : -2, -3");
        expect(()=>calculator.add("1,-40,3,-42,4")).toThrow("Negatives are not allowed : -40, -42");
    });


    test("test for numbers greater than 1000 should be ignored.",()=>{
        expect(calculator.add("10001,2")).toBe(2);
        expect(calculator.add("10001,2000")).toBe(0);
        expect(calculator.add("10001,20000,1000")).toBe(1000);
    });

    test("test for long delimeter between the numbers.",()=>{
        expect(calculator.add("//[***]\n1***2***3")).toBe(6);
        expect(calculator.add("//[$$]\n1$$2$$3")).toBe(6);
        expect(calculator.add("//[]\n123")).toBe(6);
    });

    
    test("test for multiple delimeters between the numbers.",()=>{
        expect(calculator.add("//[*][%]\n1*2%3")).toBe(6);
        expect(calculator.add("//[////][++++]\n1////2++++3////4")).toBe(10);
        expect(calculator.add("//[((][)))]\n1((2)))3)))4")).toBe(10);
    })


    test("test for invalid characters", () => {
        expect(() => calculator.add("1,abc,2")).toThrow("Invalid number: \"abc\"");
        expect(() => calculator.add("1,abc,ok")).toThrow("Invalid number: \"abc\"");
    });


    test("test for mixing custom and default delimiters", () => {
        expect(() => calculator.add("//[***]\n1***2,3")).toThrow("Unexpected default delimiter with custom delimiter.");
        expect(() => calculator.add("//[##]\n1##2##3,4##5")).toThrow("Unexpected default delimiter with custom delimiter.");
    });

});