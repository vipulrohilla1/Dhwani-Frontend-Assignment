import React, { useState, useEffect, useRef } from 'react'
import './App.css';



export const useMountEffect = (fun) => useEffect(fun, []);

// Gneral Focus Hook
const UseFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

    return [htmlElRef, setFocus]
}

//const isBoolean = (param) => typeof (param) === "boolean"

const CreaditCardField = () => {

    const [input1Ref, setInput1Focus] = UseFocus()
    const [input2Ref, setInput2Focus] = UseFocus()
    const [input3Ref, setInput3Focus] = UseFocus()
    const [input4Ref, setInput4Focus] = UseFocus()

    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');

    const [cardNumbers, setCardNumbers] = useState([]);

    const [errFlag, setErrFlag] = useState(false);




    const maxLengthCheck = (object) => {
        if (typeof object.target.value === 'str') {
            object.target.value = ''
        }
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    const handleSubmit = () => {
        let cardNumber = `${input1}-${input2}-${input3}-${input4}`
        if (cardNumber.length > 18) {

            setCardNumbers(prev => [...prev, cardNumber]);
        }
    }

    useEffect(() => {
        let cardNumber = `${input1}-${input2}-${input3}-${input4}`
        if (cardNumber.length > 18) {
            setErrFlag(true)
        } else {
            setErrFlag(false)
        }

    }, [input1, input2, input3, input4])

    const removeCard = (index) => {
        setCardNumbers(prev => {
            let p = [...prev];
            p.splice(index, 1)
            return p;
        })
    }

    const handlePaste = (value) => {
        let cardArr = value?.match(/.{1,4}/g);
        setInput1(cardArr[0] || '');
        setInput2(cardArr[1] || '');
        setInput3(cardArr[2] || '');
        setInput4(cardArr[3] || '');
        console.log(cardArr)
    }

    useMountEffect(setInput1Focus) 
    //
    return (
        <>
            <div className="creaditCardField">
                <span className="label">Card Number*</span>
                <div>

                </div>
                <div className="creaditCardField-inputContainer">
                    <input
                        ref={input1Ref}
                        value={input1}
                        type="number"
                        maxLength="4"
                        onInput={maxLengthCheck}
                        onChange={(e) => {
                            let val = e.target.value
                            setInput1(val)
                            if (val.toString().length > 3) setInput2Focus()
                        }}
                        onPaste={(e) => handlePaste(e.clipboardData.getData('Text'))}
                    />
                    <input
                        value={input2}
                        ref={input2Ref}
                        type="number"
                        maxLength="4"
                        onInput={maxLengthCheck}
                        onChange={(e) => {
                            let val = e.target.value
                            setInput2(val)
                            if (val.toString().length > 3) setInput3Focus()
                        }}
                        onPaste={(e) => console.log(e.clipboardData.getData('Text'))}
                    />
                    <input
                        value={input3}
                        ref={input3Ref}
                        type="number"
                        maxLength="4"
                        onInput={maxLengthCheck}
                        onChange={(e) => {
                            let val = e.target.value
                            setInput3(val)
                            if (val.toString().length > 3) setInput4Focus()
                        }}
                        onPaste={(e) => console.log(e.clipboardData.getData('Text'))}
                    />
                    <input
                        value={input4}
                        ref={input4Ref}
                        type="number"
                        maxLength="4"
                        onInput={maxLengthCheck}
                        onChange={(e) => setInput4(e.target.value)}
                        onPaste={(e) => console.log(e.clipboardData.getData('Text'))}
                    />
                    {
                        errFlag && (

                            <button onClick={() => handleSubmit()} className="btn">Submit</button>
                        )
                    }
                </div>
            </div>
            <ul>
                {cardNumbers.map((e, i) => (
                    <li key={i}><span>{e}</span> <span onClick={() => removeCard(i)} className="pointer">x</span></li>
                ))}
            </ul>
        </>
    )
}

export default CreaditCardField;