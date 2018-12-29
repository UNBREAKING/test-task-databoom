function Person(person) {
  this.id = person.id;
  this.firstname = person.firstname;
  this.lastname = person.lastname;
  this.age = person.age;
  //this.likes = person.likes.map(book => new Book(book));
  //for (let book in person.likes){ -- //badPractice
  //    this.likes.push(new Book(person.likes[book]));
  //}
}

export default Person
