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
                                                                   
});