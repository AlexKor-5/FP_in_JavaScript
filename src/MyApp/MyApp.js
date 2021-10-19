import React from "react"
import * as R from 'ramda'
// import db from "./fakeDB"
import * as _ from 'lodash'

export const MyApp = () => {

    const persons = [
        {id: 345, fullName: "Alexander Kor", address: {email: "", country: "US", city: "Oland"}, birthYear: 2000},
        {id: 890, fullName: "Alice Merton", address: {email: "", country: "UK", city: "London"}, birthYear: 1903},
        {id: 234, fullName: "John Abram", address: {email: "", country: "UK", city: "London"}, birthYear: 1999},
        {id: 564, fullName: "Memphice Lee", address: {email: "", country: "UKR", city: "Lviv"}, birthYear: 1903}
    ]

    const names = ["alon church", "Haskell Carry", "stephen_cleen", "John Von Neu", "stephen_cleen"]
    console.log("before = ", names);

    let myFun = () => {
        let result = [];
        for (let i = 0; i < names.length; i++) {
            let n = names[i]

            if (n !== undefined && n !== null) {
                let ns = n.replace(/_/, " ").split(' ')

                for (let j = 0; j < ns.length; j++) {
                    let p = ns[j]
                    ns[j] = p.charAt(0).toUpperCase() + p.slice(1)

                }
                ns = ns.join(" ")
                if (result.indexOf(ns) < 0) {
                    result.push(ns)
                }
            }
        }
        return result.sort()
    }
    console.log("res = ", myFun());


    return (
        <>
            <h1>Lorem ipsum dolor.</h1>
        </>
    )
}