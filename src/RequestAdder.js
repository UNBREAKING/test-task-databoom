import axios from 'axios'
import Person from './Person'
import { toForm, toGrid } from './htmlCreators'

function RequestAdder() {
  this.div = null;
  this.persons = [];
}

RequestAdder.prototype.setFilter = function () {
    let id = document.getElementById("id").value;
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let age = document.getElementById("age").value;

    let filter = "";
    if (id !== ""){
        filter += `id eq \'${id}\'`;
    }
    if (fname !== ""){
        if (filter !== "")
            filter += " and ";
        filter += `firstname eq \'${fname}\'`
    }
    if (lname !== ""){
        if (filter !== "")
            filter += " and ";
        filter += `lastname eq '${lname}'`
    }
    if (age !== ""){
        if (filter !== "")
            filter += " and ";
        filter += `age eq ${age}`;
    }

    return filter;

}

RequestAdder.prototype.displayData = function(personList){
  if (personList !== undefined){
    document.getElementById("container").innerHTML = "";
    if (personList.length === 1)
      document.getElementById("container").appendChild(toForm(personList[0]));
    else
      document.getElementById("container").appendChild(toGrid(personList));
  }
}

RequestAdder.prototype.useGetRequest = function() {

  const RequestInstance = new RequestAdder();
  const filter = RequestInstance.setFilter();

  return axios({
    method:'get',
    url:'http://samples.databoom.space/api1/sampledb/collections/allobjects',
    params: { "$format": "json", "$filter": filter, "$expand": "likes,likes/publisher" }
  })
  .then(({ data: { d: { results = [] } = {} } = {} }) => {
    this.persons = results.map( item => new Person(item));
    RequestInstance.displayData(this.persons)
  });

}

RequestAdder.prototype.setComponent = function() {
  let element = document.createElement('div');
  element.innerHTML = "works";

  this.div = element;
}

RequestAdder.prototype.getComponent = function() {
  return this.div
}

export default RequestAdder