class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(value) {
    const tokens = value.split(" ");
    this.firstName = tokens[0];
    this.lastName = tokens[1];
  }
}

Person.prototype.species = "Human";

Person.prototype.toSpeciesString = function () {
  return `I am a ${this.species}. ${this.toString()}`;
};

let newP = new Person("Maria", "maria@gmail.com");
newP.toSpeciesString();
