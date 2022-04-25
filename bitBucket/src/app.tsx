import React from "react"
import ReactDOM from "react-dom"
import { useState, useEffect } from "react"
import CurrencyInput from "react-currency-input-field"

import "./index.css"
import "./style.css"
const products = require("../build/public/products.json")

const App = () => {
    const [amount, setAmount] = useState(0)
    const [product, setProduct] = useState("Automobile Loan")
    const [tenure, setTenure] = useState(12)
    const [chosenLoan, setchosenLoan] = useState({})
    const [totalAmount, setTotalAmount] = useState(588)
    const [monthlyAmount, setMonthlyAmount] = useState(0)

    const handleChangeamount = (e: any) => {
        setAmount(Number(e.target.value))
    }

    const loan = (product: string) => {
        setProduct(product)
    }
    const incT = () => {
        if (product === "Automobile Loan" || product === "cash Loan") {
            if (tenure < 60) {
                setTenure(tenure + 1)
            } else {
                setTenure(60)
            }
        }
        if (product === "housing Loan") {
            if (tenure < 84) {
                setTenure(tenure + 1)
            } else {
                setTenure(84)
            }
        }
    }
    const decT = () => {
        if (product === "Automobile Loan" || product === "housing Loan") {
            if (tenure > 12) {
                setTenure(tenure - 1)
            } else {
                setTenure(12)
            }
        }
        if (product === "housing Loan") {
            if (tenure > 24) {
                setTenure(tenure - 1)
            } else {
                setTenure(24)
            }
        }
    }
    useEffect(() => {
        console.log("data", products)
        console.log("loan", product)
        console.log("===>", tenure)
        const choice = products.filter((loan: {}) => loan.name === product)
        setchosenLoan(choice[0])
        console.log("===>", chosenLoan)

        //calculate total amout :
        //total amount = loan amount + (loan amount * product interest)
        setTotalAmount(Number(amount) + Number(amount) * Number(chosenLoan.interest))
        console.log(totalAmount)
        //calculate monthly deposit :
        //totalamout/ months
        setMonthlyAmount(Number(totalAmount / tenure))
    })
    const calculateTargetDate = (month: number) => {
        const currentmonth = new Date().getMonth() + 1
        var Year = new Date().getFullYear()
        var date = currentmonth + month
        // console.log(date)

        if (date >= 12) {
            Year += 1
            date -= 12
        } else if (date > 24) {
            Year += 2
            date -= 12
        } else if (date > 36) {
            Year += 3
            date -= 12
        } else if (date > 48) {
            Year += 4
            date -= 12
        } else if (date > 60) {
            Year += 5
            date -= 12
        } else if (date > 72) {
            Year += 6
            date -= 12
        } else {
            Year += 7
            date -= 12
        }
        const months = {
            January: "1",
            February: "2",
            Marsh: "3",
            April: "4",
            May: "5",
            June: "6",
            July: "7",
            Augest: "8",
            September: "9",
            October: "10",
            November: "11",
            December: "12",
        }
        //console.log(Object.entries(months)[date][1])

        return " " + Object.entries(months)[date][0] + " " + Year
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <span className="loan">Let’s plan your loan</span>
            <div className="container">
                <div className="categories">
                    <img
                        className="automobile"
                        src="travel.png"
                        onClick={() => loan("Automobile Loan")}
                    />
                    <img className="housing" src="house.png" onClick={() => loan("Housing Loan")} />
                    <img className="cash" src="dollar.png" onClick={() => loan("Cash Loan")} />
                </div>
                <div className="inputs">
                    <div className="amount">
                        <label>Loan amount</label>
                        <img className="dollarSign" src="dollar-sign.png" />
                        <CurrencyInput
                            className="input1"
                            placeholder="25,000"
                            allowDecimals
                            min={Number(chosenLoan.min_amount)}
                            max={Number(chosenLoan.max_amount)}
                            onChange={handleChangeamount}></CurrencyInput>
                    </div>
                    <div className="months">
                        <label>Number of months</label>
                        <img className="LeftArrow" src="LeftArrrow.png" onClick={() => decT()} />
                        <img className="rightArrow" src="RightArrow.png" onClick={() => incT()} />
                        <input value={tenure} className="input2"></input>
                    </div>
                </div>
                <div className="monthlyamount">
                    <h2>Monthly amount</h2>
                    <h1>$ {Math.round(monthlyAmount)}</h1>
                </div>
                <div className="message">
                    <p>
                        You’re planning {tenure} monthly deposits to reach your ${amount} goal by
                        {calculateTargetDate(tenure)} The total amount loaned will be ${totalAmount}
                        .
                    </p>
                </div>
                <button type="button" className="apply">
                    Apply Now
                </button>
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))
