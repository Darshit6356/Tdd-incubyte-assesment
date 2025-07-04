const StringCalculator =require("../src/StringCalculator");
describe("starting calculator",()=>{
    let calculator;
    beforeEach(()=>{
        calculator=new StringCalculator();
    });
    test("test for empty string",()=>{
        expect(calculator.add("")).toBe(0);
    });
    test("test for single number ",()=>{
        expect(calculator.add("4")).toBe(4);
    });

});