require("dotenv").config()

const mongoose = require('mongoose')
const password = process.argv[2]
const url = process.env.MONGODB_URI
console.log(url)
// `mongodb+srv://cardwe11:aOYZt4qSzpAln1Ql@cluster0.w1xoa.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery',false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)


if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

else if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

else if (process.argv.length<5) {
  console.log('name and number required')
  process.exit(1)
}

else {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}



// mongodb+srv://cardwe11:aOYZt4qSzpAln1Ql@cluster0.w1xoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
