import React from "react"
import * as R from 'ramda'
import db from "./fakeDB"
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


    // class Wrapper {
    //     constructor(value) {
    //         this._value = value;
    //     }
    //
    //     map(f) {
    //         return f(this._value);
    //     }
    //
    //
    //     fmap(f) {
    //         return new Wrapper(f(this._value));
    //     }
    //
    //     toString() {
    //         return 'Wrapper (' + this._value + ')';
    //     }
    // }
    //
    // const wrap = (val) => new Wrapper(val)
    //
    // const wrappedValue = wrap('Get Functional');
    // console.log(wrappedValue.map(R.identity));
    //
    // const plus = R.curry((a, b) => a + b);
    // const plus3 = plus(3);
    // const plus10 = plus(10);
    //
    // const two = wrap(2);
    //
    //
    // const value = two.fmap(plus3).fmap(plus10)
    // console.log(value.map(R.identity)); // -> 15

/////////////////////////// monad /////////////////////////////////////////////////////////


    class Wrapper {
        constructor(value) {
            this._value = value;
        }

        static of(a) {
            return new Wrapper(a);
        }

        map(f) {
            return Wrapper.of(f(this._value));
        }

        join() {
            if (!(this._value instanceof Wrapper)) {
                return this;
            }
            return this._value.join();
        }

        get() {
            return this._value
        }

        toString() {
            return `Wrapper (${this._value})`;
        }
    }

    const res = Wrapper.of('Hello Monads!')
        .map(R.toUpper)
        .map(R.identity); //-> Wrapper('HELLO MONADS!')
    // console.log(res)
//////////////////////

    const findObject = R.curry((db, id) => {
        return Wrapper.of(db.get(id));
    });

    const getAddress = student => {
        return Wrapper.of(student.map(R.prop('address')));
    };

    const studentAddress = R.compose(getAddress, findObject(db));

    // console.log(studentAddress('444-44-4444').join().get());

//////////////////////////////////////////////////

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

    const safeFindObject = R.curry((db, id) => {
        return Maybe.fromNullable(db.get(id));
    });

    const safeFindStudent = safeFindObject(db);

    const address = safeFindStudent('444-44-444').map(R.prop('address'));
    console.log("address = ", address.getOrElse("Whoops"));

////////////////////////

    const getCountry = (student) => student
        .map(R.prop('address'))
        .map(R.prop('country'))
        .getOrElse('Country does not exist!')

    const country = R.compose(getCountry, safeFindStudent);

    console.log("country = ", country('444-4444-656'));
///////////////////////////////

    const findMyObject = R.curry((db, id) => {
        return db.get(id);
    });

    const lift = R.curry((f, value) => {
        return Maybe.fromNullable(value).map(f);
    });

    const safeFindMyObject = R.compose(lift(f => f), findMyObject);
    console.log(safeFindObject(db, '6785-66-656').getOrElse("Error"));

    return (
        <>
            <h1>Lorem ipsum dolor.</h1>
        </>
    )
}