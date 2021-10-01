import React from "react"
import * as R from 'ramda'
import db from "./fakeDB"

export const MyApp = () => {
    // const taker = document.getElementById('taker')
    const curry = R.curry
    const run = R.compose
    const sum = R.sum
    const divide = R.divide
    const input = [30, 50, 10, 79]
    const subtract = R.subtract
    const multiply = R.multiply
    const pluck = R.pluck

    const size = arr => arr.length
    const average = arr => divide(sum(arr), size(arr))
    // console.log("average = ", average(input))
    const data = [
        {name: "Alex", surname: "Kor", id: 450},
        {name: "Mike", surname: "Jophrich", id: 450},
        {name: "Alice", surname: "Merton", id: 450},
        {name: "John", surname: "Lue", id: 450}
    ]
    console.log(data)
    // console.log(data.pluck("name"))
    const pluckNames = pluck("surname")
    // console.log(pluckNames);
    console.log(pluckNames(data))

    return (
        <>
            <h1>Lorem ipsum dolor.</h1>
        </>
    )
}