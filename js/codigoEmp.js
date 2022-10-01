var formulario = document.getElementById("datosEmpresa");
var tabla = document.getElementById("datosTablaEmp");

function crearTabla(){
    var urlReqListEmp = "http://digitapp.servicombasculas.com.mx/Empresa/reqListaEmp.php";

    fetch(urlReqListEmp)
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
            <td>${item.Direccion}</td>
            <td>${item.Ciudad}</td>
            <td>${item.Estado}</td>
            <td><input type="submit" value="editar" onclick=editarReg("${item.ID}")></input></td>
            <td><input type="submit" value="borrar" onclick=eliminarReg("${item.ID}")></input></td>
            </tr>                          
            `                         
        });    
        tabla.innerHTML = str;           
    });
 
}

crearTabla();


formulario.addEventListener("submit", function(e){ 
    e.preventDefault();
    var urlRegistros = "http://digitapp.servicombasculas.com.mx/Empresa/registrosEmp.php";  
    const datos = new FormData(formulario);
    
    fetch(urlRegistros,{
        method: "POST",
        body: datos
    })
    
    .then(res => res.json())
    .then(data => {

        if(data == "true") {
            console.log(data);
            alert("Empresa Agregada correctamente ¡¡");
            crearTabla();
            formulario.reset();

        }                   
        if(data == "mod"){
            console.log(data);
            crearTabla();
            alert("Datos de Empresa Actualizados correctamente");
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
    var urlElimReg = "http://digitapp.servicombasculas.com.mx/Empresa/elimReg.php";
    let confirmado = confirm("Eliminar Empresa?");

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
    var urlEditarReg = "http://localhost/Servicom/productos/editarReg.php";
    var btnform = document.getElementById("botonEnviar");
        

    fetch(urlEditarReg,{
        method: "POST",
        body: ID
    })
    .then(res => res.json())
    .then(data => {
         
        idmy.value = data.ID;
        Prod.value = data.Nombre;
        descr.value = data.Descripcion;
        btnform.innerHTML = "Actualizar";
        console.log(data);
       
    });

}

function formReset(){
    document.getElementById("idmy").value="";
    document.getElementById("Prod").value="";
    document.getElementById("descr").value="";
    document.getElementById("botonEnviar").innerHTML="Enviar";

}