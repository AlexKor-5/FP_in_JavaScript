import React from "react"
import * as R from 'ramda'
import db from "./fakeDB"

export const MyApp = () => {
    const curry = R.curry
    const run = R.compose
    // const taker = document.getElementById('taker')

    // const curring = a => b => c => console.log(a, b, c)

    // const sum = (a, b) => a + b
    const makeSum = curry((a, b) => {
        const _a = makeSum(a)
        return _a + b
    })
    // console.log(makeSum(2)(2))


    const find = curry(function (db, id) {
        const obj = db.get(id);
        if (obj === null) {
            throw new Error('Object not found!');
        }
        return obj;
    });

    const csv = function (student) {
        return `${student.ssn}, ${student.firstname}, ${student.lastname}`;
    };

    const append = curry(function (elementId, info) {
        document.querySelector(elementId).innerHTML = info;
    });

    const appendReact = (info) => info

    // const showStudent = run(append('#taker'), csv, find(db))
    const showStudent = run(appendReact, csv, find(db))


    return (
        <>
            {showStudent('6785-66-656')}
        </>
    )
}