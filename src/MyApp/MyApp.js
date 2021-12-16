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

    // const safeFindObject = R.curry((db, id) => {
    //     return Either.fromNullable(db.get(id));
    // });
    //
    // const findStudent = safeFindObject(db);
    // console.log(findStudent('657-432-89').getOrElse('Not found!'));
    // findStudent('657-432-89N').orElse(console.log)

///////////////////////////////////////////////////////////////////////////////////

    class IO {
        constructor(effect) {
            if (!_.isFunction(effect)) {
                throw 'IO Usage: function required';
            }
            this.effect = effect;
        }

        static of(a) {
            return new IO(() => a);
        }

        static from(fn) {
            return new IO(fn);
        }

        map(fn) {
            let self = this;
            return new IO(function () {
                return fn(self.effect());
            });
        }

        chain(fn) {
            return fn(this.effect());
        }

        run() {
            return this.effect();
        }
    }

    const read = function (document, selector) {
        return () => {
            return document.querySelector(selector).innerHTML;
        };
    };

    const write = function (document, selector) {
        return (val) => {
            document.querySelector(selector).innerHTML = val;
            return val
        };
    };

    const readDom = _.partial(read, document);
    const writeDom = _.partial(write, document);

    const changeToStartCase =
        IO.from(readDom('#student-name'))
            .map(_.startCase)
            .map(writeDom('#student-name'));

    changeToStartCase.run()
    // console.log(document.querySelector('#student-name').innerHTML)
/////////////////////////////////////////////////////////////////////////////


    const validLength = (len, str) => str.length === len;

    const checkLengthSsn = (ssn) =>
        validLength(9, ssn) ?
            Either.right(ssn) :
            Either.left('Invalid SSN')

    const safeFindObject = R.curry((db, id) => {
        const val = db.get(id)
        return val ? Either.right(val) : Either.left('Object not found with id: ' + id)
    });

    const findStudent = safeFindObject(db);

    const csv = arr => arr.join(',');

    const debugLog = console.log
    const errorLog = console.error

    const trim = (str) => str.replace(/^\s*|\s*$/g, '');
    const normalize = (str) => str.replace(/-/g, '-');
    const cleanInput = R.compose(normalize, trim);

    const showStudent = (ssn) =>
        Maybe.fromNullable(ssn)
            // .map(cleanInput)
            // .chain(checkLengthSsn)
            .chain(findStudent)
            .map(R.props(['ssn', 'firstname', 'lastname']))
            .map(csv)
    // .map(console.log);

    showStudent('444-44-4444').orElse(errorLog);
/////////////////////////////////////////////////////////////////////

    const map = R.curry((f, container) => {
        return container.map(f);
    });

    const chain = R.curry((f, container) => {
        return container.chain(f);
    });

    const lift = R.curry((f, value) => {
        return Maybe.fromNullable(value).map(f);
    });

    const trace = R.curry((msg, val) => debugLog(msg + ':' + val));

    const append = R.curry((elementId, info) => {
        document.querySelector(elementId).innerHTML = info;
        return info;
    });

    const liftIO = val => IO.of(val)

    const showMyStudent = R.compose(
        map(append('#student-name')),
        liftIO,
        map(csv),
        map(R.props(['ssn', 'firstname', 'lastname'])),
        R.tap(trace('Record fetched successfully!')),
        chain(findStudent),
        R.tap(trace('Input was valid')),
        lift(cleanInput)
    );
    showMyStudent('444-44-4444').run()
////////////////////////////////////////////////////////////////////////////////

    const checkType = R.curry(function (typeDef, actualType) {
        if (R.is(typeDef, actualType)) {
            return actualType;
        } else {
            throw new TypeError('Type mismatch.Expected [' + typeDef + '] but found[' + typeof actualType + ']');
        }
    });


    const Tuple = function ( /* types */) {
        const typeInfo = Array.prototype.slice.call(arguments, 0);

        const _T = function ( /* values */) {
            const values = Array.prototype.slice.call(arguments, 0);
            if (values.some((val) => val === null || val === undefined)) {
                throw new ReferenceError('Tuples may not have any null values');
            }

            if (values.length !== typeInfo.length) {
                throw new TypeError('Tuple arity does not match its prototype');
            }

            values.map(function (val, index) {
                this['_' + (index + 1)] = checkType(typeInfo[index])(val);
            }, this);

            Object.freeze(this);
        };

        _T.prototype.values = function () {
            return Object.keys(this).map(function (k) {
                return this[k];
            }, this);
        };

        return _T;
    };

    const Status = Tuple(Boolean, String);

    const isValid = function (str) {
        if (str.length === 0) {
            return new Status(false, 'Invalid input. Expected non-empty value!');
        } else {
            return new Status(true, 'Success!');
        }
    }

    const trimm = (str) => str.replace(/^\s*|\s*$/g, '');
    const normalizee = (str) => str.replace(/-/g, '');

    console.log(isValid(normalizee(trimm('444-44-4444'))));

///////////////////////////////
    const StringPair = Tuple(String, String);
    const name = new StringPair('Barkley', 'Rosser');
    const [first, last] = name.values();
    console.log(first, last)


    return (
        <>
            <h1>Lorem ipsum dolor.</h1>
        </>
    )
}