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

    const names = ['alonzo church', 'Haskell curry', 'stephen_kleene', 'John Von Neumann', 'stephen_kleene'];
    console.log(names);

    const new_names = _.chain(names)
        .filter(isValid)
        .map(s => s.replace(/_/, ' '))
        .uniq()
        .map(_.startCase)
        .sort()
        .value();
    console.log("new_names = ", new_names);

    const gatherStats = function (stat, country) {
        if (!isValid(stat[country])) {
            stat[country] = {'name': country, 'count': 0};
        }
        stat[country].count++;
        return stat;
    };

    const new_countries = _.chain(persons)
        .filter(isValid)
        .map(_.property('address.country'))
        .reduce(gatherStats, {})
        .values()
        .sortBy('count')
        .reverse()
        .first()
        .value()
        // .name;

    console.log("country = ", new_countries);


    return (
        <>
            <h1>Lorem ipsum dolor.</h1>
        </>
    )
}