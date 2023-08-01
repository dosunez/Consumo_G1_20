var UrlApiGetAll = 'http://localhost:5001/Asignatura/getAll';
var UrlApiPostOne = 'http://localhost:5001/Asignatura/postOne/:codigo_Asignatura';
var UrlApiInsert = 'http://localhost:5001/Asignatura/insertar';
var UrlApiActualizar = 'http://localhost:5001/Asignatura/actualizar';
var UrlApiEliminar = 'http://localhost:5001/Asignatura/eliminar';


$(document).ready(function(){
    CargarAsignatura();
});

function CargarAsignatura(){
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
                  '<td>' + MisItems[i].codigo_asignatura + '</td>' +
                  '<td>' + MisItems[i].nombre_asignatura + '</td>' +
                  '<td>' + MisItems[i].carrera + '</td>' +
                  '<td>' + MisItems[i].fecha_creacion + '</td>' +
                  '<td>' + MisItems[i].unidades_valorativas + '</td>' +
                  '<td>' + MisItems[i].promedio_aprobacion + '</td>' +
                  '<td>' + MisItems[i].numero_edificio + '</td>' +
                  ' <td> ' +
                       '<button id="btneditar" class="btn btn-primary" onclick="CargarAsignatura('+ MisItems[i].codigo_asignatura +')">Editar</button>'+
                       '<button id="btneliminar" class="btn btn-danger" onclick="EliminarAsignatura('+ MisItems[i].codigo_asignatura +')">Eliminar</button>'+
  
                        
                  ' </td> ' +

            '</tr>';
            $('#DatosAsignatura').html(Valores);
        }

    }

   });
} 


function CargarAsignatura(p_cod_asignatura){
 var datosestudiante = {

    numero_alumno : p_cod_asignatura

 };

  var datosasignaturajson = JSON.stringify(datosasignatura);

  $.ajax({
    url: UrlApiPostOne,
    type: 'POST',
    data :datosasignaturajson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function(response){
        var MisItems = response;
        for(i=0; i < MisItems.length; i++){

             $('#codigoasignatura').val(MisItems[i].codigo_asignatura);
             $('#nombreasignatura').val(MisItems[i].nombre_asignatura);
             $('#carrera').val(MisItems[i].carrera);
             $('#fechacreacion').val(MisItems[i].fecha_creacion);
             $('#unidadesvalorativas').val(MisItems[i].unidades_valorativas);
             $('#promedioaprobacion').val(MisItems[i].promedio_aprobacion);
             $('#numeroedificio').val(MisItems[i].numero_edificio);

             var btnactualizar = '<input type="button"  class="btn btn-primary"' +
             'id="btnagregar" onclick="ActualizarEstudiante('+ MisItems[i].codigo_asignatura +')" value="Actualizar Asignatura">';
             $('#btnagregarasignatura').html(btnactualizar);
        }
    }

});

}


function AgregarAsignatura(){

var datosestudiante =  {
    codigo_asignatura: $('#codigoasignatura').val(),
    nombre_asignatura: $('#nombreasignatura').val(),
    carrera:  $('#carrera').val(),
    fecha_creacion: $('#fechacreacion').val(),
    unidades_valorativas:  $('#unidadesvalorativas').val(), 
    promedio_aprobacion :  $('#promedioaprobacion').val(),
    numero_edificio: $('#numeroedificio').val()

};

var datosasignaturajson = JSON.stringify(datosasignatura);

//alert(datosestudiantejson);


$.ajax({
    url: UrlApiInsert,
    type: 'POST',
    data : datosasignaturajson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function(response){
        alert('Asignatura ingresado Correctamente');
        $('#Miformulario').submit();      
    },
    error : function(textError, errorThrown){
       alert('Error:' + textError + errorThrown);
    }

    });

}


function ActualizarAsignatura(p_cod_asignatura){
    var datosasignatura =  {
        codigo_asignatura : p_cod_asignatura,


        codigo_asignatura: $('#codigoasignatura').val(),
        nombre_asignatura: $('#nombreasignatura').val(),
        carrera:  $('#carrera').val(),
        fecha_creacion: $('#fechacreacion').val(),
        unidades_valorativas:  $('#unidadesvalorativas').val(), 
        promedio_aprobacion :  $('#promedioaprobacion').val(),
        numero_edificio: $('#numeroedificio').val()
          
    };

    var datosasignaturajson = JSON.stringify(datosasignatura);

    //alert(datosasignaturajson);
    
    
    $.ajax({
       
    url: UrlApiActualizar,
    type: 'PUT',
    data : datosestudiantejson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function(response){
        
        alert('Asignatura Actualizado Correctamente'); 
        $('#Miformulario').submit(); 
        },

        error : function(textError, errorThrown){
            alert('Error:' + textError + errorThrown);
         
        }
    });
    
}


function EliminarAsignatura(p_cod_asignatura){

    var datosasignatura =  {
    codigo_asignatura : p_cod_asignatura

    };
    var datosasignaturajson = JSON.stringify(datosasignatura);
    
    $.ajax({
        url : UrlApiEliminar,
        type : 'DELETE',
        data : datosasignaturajson,
        datatype : 'JSON',
        contentType : 'application/json',
        success : function(response){        
        },
        error : function(tetxError, errorThrown){
            alert('Error '+tetxError+ errorThrown)
        }
    });
    alert('Asignatura Eliminado de Forma Correcta'); 
    CargarAsignatura();
}
