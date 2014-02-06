var app = module.parent.exports.app
  , config = module.parent.exports.config
  , dbConn = exports.dbConn = module.parent.exports.dbConn
  , Admins = require('../models/admins')
  , Employees = require('../models/employees')
  
  , adminAuth;

/**
 * Interceptors
 */
adminAuth = function(req, res, next){
    //authorize role
    //console.log(req.user)
    if(typeof req.user != "undefined"){
	console.log(req.user);
	res.locals.user = req.user;
        next();
    }else{
        //Not authorized go to the login form
	//console.log(req.user);
	//res.locals.user = req.user;
        res.redirect('/admin');
    }
}

/*
 * GET 
 */

app.get('/', function(req, res){
    res.render('index', { title: 'Employee Wiki', section: 'Welcome', user: req.user});
});

app.get('/panel', adminAuth, function(req, res){
  //console.log(Employees.buscarEmployees());
  Employees.findAll().success(function(empleados){

        console.log(JSON.parse(JSON.stringify(empleados)));
        res.redirect('/panel/employees');
        //res.render('employees', { title: 'Employee List', empleados: empleados });
      });
    
  });


app.get('/panel/employees', adminAuth, function(req, res){
  //console.log(Employees.buscarEmployees());
  Employees.findAll().success(function(empleados){

        console.log(JSON.parse(JSON.stringify(empleados)));
        res.render('employees', { title: 'Listado', empleados:empleados });
      });
    
  });

app.get('/panel/employees/new', adminAuth, function(req, res){
   res.render('new', { title: 'New Employee', obj: {} });
});

app.post('/panel/employees/new', adminAuth, function(req, res){
  var hash = Employees.build({hashed_password: req.param('password')}).buildHash();
  Employees.create({
    nombre: req.param('name'),
    apellido: req.param('lastname'),
    email: req.param('email'),
    hashed_password: hash
  }).success(function(emp){
    res.redirect('/panel/employees');
  });
});

app.get('/panel/employees/delete/:id', adminAuth, function(req, res){
  Employees.find(req.params.id).success(function(employee){
    employee.destroy().success(function(){
      res.redirect("/panel/employees");
    }).error(function(err) { console.log(err); });
  });
});

app.get('/panel/employees/edit/:id', adminAuth, function(req, res){
  Employees.find(req.params.id).success(function(employee){
    res.render('edit', { title: 'Editar', employee: employee });
  }).error(function(){
    res.redirect('/panel/employees');
  });
});

app.post('/panel/employees/edit/', adminAuth, function(req, res){
    Employees.update({
       nombre: req.param('name'),
       apellido: req.param('lastname'),
       email: req.param('email')
    },{idEmployee:req.param('id')}).success(function(emp) {
          res.redirect('panel/employees');
    }).error(function(err) { console.log(err); });
});

app.get('/admin', function(req, res){
    if(typeof req.user != "undefined"){
        res.redirect('/panel/employees');
    }else{
        res.render('admin', { title: 'Ingreso', obj: {} });
    }
});
app.get('/employee/search/:keyword', function(req, res){
    Employees.findAll({where:["nombre LIKE ? OR apellido LIKE ?", "%"+req.params.keyword+"%", "%"+req.params.keyword+"%"]}).success(function(employees) {
        var result = employees || [];
        res.json(result);
    });
});