const person = {
    personName: 'Don',
    age: 333,
    isCool: true,
    sayHy: function(user) {
        console.log(this)
        console.log(`HY ${user}! Ya ${this.personName}!!`)
    }
};

// console.log(person)
person.sayHy('Goga')
console.log('----------------------------------------------')
for (const key in person) {
    if (Object.hasOwnProperty.call(person, key)) {
        const element = person[key];
        console.log(element);
    }
}
console.log('----------------------------------------------')
