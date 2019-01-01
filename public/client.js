var form = document.querySelector('form')
var input = document.getElementById('todo')
var val = document.getElementById('values')
var todos = document.querySelector('.todos')
var body = document.getElementsByTagName("body")

var apiUrl = 'http://localhost:8000/names'

addEventListener('DOMContentLoaded', get_data, false)


form.addEventListener("submit", create)


function create(event){

   event.preventDefault()

    fetch(apiUrl,{
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
        //'Access-Control-Allow-Origin': 'http://localhost:8000/names'
        //'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({
        text: input.value ,
        values: val.value
      })
    })
    .then(response => {
      //console.log(response)

      if (response.ok) return response.json()
     })
     .then(data => {
        console.log(data)
        //get_data() 
      })
      .catch( ()=>{ console.error() } )
       
      location.reload()

      }
  
  function get_data(){

      fetch(apiUrl).then(function(response){
      response.json().then(render)
      })
    }

  function render(todo){
    todo.forEach( element => {
    var l = document.createElement("li")  
    var inht ='<button type="button"> edit   </button>'
    var inht1 ='<button type="button"> delete  </button>'       
    l.innerHTML = element.text + "         \t\t\t\t" + element.values + inht  + "        " +inht1 
    todos.appendChild(l)
    } )
  }
  