import React from "react"
import * as R from 'ramda'
// import db from "./fakeDB"
import * as _ from 'lodash'

export const MyApp = () => {
    // const taker = document.getElementById('taker')
    // const curry = R.curry
    // const run = R.compose
    // const sum = R.sum
    // const divide = R.divide
    // const input = [30, 50, 10, 79]
    // const subtract = R.subtract
    // const multiply = R.multiply
    // const pluck = R.pluck

    const persons = [
        {id: 345, fullName: "Alexander Kor"},
        {id: 890, fullName: "Alice Merton"},
        {id: 234, fullName: "John Abram"},
        {id: 564, fullName: "Memphice Lee"},
        {}
    ]

    // console.log(persons)
    // const res = _.map(persons, (item) => item.fullName !== null && item.fullName !== undefined ? item.fullName : '')
    // console.log(res)

    const data = [1, 2, 4]
    console.log(data)
    _(data).reverse().map(item => console.log(item)).value()



    return (
        <>
            <h1>Lorem ipsum dolor.</h1>
        </>
    )
}