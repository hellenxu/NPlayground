function Person(first, last, age, nationality) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.nationality = nationality;
}

const man = new Person("Mani", "Scott", 33, "English");
const woman = new Person("Lily", "Scott", 30, "Japanese");
console.log(`${man.firstName} is ${man.age} years old.`);
console.log(`${woman.firstName} is ${woman.age} years old.`);

// add a new property
Person.name = `${Person.firstName} ${Person.lastName}`;
console.log(`man's name is ${man.name}`);
/*
* result:
* Mani is 33 years old.
* Lily is 30 years old.
* man's name is undefined
* */

Person.prototype.name = function() {
  return this.firstName + " " + this.lastName;
};
const girl = new Person("sally", "Scott", 10, "English");
console.log(`man's name is ${man.name()}`);
console.log(`woman's name is ${woman.name}`);
console.log(`girl's name is ${girl.name()}`);