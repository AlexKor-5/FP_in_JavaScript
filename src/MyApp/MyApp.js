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


    class Wrapper {
        constructor(value) {
            this._value = value;
        }

        map(f) {
            return f(this._value);
        }


        fmap(f) {
            return new Wrapper(f(this._value));
        }

        toString() {
            return 'Wrapper (' + this._value + ')';
        }
    }

    const wrap = (val) => new Wrapper(val)

    const wrappedValue = wrap('Get Functional');
    console.log(wrappedValue.map(R.identity));

    const plus = R.curry((a, b) => a + b);
    const plus3 = plus(3);
    const plus10 = plus(10);

    const two = wrap(2);


    const value = two.fmap(plus3).fmap(plus10)
    console.log(value.map(R.identity)); // -> 15


    return (
        <>
            <h1>Lorem ipsum dolor.</h1>
        </>
    )
}