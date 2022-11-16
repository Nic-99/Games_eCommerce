const labelpass = document.getElementById('lblpass')
const ingresar = document.getElementById('contenedor')
const marco = document.getElementById('juegos')  
//const marco = document.querySelector('.embed-responsive')

document.addEventListener('DOMContentLoaded', e => { 
    
  
    
});

ingresar.addEventListener('click',  e => { 
    if (e.target.classList.contains('btnLogin')){
//ejecuto fecth solo si ambos campos están completos
       if(document.getElementById('usr').value !="" &&  document.getElementById('pass').value !="" )
       {
        let usr = document.getElementById('usr').value 
        let pass = document.getElementById('pass').value
        console.log(usr.textContent , pass.textContent)
//       Test para saber si entra al if y pinta algo en el DOM
//       labelpass.textContent = "va el fetch"
            
      fetch("http://localhost:5000/login", 
            {   method:'POST',
                headers: {
            'Accept': 'Application/json',
            'Content-type':'Application/json'
            },
            
                body: JSON.stringify({
                                email:usr,
                                password:pass
                         })
            })
            .then(response => response.json())
            .then(data =>{
                sessionStorage.setItem("token", data.token)
                sessionStorage.setItem("userid", data.id)
                localStorage.setItem("token", data.token)
                localStorage.setItem("userid", data.id)
// se validó correctamente 
                alert("Bienvenido " +  usr)
// Busco si tiene productos guardados en algun carro
fetch("http://localhost:5000/catalogo/cart/" + sessionStorage.getItem("userid"), 
{   method:'GET',
    headers: {
'Accept': 'Application/json',
'Content-type':'Application/json'
},

/*    body: JSON.stringify({
                    email:usr,
                    password:pass
             })*/
})
.then(response => response.json())
.then(data =>{   
    sessionStorage.setItem("carroguardado",data)          
}).catch( error =>{
    console.log("Fallo al traer carro", error)
})


                marco.src = "cart.html"
                marco.width="100%" 
                marco.height="650"
                marco.scrollable="no"
                marco.append

                console.log(data);
            }).catch( err =>{
                alert("Error al iniciar sesión" +  err)
                console.log("Petición Fallida", err)});
        }
        else
        {alert("Complete los campos" )}
        
    }


  
    }
    
    )
    
;

