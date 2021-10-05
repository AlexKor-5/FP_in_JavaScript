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
        {id: 345, fullName: "Alexander Kor", address: {email: "", country: "US", city: "Oland"}},
        {id: 890, fullName: "Alice Merton", address: {email: "", country: "UK", city: "London"}},
        {id: 234, fullName: "John Abram", address: {email: "", country: "UK", city: "London"}},
        {id: 564, fullName: "Memphice Lee", address: {email: "", country: "UKR", city: "Lviv"}}
    ]

    const result = _(persons).reduce((stat, person) => {
        const country = person.address.country;
        stat[country] = _.isUndefined(stat[country]) ? 1 : stat[country] + 1;
        return stat;
    }, {});

    console.log("result = ", result)
    ///////////////////////////////////////////////

    const getCountry = person => person.address.country;

    const gatherStats = function (stat, criteria) {
        stat[criteria] = _.isUndefined(stat[criteria]) ? 1 : stat[criteria] + 1;
        return stat;
    };

    const my_result = _(persons).map(getCountry).reduce(gatherStats, {});
    console.log("my_result = ", my_result)
    /////////////////////////////////////////////////

    const cityPath = ['address', 'city'];
    const countryLens = R.lens(R.path(cityPath), R.assocPath(cityPath));

    console.log(_(persons).map(R.view(countryLens)).reduce(gatherStats, {}));
    console.log(_.groupBy(persons, R.view(countryLens)))

    return (
        <>
            <h1>Lorem ipsum dolor.</h1>
        </>
    )
}