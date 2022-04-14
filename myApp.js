const { default: mongoose } = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = async (done) => {
  const person = new Person({ name: 'Name', age: 13, favoriteFoods:['chocolate', 'roast chicken'] });
  person.save((err, data)=> {
    if (err) {
      return done(err);
    }
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      return data(err);
    }
    done(null, data);
  })
  
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      return data(err);
    }
    done(null, data);
  })
};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";
  let doc = await Person.findById(personId).exec();
  let foods = doc.get('favoriteFoods');
  foods.push(foodToAdd);
  doc.save((err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove( {name: nameToRemove}, (err, res) => {
    if (err) {
      return done(err)
    }
    res.ok = true;
    res.n = res.deletedCount;
    done(null, res);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }).sort({ name: 'asc' }).limit(2).select({ age: 0 }).exec((err, data) => {
    console.log(data);
    if (err) {
      return done(err);
    }
    return done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
