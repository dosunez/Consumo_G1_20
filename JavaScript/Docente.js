var UrlApiGetAll = 'http://localhost:5001/docente/getAll';
var UrlApiPostOne = 'http://localhost:5001/docente/postOne/:numero_docente';
var UrlApiInsert = 'http://localhost:5001/docente/insertar';
var UrlApiActualizar = 'http://localhost:5001/docente/actualizar';
var UrlApiEliminar = 'http://localhost:5001/docente/eliminar';


$(document).ready(function(){
    CargarDocentes();
});

function CargarDocentes(){
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
                  '<td>' + MisItems[i].numero_docente + '</td>' +
                  '<td>' + MisItems[i].nombre + '</td>' +
                  '<td>' + MisItems[i].apellido + '</td>' +
                  '<td>' + MisItems[i].fecha_contratacion + '</td>' +
                  '<td>' + MisItems[i].direccion + '</td>' +
                  '<td>' + MisItems[i].salario + '</td>' +
                  '<td>' + MisItems[i].profesion + '</td>' +
                  ' <td> ' +
                       '<button id="btneditar" class="btn btn-primary" onclick="CargarDocente('+ MisItems[i].numero_docente +')">Editar</button>'+
                       '<button id="btneliminar" class="btn btn-danger" onclick="EliminarDocente('+ MisItems[i].numero_docente +')">Eliminar</button>'+
                  ' </td> ' +
            '</tr>';
            $('#DatosDocente').html(Valores);
        }

    }

   });
} 

function CargarDocente(p_num_docente){
    var datosdocente = {
   
       numero_docente : p_num_docente
   
    };
   
     var datosdocentejson = JSON.stringify(datosdocente);
   
     $.ajax({
       url: UrlApiPostOne,
       type: 'POST',
       data :datosdocentejson,
       datatype: 'JSON',
       contentType: 'application/json',
       success: function(response){
           var MisItems = response;
           for(i=0; i < MisItems.length; i++){
   
                $('#numdocente').val(MisItems[i].numero_docente);
                $('#nombre').val(MisItems[i].nombre);
                $('#apellido').val(MisItems[i].apellido);
                $('#fechacontratacion').val(MisItems[i].fecha_contratacion);
                $('#direccion').val(MisItems[i].direccion);
                $('#salario').val(MisItems[i].salario);
                $('#profesion').val(MisItems[i].profesion);
   
                var btnactualizar = '<input type="button"  class="btn btn-primary"' +
                'id="btnagregar" onclick="ActualizarDocente('+ MisItems[i].numero_docente +')" value="Actualizar Docente" >';
                $('#btnagregardocente').html(btnactualizar);
           }
       }
   
   });
   
   }
   
   
function AgregarDocente(){
   
var datosdocente =  {
    numero_docente: $('#numdocente').val(),
    nombre: $('#nombre').val(),
    apellido:  $('#apellido').val(),
    fecha_contratacion: $('#fechacontratacion').val(),
    direccion:  $('#direccion').val(), 
    salario :  $('#salario').val(),
    profesion: $('#profesion').val()

 };

var datosdocentejson = JSON.stringify(datosdocente);

//alert(datosdocentejson);

$.ajax({
    url: UrlApiInsert,
    type: 'POST',
    data : datosdocentejson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function(response){
        alert('Docente ingresado Correctamente');
        $('#Miformulario').submit();      
    },
    error : function(textError, errorThrown){
        alert('Error:' + textError + errorThrown);
    }

    });

}


function ActualizarDocente(p_num_docente){
    var datosdocente =  {
        numero_docente : p_num_docente,

        numero_docente: $('#numdocente').val(),
        nombre: $('#nombre').val(),
        apellido:  $('#apellido').val(),
        fecha_contratacion: $('#fechacontratacion').val(),
        direccion:  $('#direccion').val(), 
        salario :  $('#salario').val(),
        profesion: $('#profesion').val()
    
    };

    var datosdocentejson = JSON.stringify(datosdocente);

     //alert(datosdocentejson);
    
    $.ajax({
       
    url: UrlApiActualizar,
    type: 'PUT',
    data : datosdocentejson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function(response){
        
        alert('Docente Actualizado Correctamente'); 
        $('#Miformulario').submit(); 
        },

        error : function(textError, errorThrown){
            alert('Error:' + textError + errorThrown);
         
        }
    });
    
}


function EliminarDocente(p_num_docente){

    var datosdocente =  {
    numero_docente : p_num_docente

    };
    var datosdocentejson = JSON.stringify(datosdocente);
    
    $.ajax({
        url : UrlApiEliminar,
        type : 'DELETE',
        data : datosdocentejson,
        datatype : 'JSON',
        contentType : 'application/json',
        success : function(response){        
        },
        error : function(tetxError, errorThrown){
            alert('Error '+tetxError+ errorThrown)
        }
    });
    alert('Docente Eliminado de Forma Correcta'); 
    CargarDocentes();
    
}
