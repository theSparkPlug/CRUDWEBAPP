const uri = 'http://localhost:8000/names';
let octopus = {};






let view = {
  
  
  //data is an array of person's info.
  init: function(persons){
    this.info_list = document.querySelector('#info_list');
    this.render(persons);
  },

  
  
  getElement: function(elementName, elementVal){
    let elem = document.createElement('p');
    let str = document.createElement('strong');
    str.appendChild(document.createTextNode(`${elementName} : `));
    elem.appendChild(str);
    elem.appendChild(document.createTextNode(elementVal));
    return elem;
  },

  
  
  addPerson: function(person){
    let newDiv = document.createElement('div');
    newDiv.id = person['email'];    //assuming that email is unique for each user. Used at the time of erasing fastly.

    for(let key in person)
      if(key !== '_id') newDiv.appendChild(this.getElement(key, person[key]));

    let deleteNode = document.createElement("p");
    deleteNode.appendChild(document.createTextNode('Delete'));

    deleteNode.onclick = function(){
      if(confirm(`Want to delete ${person.name} from the list?`)){
        octopus.removePerson(person);
      }
    };

    newDiv.appendChild(deleteNode);

    //adding styles
    newDiv.className = "person";

    this.info_list.appendChild(newDiv);
  },



  render: function(persons){
    const list = this.info_list;
    for(let i in persons){
      this.addPerson(persons[i]);
    }
  },



  removePerson: function(person){
    let cur = document.querySelector(`#${person['email']}`);
    this.info_list.removeChild(cur);
  }
};








let model = {
  removePerson: function(person){
    const url = `${uri}?name=${person['name']}`;
    return fetch(url, {
      method: 'DELETE'
    });
  },

  addPerson: function(person){
    return fetch(uri, {
      method: 'POST',
      body: JSON.stringify(person),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(`added ${person['email']} to database`);
        return 1;
      })
      .catch(error => {
        console.log(error);
        alert('error adding the details. please try again later!');
        return 0;
      });
  },

  getAll: () => {
    return fetch(uri).then(response => {
      //console.log(response);
      return response.json();
    });
  }
};






 octopus = {
  flagForDeleteListener: 0,

  inputField: document.querySelector('.inputField'),
  form: document.querySelector('#takeInput'),

  init: function(){

    //console.log(this.form);
    let promise = model.getAll();
    promise.then(persons => {
      //console.log(persons);
      view.init(persons);
    })
    .catch(err => {
      console.log(`error in the inital fetch promise: ${err}`);
    });

    //setting neccessary dom pointers

    // hide the form initially
    this.inputField.style.visibility = "hidden";

    //showing the form
    const addButton = document.querySelector(".create");
    addButton.addEventListener('click', () => {
      this.inputField.style.visibility = "visible";
    });

    document.querySelector('#cancel').addEventListener('click', () => {
      this.form.reset();
      this.inputField.style.visibility = "hidden";
    });

    document.querySelector('#done').addEventListener('click', this.addPerson.bind(this));

  },

  check: function(person){
    if(person.name === '') {
      alert("name field can't be empty!");
      return 0;
    }
    if(person.email === ''){
      alert("email can't be empty!");
      return 0;
    }
    if(person.contact.length !== 10){
      alert("please provide a valid phone number");
      return 0;
    }
    return 1;
  },

  addPerson: function(){
    /*console.log(this);
    console.log(this.form);
    console.log(this.form.name_);*/


    let person = {};
    person.name = this.form.name_.value;
    person.email = this.form.email.value;
    person.contact = this.form.contact.value;

    if(!this.check(person)) return;

    if(!model.addPerson(person)) return;

    view.addPerson(person);
    this.form.reset();
    this.inputField.style.visibility = "hidden";
  },

  removePerson: function(person){
    //if(!model.removePerson(person)) return;
    model.removePerson(person)
      .then(() => {
        view.removePerson(person);
      })
      .catch((err) => {
        console.log(`error in fetch request for delete : ${err}`);
        alert(`${person.name} not deleted! Try again!`);
      });
  }

};



octopus.init();
