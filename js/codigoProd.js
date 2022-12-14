var formulario = document.getElementById("datosProductos");
var tabla = document.getElementById("datosTabla");

function crearTabla(){
    var urlReqList = "http://digitapp.servicombasculas.com.mx/productos/reqLista.php";

    fetch(urlReqList)
    .then(res => res.json())
    .then(data => {
    
        //console.log(data);
        let str = "";
           
        data.map(item =>{
            str += ` 
            <tr>
            <td>${item.ID}</td>
            <td>${item.Nombre}</td>
            <td>${item.Descripcion}</td>
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
    var urlRegistros = "http://digitapp.servicombasculas.com.mx/productos/registros.php";  
    const datos = new FormData(formulario);
    
    fetch(urlRegistros,{
        method: "POST",
        body: datos
    })
    
    .then(res => res.json())
    .then(data => {

        if(data == "true") {
            console.log(data);
            alert("Producto Agregado correctamente ¡¡");
            crearTabla();
            formulario.reset();

        }                   
        if(data == "mod"){
            console.log(data);
            crearTabla();
            alert("Producto Actualizado correctamente");
            formulario.reset();
            formReset();
        }
        if(data == "false"){
            formulario.reset();
            console.log(data);
            alert("Agregue un producto");
        }
        formulario.reset();

    });

});


function eliminarReg(ID){
    var urlElimReg = "http://digitapp.servicombasculas.com.mx/productos/elimReg.php";
    let confirmado = confirm("Eliminar Producto?");

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
    var urlEditarReg = "http://digitapp.servicombasculas.com.mx/productos/editarReg.php";
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