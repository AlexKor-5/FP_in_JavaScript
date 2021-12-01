import React from "react"
import * as R from 'ramda'
// import db from "./fakeDB"
import * as _ from 'lodash'

export const MyApp = () => {

    const persons = [
        {id: 345, fullName: "Alexander Kor", address: {email: "", country: "US", city: "Oland"}, birthYear: 2000},
        {id: 890, fullName: "Alice Merton", address: {email: "", country: "UK", city: "London"}, birthYear: 1903},
        {id: 234, fullName: "John Abram", address: {email: "", country: "UK", city: "London"}, birthYear: 1999},
        {id: 564, fullName: "Memphice Lee", address: {email: "", country: "UKR", city: "Lviv"}, birthYear: 1903},
        {id: 345, fullName: "Miller Kor", address: {email: "", country: "US", city: "Memphice"}, birthYear: 1995},
        {id: 890, fullName: "Robberto Capachini", address: {email: "", country: "UK", city: "London"}, birthYear: 1992}
    ]

    const isValid = val => !_.isUndefined(val) && !_.isNull(val);

    const addThreeNumbers = (a, b, c) => a + b + c
    const addNumber = R.curry(addThreeNumbers)
    // console.log(addNumber(1)(2)(3))

/////////////////////////////////////////////////////

    function greet(greeting, name, surname) {
        return greeting + ' ' + name + ' ' + surname;
    }

    const sayHelloTo = _.partial(greet, 'hi');
    const sayHelloToFred = _.partial(sayHelloTo,'Fred')
    console.log(sayHelloToFred('Lee'));


    return (
        <>
            <h1>Lorem ipsum dolor.</h1>
        </>
    )
}