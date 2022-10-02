var formulario = document.getElementById("datosPersona");
var tabla = document.getElementById("datosTablaPersona");
var select = document.getElementById("selEmpPerosna");

function crearTabla(){
    var urlReqListPers = "http://digitapp.servicombasculas.com.mx/personas/reqListaPers.php";

    fetch(urlReqListPers)
    .then(res => res.json())
    .then(data => {
    
        //console.log(data);
        let str = "";
           
        data.map(item =>{
            str += ` 
            <tr>
            <td>${item.ID}</td>
            <td>${item.Nombre}</td>
            <td>${item.Telefono}</td>
            <td>${item.Correo}</td>
            <td>${item.Departamento}</td>
            <td>${item.Empresa_ID}</td>
            <td><input type="submit" value="editar" onclick=editarReg("${item.ID}")></input></td>
            <td><input type="submit" value="borrar" onclick=eliminarReg("${item.ID}")></input></td>
            </tr>                          
            `                         
        });    
        tabla.innerHTML = str;           
    });
 
}

crearTabla();

function opcionesSelect(){
    
    var urlOpcSelect = "http://digitapp.servicombasculas.com.mx/Empresa/crearOpcSelect.php";

    fetch(urlOpcSelect)
    .then(res => res.json())
    .then(data => {
        let opc = "";
        data.map(item =>{
            opc += `
            <option value="${item.Nombre}">${item.Nombre}</option>
            `
        });
        select.innerHTML = opc;
    });

}
opcionesSelect();

formulario.addEventListener("submit", function(e){ 
    e.preventDefault();
    var urlRegistros = "http://digitapp.servicombasculas.com.mx/personas/registrosPers.php";  
    const datos = new FormData(formulario);
    
    fetch(urlRegistros,{
        method: "POST",
        body: datos
    })
    
    .then(res => res.json())
    .then(data => {

        if(data == "true") {
            console.log(data);
            alert("Contacto Agregado correctamente ¡¡");
            crearTabla();
            formulario.reset();

        }                   
        if(data == "mod"){
            console.log(data);
            crearTabla();
            alert("Datos de contacto Actualizados correctamente");
            formulario.reset();
            formReset();
        }
        if(data == "false"){
            formulario.reset();
            console.log(data);
            alert("Agregue todos los datos");
        }
        formulario.reset();

    });

});


function eliminarReg(ID){
    var urlElimReg = "http://digitapp.servicombasculas.com.mx/personas/elimReg.php";
    let confirmado = confirm("Eliminar Contacto?");

    if(confirmado){

        fetch(urlElimReg,{
            method: "POST",
            body: ID
        })
        .then(res => res.json())
        .then(data => {
            if(data == "true"){
                crearTabla();
                //console.log(data);
            }
        }); 
    };
}

function editarReg(ID){
    var urlEditarReg = "http://digitapp.servicombasculas.com.mx/personas/editarReg.php";
    var btnform = document.getElementById("botonEnviar");
        

    fetch(urlEditarReg,{
        method: "POST",
        body: ID
    })
    .then(res => res.json())
    .then(data => {
         
        idmy.value = data.ID;
        nombPersona.value = data.Nombre;
        telPersona.value = data.Telefono;
        mailPersona.value = data.Correo;
        deptoPersona.value = data.Departamento;
        empPersona.value = data.Empresa_ID;

        btnform.innerHTML = "Actualizar";
        console.log(data);
       
    });

}

function formReset(){
    document.getElementById("idmy").value="";
    document.getElementById("nombPersona").value="";
    document.getElementById("telPersona").value="";
    document.getElementById("mailPersona").value="";
    document.getElementById("deptoPersona").value="";
    document.getElementById("empPersona").value="";
    document.getElementById("botonEnviar").innerHTML="Enviar";

}