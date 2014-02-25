$(document).ready(function(){
                                
        var consulta;
                                                                          
        $("#search").keyup(function(e){
                                     
              consulta = $("#search").val();
                                
                                         
              $.ajax({
                    type: "get",
                    url: "/employee/search/"+encodeURIComponent(consulta),
                    dataType: "json",
                    beforeSend: function(){
                          //imagen de carga
                          //$("#resultado").html("<p align='center'><img src='ajax-loader.gif' /></p>");
                    },
                    failure: function(data){
                        console.log(data);
                    },
                    success: function(data){                                                    
                          $("#resultado").empty();
                         
                          console.log(data);
                          var encontrados ="";
                          if (data.length > 0) {
                            $.each(data, function(i,v){
                              console.log(i,v);
                              encontrados += '<li><h2>'+v["nombre"]+'</h2><a href="mailto:'+v['email']+'">'+v["email"]+'</a></li>';
                            });
                          };
                          
                          $('#resultado').html(encontrados);
                    }
              });
                                                                                                                                     
        });
    var validator = new FormValidator('example_form', [{
        name: 'name',
        display: 'nombre',    
        rules: 'required'
      },{
        name: 'lastname',
        display: 'apellido',    
        rules: 'required'
      },{
      name: 'password',
      rules: 'required'
      }, {
          name: 'confirm',
          display: 'password confirmation',
          rules: 'required|matches[password]'
      }, {
          name: 'email',
          rules: 'valid_email'
      }], function(errors) {
      var SELECTOR_ERRORS = $('.error_box'),
        SELECTOR_SUCCESS = $('.success_box');
      if (errors.length > 0) {
        SELECTOR_ERRORS.empty();
        var errorString = '';
        
        for (var i = 0, errorLength = errors.length; i < errorLength; i++) {
            SELECTOR_ERRORS.append(errors[i].message + '<br />');
        }
        
        SELECTOR_SUCCESS.css({ display: 'none' });
        SELECTOR_ERRORS.fadeIn(200);
    }      
        
    });
                                                                   
});