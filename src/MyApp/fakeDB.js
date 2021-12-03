export const DataBase = (function () {
    //private
    const data = [
        {ssn: '444-4444-656', firstname: 'Alex', lastname: 'Jhg', address: "AV Mr. Lee"},
        {ssn: '6785-66-656', firstname: 'Mark', lastname: 'Liker', address: "AV Mr. Leo"},
        {ssn: '444-44-4444', firstname: 'Time', lastname: 'Buson', address: "AV Mr. Lui"},
        {ssn: '657-432-89', firstname: 'Ricky', lastname: 'Martin', address: "AV Mr. Romeo"}
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

