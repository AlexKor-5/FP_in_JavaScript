import React from "react"
import * as R from 'ramda'
import db from "./fakeDB"
// import * as _ from 'lodash'

export const MyApp = () => {

    const persons = [
        {id: 345, fullName: "Alexander Kor", address: {email: "", country: "US", city: "Oland"}, birthYear: 2000},
        {id: 890, fullName: "Alice Merton", address: {email: "", country: "UK", city: "London"}, birthYear: 1903},
        {id: 234, fullName: "John Abram", address: {email: "", country: "UK", city: "London"}, birthYear: 1999},
        {id: 564, fullName: "Memphice Lee", address: {email: "", country: "UKR", city: "Lviv"}, birthYear: 1903},
        {id: 345, fullName: "Miller Kor", address: {email: "", country: "US", city: "Memphice"}, birthYear: 1995},
        {id: 890, fullName: "Robberto Capachini", address: {email: "", country: "UK", city: "London"}, birthYear: 1992}
    ]

    // const isValid = val => !_.isUndefined(val) && !_.isNull(val);

    class Maybe {
        static just(a) {
            return new Just(a);
        }

        static nothing() {
            return new Nothing();
        }

        static fromNullable(a) {
            return a !== null ? Maybe.just(a) : Maybe.nothing();
        }

        static of(a) {
            return Maybe.just(a);
        }

        get isNothing() {
            return false;
        }

        get isJust() {
            return false;
        }
    }

    class Just extends Maybe {
        constructor(value) {
            super();
            this._value = value;
        }

        get value() {
            return this._value;
        }

        map(f) {
            return Maybe.of(f(this._value));
        }

        getOrElse() {
            return this._value;
        }

        filter(f) {
            Maybe.fromNullable(f(this._value) ? this._value : null);
        }

        chain(f) {
            return f(this._value)
        }

        toString() {
            return `Maybe.Just(${this._value})`;
        }
    }

    class Nothing extends Maybe {
        map(f) {
            return this;
        }

        get value() {
            throw new TypeError("Can't extract the value of a Nothing.");
        }

        getOrElse(other) {
            return other;
        }

        filter() {
            return this._value;
        }

        chain(f) {
            return f(this._value)
        }

        toString() {
            return 'Maybe.Nothing';
        }
    }

//////////////////////////////////////////////////////////////////
    class Either {
        constructor(value) {
            this._value = value;
        }

        get value() {
            return this._value;
        }

        static left(a) {
            return new Left(a);
        }

        static right(a) {
            return new Right(a);
        }

        static fromNullable(val) {
            return val !== null && val !== undefined ? Either.right(val) : Either.left(val);
        }

        static of(a) {
            return Either.right(a);
        }
    }

    class Left extends Either {
        map(_) {
            return this;
        }

        get value() {
            throw new TypeError("Can't extract the value of a Left(a).");
        }

        getOrElse(other) {
            return other;
        }

        orElse(f) {
            return f(this._value);
        }

        chain(f) {
            return this;
        }

        getOrElseThrow(a) {
            throw new Error(a);
        }

        filter(f) {
            return this;
        }

        toString() {
            return `Either.Left(${this._value})`;
        }
    }

    class Right extends Either {
        map(f) {
            return Either.of(f(this._value));
        }

        getOrElse(other) {
            return this._value;
        }

        orElse() {
            return this;
        }

        chain(f) {
            return f(this._value);
        }

        getOrElseThrow(_) {
            return this._value;
        }

        filter(f) {
            return Either.fromNullable(f(this._value) ? this._value : null);
        }

        toString() {
            return `Either.Right(${this._value})`;
        }
    }

    const safeFindObject = R.curry((db, id) => {
        return Either.fromNullable(db.get(id));
    });

    const findStudent = safeFindObject(db);
    console.log(findStudent('657-432-89').getOrElse('Not found!'));
    findStudent('657-432-89N').orElse(console.log)


    return (
        <>
            <h1>Lorem ipsum dolor.</h1>
        </>
    )
}