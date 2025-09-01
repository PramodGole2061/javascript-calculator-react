import React from 'react'

export default function Calculator(props) {
    const{display,setDisplay, expression, setExpression} = props;
    const btnStyle = {
        btn: "col btn btn-secondary btn-lg m-1"
    }

    const buttons = [
        [
            { id: "clear", value: "AC" },
            { id: "divide", value: "/" },
            { id: "multiply", value: "*" }
        ],
        [
            { id: "seven", value: "7" },
            { id: "eight", value: "8" },
            { id: "nine", value: "9" },
            { id: "subtract", value: "-" }
        ],
        [
            { id: "four", value: "4" },
            { id: "five", value: "5" },
            { id: "six", value: "6" },
            { id: "add", value: "+" }
        ],
        [
            { id: "one", value: "1" },
            { id: "two", value: "2" },
            { id: "three", value: "3" }
        ],
        [
            { id: "zero", value: "0" },
            { id: "decimal", value: "." },
            { id: "equals", value: "=" }
        ]
    ]

    const isValueOperator = (value)=>{
        return /[+\-*/]/.test(value);
    }
    const handleClick = (value) => {
        //if the previous button clicked was =
        if(expression.includes("=")){
            const prevResult = display;

            if(isValueOperator(value)){
                setExpression(prevResult+value);
                setDisplay(value);
                return;
            }else if(value === "AC"){
                setExpression("");
                setDisplay("0");
                return;
            }else{
                //if a number is clicked after =, start new expression
                setExpression(value);
                setDisplay(value);
                return
            }
        }

        //for the first time when display is 0
        if(value === "AC") {
            setDisplay("0");
            setExpression("");
            return;
        }
        if(value === "=") {
            try{
            //calculte result using eval() if -- then turn to +
            let result = eval(expression.replace(/--/g,"+"));
            //round to 4 digits
            result = Math.round(10000*result)/10000;
            setDisplay(result.toString());
            setExpression(expression + "= "+result.toString());
            }catch(error){
                setDisplay("Error");
                setExpression("");
            }
            return;
        }
        if (isValueOperator(value)) {
            // Start with the current expression
            let newExpression = expression;

            // This is the core logic: If the incoming operator is NOT a minus sign,
            // it needs to override any operators at the end of the current expression.
            if (value !== '-') {
                // Go backwards from the end of the string
                let i = newExpression.length - 1;
                // While the character at the current position is an operator...
                while (isValueOperator(newExpression[i])) {
                    // ...move back one position.
                    i--;
                }
                // Slice the string to remove all trailing operators
                newExpression = newExpression.slice(0, i + 1);
            }

            // Now, append the new operator value to the cleaned-up expression
            setExpression(newExpression + value);
            setDisplay(value);
            return;
        }
        if(value === "."){
            //prevent multiple decimals in a number
            const partsOfExpression = expression.split(/[+\-*/]/);
            const lastPartOfExpression = partsOfExpression[partsOfExpression.length-1];
            if(lastPartOfExpression.includes(".")){
                return;
            }else{
                setExpression(expression+value);
                setDisplay(display.includes(".")?display: display+value);;
                return;
            }
        }
        const partsOfExpression = expression.split(/[+\-*/]/);
        const lastPartOfExpression = partsOfExpression[partsOfExpression.length-1];
        if(lastPartOfExpression === "0" && value === "0"){
            return;
        }
        if(display === "0" || isValueOperator(display)){
            setDisplay(value);
        }else{
            setDisplay(display+value);
        }
        setExpression(expression+value);

        
    }
  return (
    <div className="container text-center p-0" style={{maxWidth: "500px",backgroundColor: "#100f0fff"}}>
    {buttons.map((row,rowIndex) =>(
        <div className="row" key={rowIndex}>
        {row.map((btn)=>(
            <button onClick={()=>{handleClick(btn.value)}} id={btn.id} key={btn.id} className={`${btnStyle.btn}`}>{btn.value}</button>
        ))}    
        </div >        
    ))}    
       
    </div>
  )
}
