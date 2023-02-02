const mongoose = require('mongoose');

// Connection URI
const uri =
  "mongodb://localhost:27017";
const dbName = "personsDB";
mongoose.set('strictQuery', false);
mongoose.connect(`${uri}/${dbName}`);

const fruiteSchema = new mongoose.Schema({
    name: String
})

const personsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Persons name is required"]
    },
    age: {
        type: Number,
        min: 10,
        max: 30
    },
    favouriteFruite: fruiteSchema
});


const Person = mongoose.model("Person", personsSchema);

const Fruite = mongoose.model("Fruite", fruiteSchema);

// const person1 = new Person({
//     age: 10
// })

const penaple = new Fruite({
    name: "Penaple"
})
const person2 = new Person({
    name: "Eugene",
    age: 20,
    favouriteFruite: penaple
})

// const person3 = new Person({
//     name: "Alli",
//     age: 22
// })

// Person.insertMany([person1, person2, person3], (err) => {
//     if(err) {
//         console.log(err.message)
//     } else {
//         console.log("Saved successfully")
//     }
// })

person2.save()

Person.find((err, persons)=> {
    if(err) {
        console.log(err)
    } else {
        persons.forEach(person => {
            console.log(person.favouriteFruite)
        })
    }
})


