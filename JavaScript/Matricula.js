var UrlApiGetAll = 'http://localhost:5001/matricula/getall';
var UrlApiPostOne = 'http://localhost:5001/matricula/getone/:codigo_matricula';
var UrlApiInsert = 'http://localhost:5001/matricula/insertar/:codigo_matricula';
var UrlApiActualizar = 'http://localhost:5001/matricula/actualizar/:codigo_matricula';
var UrlApiEliminar = 'http://localhost:5001/matricula/eliminar/:codigo_matricula';


$(document).ready(function(){
    CargarMatriculas();
});

function CargarMatriculas(){
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
                  '<td>' + MisItems[i].codigo_matricula + '</td>' +
                  '<td>' + MisItems[i].nombre_asignatura + '</td>' +
                  '<td>' + MisItems[i].numero_alumno + '</td>' +
                  '<td>' + MisItems[i].fecha_matricula + '</td>' +
                  '<td>' + MisItems[i].numero_docente + '</td>' +
                  '<td>' + MisItems[i].carrera + '</td>' +
                  '<td>' + MisItems[i].numero_edificio + '</td>' +
                  ' <td> ' +
                       '<button id="btneditar" class="btn btn-warning" onclick="CargarMatricula('+ MisItems[i].codigo_matricula +')">Editar</button>'+
                       '<button id="btneliminar" class="btn btn-danger" onclick="EliminarMatricula('+ MisItems[i].codigo_matricula +')">Eliminar</button>'+
  
                        
                  ' </td> ' +

            '</tr>';
            $('#DatosMatriculas').html(Valores);
        }

    }

   });
} 


function CargarMatricula(p_codigo_matricula){
 var datosmatricula = {

    codigo_matricula : p_codigo_matricula

 };

  var datosmatriculajson = JSON.stringify(datosmatricula);

  $.ajax({
    url: UrlApiPostOne,
    type: 'POST',
    data :datosmatriculajson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function(response){
        var MisItems = response;
        for(i=0; i < MisItems.length; i++){

             $('#codmatricula').val(MisItems[i].codigo_matricula);
             $('#nomasignatura').val(MisItems[i].nombre_asignatura);
             $('#numalumno').val(MisItems[i].numero_alumno);
             $('#fechamatricula').val(MisItems[i].fecha_matricula);
             $('#numdocente').val(MisItems[i].numero_docente);
             $('#carrera').val(MisItems[i].carrera);
             $('#numedificio').val(MisItems[i].numero_edificio);

             var btnactualizar = '<input type="button"  class="btn btn-success"' +
             'id="btnagregar" onclick="ActualizarMatricula('+ MisItems[i].codigo_matricula +')" value="Actualizar Matricula">';
             $('#btnagregarmatricula').html(btnactualizar);
        }
    }

});

}


function AgregarMatricula(){

var datosmatricula =  {
    codigo_matricula: $('#codmatricula').val(),
    nombre_asignatura: $('#nomasignatura').val(),
    numero_alumno:  $('#numalumno').val(),
    fecha_matricula: $('#fechamatricula').val(),
    numero_docente:  $('#numdocente').val(), 
    carrera :  $('#carrera').val(),
    numero_edificio: $('#numedificio').val()

};

var datosmatriculajson = JSON.stringify(datosmatricula);

//*******************************alerta(datosmatriculajson);**************************


$.ajax({
    url: UrlApiInsert,
    type: 'POST',
    data : datosmatriculajson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function(response){
        alert('EMatricula ingresada de forma correcta');
        $('#Miformulario').submit();      
    },
    error : function(textError, errorThrown){
       alert('Error:' + textError + errorThrown);
    }

    });

}


function ActualizarMatricula(p_codigo_matricula){
    var datosmatricula =  {
        codigo_matricula : p_codigo_matricula,

        codigo_matricula: $('#codmatricula').val(),
        nombre_asignatura: $('#nomasignatura').val(),
        numero_alumno:  $('#numalumno').val(),
        fecha_matricula: $('#fechamatricula').val(),
        numero_docente:  $('#numdocente').val(), 
        carrera :  $('#carrera').val(),
        numero_edificio: $('#numedificio').val()
    
    };

    var datosmatriculajson = JSON.stringify(datosmatricula);

    //**********************alerta(datosestudiantejson);***************************
    
    
    $.ajax({
       
    url: UrlApiActualizar,
    type: 'PUT',
    data : datosmatriculajson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function(response){
        
        alert('Matricula actualizada de forma correcta'); 
        $('#Miformulario').submit(); 
        },

        error : function(textError, errorThrown){
            alert('Error:' + textError + errorThrown);
         
        }
    });
    
}


function EliminarMatricula(p_codigo_matricula){

    var datosmatricula =  {
    codigo_matricula : p_codigo_matricula

    };
    var datosmatriculajson = JSON.stringify(datosmatricula);
    
    $.ajax({
        url : UrlApiEliminar,
        type : 'DELETE',
        data : datosmatriculajson,
        datatype : 'JSON',
        contentType : 'application/json',
        success : function(response){        
        },
        error : function(tetxError, errorThrown){
            alert('Error '+tetxError+ errorThrown)
        }
    });
    alert('Matricula eliminada de forma correcta'); 
    CargarMatriculas();

}