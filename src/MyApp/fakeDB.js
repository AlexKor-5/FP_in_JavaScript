export const DataBase = (function () {
    //private
    const data = [
        {ssn: '444-4444-656', firstname: 'Alex', lastname: 'Jhg'},
        {ssn: '6785-66-656', firstname: 'Mark', lastname: 'Liker'},
        {ssn: '444-44-4444', firstname: 'Time', lastname: 'Buson'},
        {ssn: '657-432-89', firstname: 'Ricky', lastname: 'Martin'}
    ]

    function DataBaseEncapsulated() {
        //constructor
    }

    DataBaseEncapsulated.prototype.print = function () {
        console.log(data)
    }
    DataBaseEncapsulated.prototype.get = function (ssn) {
        return data.find(person => person.ssn === ssn) || null
    }

    return DataBaseEncapsulated
})()

let db = new DataBase()
export default db

