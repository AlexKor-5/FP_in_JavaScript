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


    // const getCountry = person => person.address.country
    // const res = persons.map(getCountry).reduce(gatherStats, {})
    // console.log("res = ", res);

    const gatherCountryNumbers = (accum, curr, index) => {
        const current = curr.address.country
        const item = {name: current, count: 0}
        accum[index] = item
        return accum
    }
    const findMax = (a, c) => Math.max(a, c)

    const result = persons.reduce(gatherCountryNumbers, [])
    // console.log("last = ", result);

    const gatherStats = (stat, country) => {
        if (!isValid(stat[country])) {
            stat[country] = {'name': country, 'count': 0}
        }
        stat[country].count++
        return stat
    }

    const topCountry = _.chain(persons)
        .filter(isValid)
        .map(_.property('address.country'))
        .reduce(gatherStats, {})
        .values()
        .sortBy('count')
        .reverse()
        .first()
        .value().name
    console.log(topCountry)

    const upperCase = value => {
        return value.toUpperCase()
    }
    console.log(upperCase("string"));
    _.mixin({"upper": upperCase})
    console.log(_.upper("my little string"))

    const arrY = [2, 4, 6, 8]
    console.log(_.tail(arrY));


    const arrI = [1, 2, 3, 4]
    const sum = (arr) => {
        if (_.isEmpty(arr)) return 0
        return _.first(arr) + sum(_.tail(arr))
    }
    console.log(sum(arrI));


    return (
        <>
            <h1>Lorem ipsum dolor.</h1>
        </>
    )
}