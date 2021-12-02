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

    const classicGreeting = (firstname, lastname) => "Hello Mr. " + firstname + " " + lastname
    const sayGreeting = R.compose(R.toUpper, classicGreeting)
    console.log(sayGreeting("Alexander", "Kor"));

    const str = `We can only see a short distance 
           ahead but we can see plenty there 
           that needs to be done`;

    const explode = (str) => str.split(/\s+/);
    const count = (arr) => arr.length;

    const countWords = R.compose(count, explode);
    console.log(countWords(str));


    const sortByFirstItem = R.sortBy(R.prop(0));
    const pairs = [[-1, 1], [-3, 3], [-2, 2]];
    console.log("pairs = ", sortByFirstItem(pairs));

    const alice = {
        name: 'ALICE',
        age: 101
    };
    const bob = {
        name: 'Bob',
        age: -10
    };
    const clara = {
        name: 'clara',
        age: 314.159
    };
    const people = [clara, bob, alice];
    const mySort = R.sortBy(R.prop('name'))
    console.log(mySort(people));

    const my_person = () => ({
        name: "Alex",
        surname: "Kor",
        age: 10
    })

    const getAge = R.compose(R.prop('name'), my_person)
    console.log("getAge = ", getAge());
///////////////////////////////////////////////

    const students = ['Rosser', 'Turing', 'Kleene', 'Church'];
    const grades = [80, 100, 90, 99];
    const smartestStudent = R.compose(
        R.head,
        R.pluck(0),
        R.reverse,
        R.sortBy(R.prop(1)),
        R.zip);
    console.log(smartestStudent(students, grades));


    return (
        <>
            <h1>Lorem ipsum dolor.</h1>
        </>
    )
}