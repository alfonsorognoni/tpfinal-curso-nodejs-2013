var app = module.parent.exports.app
  , Employees = require('../models/employees.js')
  , Admins = require('../models/admins.js')
  , adminAuth;

/**
 * Interceptors
 */
adminAuth = function(req, res, next){
    //authorize role
    c//onsole.log(req.user)
    if(typeof req.user != "undefined"){
	//console.log(req.user);
	res.locals.user = req.user;
        next();
    }else{
        //Not authorized go to the login form
	//console.log(req.user);
	res.locals.user = req.user;
        res.redirect('/admin');
    }
}

/*
 * GET 
 */

app.get('/', adminAuth, function(req, res){
  Employees.buscarEmployees(function(emp){
    res.render('index', { title: 'Listado', obj:emp });
  });
});

app.get('/new', adminAuth, function(req, res){
   res.render('new', { title: 'Nuevo', obj: {} });
});

app.post('/new', adminAuth, function(req, res){
  var p = new Personas({nombre: req.body.nombre, cargo: "Alumno"});
  p.save(function(err, p){
    res.redirect("/");
  });
});

app.get('/delete/:id', adminAuth, function(req, res){
  Personas.eliminarAlumno(req.params.id, function(){
    res.redirect("/");
  });
});

app.get('/edit/:id', adminAuth, function(req, res){
  Personas.obtenerAlumno(req.params.id, function(pers){
    res.render('edit', { title: 'Editar', obj: pers });
  });
});

app.post('/edit/:id', adminAuth, function(req, res){
  Personas.editarAlumno(req.params.id, req.body.nombre, function(pers){
    res.redirect("/");
  });
});

app.get('/admin', function(req, res){
    if(typeof req.user != "undefined"){
        res.redirect('/');
    }else{
        res.render('admin', { title: 'Ingreso', obj: {} });
    }
});
