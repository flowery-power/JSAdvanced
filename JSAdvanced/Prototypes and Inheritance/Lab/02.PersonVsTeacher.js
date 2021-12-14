function Person(firstName, lastName){
    this.firstName = firstName
    this.lastName = lastName

    Object.defineProperty(this, "fullName", {
        enumerable: true,
        get: function(){
            return  `${this.firstName} ${this.lastName}`
        },
        set: function(value){
            const tokens = value.split(" ")
            this.firstName = tokens[0]
            this.lastName = tokens[1]
        }
    })
}

const myPerson = new Person("May", "Sure")
console.log(myPerson.fullName)
 
myPerson.lastName = "Jackson"

console.log(myPerson.fullName)

myPerson.fullName = "May Sure"

console.log(myPerson.firstName)
console.log(myPerson.lastName)
