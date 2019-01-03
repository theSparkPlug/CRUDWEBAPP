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
        //'Access-Control-Allow-Credentials': 'true'                           ***to access server from html file.
      
      },
      body: JSON.stringify({
        text: input.value ,
        values: val.value
      })
    })
    .then(response => {
      if (response.ok) return response.json()
     })
     .then(data => {
        console.log(data)
      })
      .catch( ()=>{ console.error() } )
       
      location.reload()

      }
  



  function get_data(){

      fetch(apiUrl).then( function(response){
      response.json().then(render)
      })
    }





    function delete_data( node ){
    if(confirm( "Do you want to Delete?" )) 
     { 
      lt=node.parentElement
     
      
      console.log(node)
      console.log(lt)
      console.log(lt.getElementsByTagName("b")[0].innerText )


       fetch( `${apiUrl}?text=${lt.getElementsByTagName("b")[0].innerText}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'text':lt.getElementsByTagName<'b'>[0].innerText  
        })
      }).then(function (response) {
        window.location.reload()
    })
    console.log("data delted successfully")
    }
  }  

 


   function update_data(node)
   {  
      let lt=node.parentElement
     
      fetch(`${apiUrl}?text=${lt.getElementsByTagName("b")[0].innerText}`, {
       method: 'delete',
       headers: {
        'Content-Type': 'application/json'
       },
        body: JSON.stringify({
        'text':lt.getElementsByTagName<'b'>[0].innerText
       })
      }).then(function (response) {
       //window.location.reload()
     })
    
    let innertxt=lt.getElementsByTagName("b")[0].innerText
    let txtarea1 = document.getElementById('todo')
    let txtarea2 = document.getElementById('values')
    console.log(txtarea1)
    txtarea1.value=innertxt 
    txtarea2.focus()

  }



  function render(todo){

    todo.forEach( element => {

    var l = document.createElement("li") 
    l.id='list' 
    var int =5;
    var inht ='<input type="button" class="bt1" value="E" onclick="update_data(this)" >'
    var inht1 ='<input type="button" class="bt2" value="X" onclick="delete_data(this)"  > '       
    l.innerHTML ='<span id="list_div">' + '<b>'+element.text+'</b>'+ ":" + element.values + inht + inht1 +'</span>'
    todos.appendChild(l)

      //Array.from(l.getElementsByClassName('bt1') ).map( v=>{ 
      // v.value="E"; v.onclick= "update_data(v)" ;   }  )

      //  Array.from(l.getElementsByClassName('bt2') ).map( v=>{ 
      //  v.value="X" ; v.onclick=delete_data(v)  } )
     
    } )

  }





  //Mistake:- // var v=l.getElementsByClassName('bt1')[0].onclick=delete_data  => its a collection so foreach doesnt work so use [i] or array.from or [...]
