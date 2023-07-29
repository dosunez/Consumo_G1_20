var UrlApiGetAll = 'http://localhost:5001/estudiante/getAll';
var UrlApiPostOne = 'http://localhost:5001/estudiante/postOne/:numero_alumno';
var UrlApiInsert = 'http://localhost:5001/estudiante/insertar';
var UrlApiActualizar = 'http://localhost:5001/estudiante/actualizar';
var UrlApiEliminar = 'http://localhost:5001/estudiante/eliminar';


$(document).ready(function(){
    CargarEstudiantes();
});

function CargarEstudiantes(){
   $.ajax({
    url: UrlApiGetAll,
    type: 'GET',
    datatype: 'JSON',
    success: function(response){
        var MisItems= response;
        var Valores = '';

        for(i=0; i < MisItems.length; i++)
        {
            Valores +=
            '<tr>'+
                  '<td>' + MisItems[i].numero_alumno + '</td>' +
                  '<td>' + MisItems[i].nombre + '</td>' +
                  '<td>' + MisItems[i].apellidos + '</td>' +
                  '<td>' + MisItems[i].fecha_nacimiento + '</td>' +
                  '<td>' + MisItems[i].direccion + '</td>' +
                  '<td>' + MisItems[i].altura + '</td>' +
                  '<td>' + MisItems[i].carrera + '</td>' +
                  ' <td> ' +
                       '<button id="btneditar" class="btn btn-primary" onclick="CargarEstudiante('+ MisItems[i].numero_alumno +')">Editar</button>'+
                       '<button id="btneliminar" class="btn btn-danger" onclick="EliminarEstudiante('+ MisItems[i].numero_alumno +')">Eliminar</button>'+
  
                        
                  ' </td> ' +

            '</tr>';
            $('#DatosEstudiantes').html(Valores);
        }

    }

   });
} 


function CargarEstudiante(p_num_alumno){
 var datosestudiante = {

    numero_alumno : p_num_alumno

 };

  var datosestudiantejson = JSON.stringify(datosestudiante);

  $.ajax({
    url: UrlApiPostOne,
    type: 'POST',
    data :datosestudiantejson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function(response){
        var MisItems = response;
        for(i=0; i < MisItems.length; i++){

             $('#numalumno').val(MisItems[i].numero_alumno);
             $('#nombre').val(MisItems[i].nombre);
             $('#apellido').val(MisItems[i].apellidos);
             $('#fechanacimiento').val(MisItems[i].fecha_nacimiento);
             $('#direccion').val(MisItems[i].direccion);
             $('#altura').val(MisItems[i].altura);
             $('#carrera').val(MisItems[i].carrera);

             var btnactualizar = '<input type="button"  class="btn btn-primary"' +
             'id="btnagregar" onclick="ActualizarEstudiante('+ MisItems[i].numero_alumno +')" value="Actualizar Estudiante">';
             $('#btnagregarestudiante').html(btnactualizar);
        }
    }

});

}


function AgregarEstudiante(){

var datosestudiante =  {
    numero_alumno: $('#numalumno').val(),
    nombre: $('#nombre').val(),
    apellidos:  $('#apellido').val(),
    fecha_nacimiento: $('#fechanacimiento').val(),
    direccion:  $('#direccion').val(), 
    altura :  $('#altura').val(),
    carrera: $('#carrera').val()

};

var datosestudiantejson = JSON.stringify(datosestudiante);

//alert(datosestudiantejson);


$.ajax({
    url: UrlApiInsert,
    type: 'POST',
    data : datosestudiantejson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function(response){
        alert('Estudiante ingresado Correctamente');
        $('#Miformulario').submit();      
    },
    error : function(textError, errorThrown){
       alert('Error:' + textError + errorThrown);
    }

    });

}


function ActualizarEstudiante(p_num_alumno){
    var datosestudiante =  {
        numero_alumno : p_num_alumno,

        numero_alumno: $('#numalumno').val(),
        nombre: $('#nombre').val(),
        apellidos:  $('#apellido').val(),
        fecha_nacimiento: $('#fechanacimiento').val(),
        direccion:  $('#direccion').val(), 
        altura :  $('#altura').val(),
        carrera: $('#carrera').val()
    
    };

    var datosestudiantejson = JSON.stringify(datosestudiante);

    //alert(datosestudiantejson);
    
    
    $.ajax({
       
    url: UrlApiActualizar,
    type: 'PUT',
    data : datosestudiantejson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function(response){
        
        alert('Estudiante Actualizado Correctamente'); 
        $('#Miformulario').submit(); 
        },

        error : function(textError, errorThrown){
            alert('Error:' + textError + errorThrown);
         
        }
    });
    
}


function EliminarEstudiante(p_num_alumno){

    var datosestudiante =  {
    numero_alumno : p_num_alumno

    };
    var datosestudiantejson = JSON.stringify(datosestudiante);
    
    $.ajax({
        url : UrlApiEliminar,
        type : 'DELETE',
        data : datosestudiantejson,
        datatype : 'JSON',
        contentType : 'application/json',
        success : function(response){        
        },
        error : function(tetxError, errorThrown){
            alert('Error '+tetxError+ errorThrown)
        }
    });
    alert('Estudiante Eliminado de Forma Correcta'); 
    CargarEstudiantes();

}

