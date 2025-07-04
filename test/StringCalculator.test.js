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
    });


    test("test for two numbers.",()=>{
        expect(calculator.add("1,2")).toBe(3);
    });


    test("test for multiple numbers.",()=>{
        expect(calculator.add("1,2,3,4")).toBe(10);
    });


    test("test for numbers with comma(,) and newline(\n).",()=>{
        expect(calculator.add("1\n2,3")).toBe(6);
    });


    test("test for other single char delimeter between the numbers.",()=>{
        expect(calculator.add("//;\n1;2;3")).toBe(6);
    })


});