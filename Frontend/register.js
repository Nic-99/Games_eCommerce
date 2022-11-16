const labelpass = document.getElementById('lblpass')
const form = document.getElementById('myform')


//const marco = document.querySelector('.embed-responsive')

document.addEventListener('DOMContentLoaded', e => { 
    
  
    
});

form.addEventListener('click',  e => { 
    if (e.target.classList.contains('btnRegister')){
//ejecuto fecth solo si ambos campos están completos
       if(document.getElementById('email').value !="" &&  
       document.getElementById('name').value !="" &&
       document.getElementById('lastname').value !="" &&
       document.getElementById('pass').value !=""
       )

       {
        let email = document.getElementById('email').value 
        let name = document.getElementById('name').value
        let lastname= document.getElementById('lastname').value
        let pass = document.getElementById('pass').value
        
        //console.log(usr.textContent , pass.textContent)
//       Test para saber si entra al if y pinta algo en el DOM
//       labelpass.textContent = "va el fetch"
            
      fetch("http://localhost:5000/users", 
            {   method:'POST',
                headers: {
            'Accept': 'Application/json',
            'Content-type':'Application/json'
            },
            
                body: JSON.stringify({
                                email:email,
                                name:name,
                                lastname:lastname,
                                isActive:true,
                                roles:'user',
                                password:pass

                         })
            })
            .then(response =>{ response.json()
                alert("Usuario creado correctamente")
                window.open('login.html')
                this.close()
            })
            .then(data =>{
                console.log(data);
            }).catch( err =>{
                console.log("Error al crear usuario", err)
                alert("Error al crear el usuario " + err)
            });
        }
        else
        {
            alert("Complete los datos")
        }
       // e.stopImmediatePropagation;

        

    //    open("default.html")
    }

} 
    //e.stopImmediatePropagation;
    
 
);
