module.exports = function(app, passport) {

    var multer  = require('multer');
    var SqlString = require('sqlstring');
    var mysql = require('mysql');
    var dbconfig = require('../config/database');
    var connection = mysql.createConnection(dbconfig.connection);

    connection.query('USE ' + dbconfig.database);


// manter o servidor rodando

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'pablo123',
  database        : 'fi11act'
});

exports.getUsers = function(callback) {
  pool.getConnection(function(err, connection) {
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }
    var sql = "SELECT owner_id FROM new_flo";
    connection.query(sql, [], function(err, results) {
      connection.release(); // always put connection back in pool after last query
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }
      callback(false, results);
    });
  });
};

var Reestabelecendo = 0;
setInterval(function () {
  connection.query('SELECT owner_id FROM new_flo');
  console.log('# # ### conexao com sql * ' + Reestabelecendo + ' ### porta 3005 # #')
  Reestabelecendo++;
}, 50000);







        var foto;
        /* upload and post users. */
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
            cb(null, './public/images')
            },
            filename: function (req, file, cb) {
                foto = Date.now() + '-' + file.originalname
                cb(null,   foto)
            }
        })
    
      var upload = multer({ storage: storage })


 app.get('/', function(req, res){
  res.render('index.ejs');
 });

 app.get('/login', function(req, res){
  res.render('login.ejs', {message:req.flash('loginMessage')});
 });

 app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
 }),
  function(req, res){
   if(req.body.remember){
    req.session.cookie.maxAge = 1000 * 60 * 3;
   }else{
    req.session.cookie.expires = false;
   }
   res.redirect('/');
  });

 app.get('/signup', function(req, res){
  res.render('signup.ejs', {message: req.flash('signupMessage')});
 });

 app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
 }));

 app.get('/profile', isLoggedIn, function(req, res){
    var userid = req.user.id;

    connection.query("SELECT * FROM new_flo WHERE owner_id = ?  ", userid, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.render('profile.ejs', {
            user:req.user, dados:result
        })
      });
 });

 app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
 })


 app.get('/new', isLoggedIn, function(req, res){
            res.render('newflo.ejs', {
              user:req.user,
            }); 
  });


 app.post('/registrarnovotema', upload.any('images'), isLoggedIn, function(req, res){

    var theme = req.body.theme;  
    var userid = req.user.id;
  
        var sql = SqlString.format("INSERT INTO `new_flo`(`owner_id`, `theme`, `movie`) VALUES (?, ?, ?)", [userid, theme, foto ]);
        connection.query(sql, function (err, result) {
          if (err){
            throw err;
          } else {
            
            console.log(result.insertId)
                var ur = '/analysis?id='+result.insertId
                res.redirect(ur)
            
            
          }
    })
  })

app.get('/analysis', upload.any('images'), isLoggedIn, function(req, res){
    var id = req.query.id;  
    console.log(id);
            connection.query("SELECT * FROM new_flo WHERE id = ? ", id,
            function(err, rows){
                res.render('analyse.ejs', {
                    user:req.user, dados:rows
                })
            });
  })

  app.post('/save_analyse', isLoggedIn, function(req, res){
    var id = req.query.id; 
    console.log(req.body.Process)
    // console.log(id);
    //         connection.query("SELECT * FROM new_flo WHERE id = ? ", id,
    //         function(err, rows){
    //             res.render('analyse.ejs', {
    //                 user:req.user, dados:rows
    //             })
    //         });
  })


};

function isLoggedIn(req, res, next){
 if(req.isAuthenticated())
  return next();

 res.redirect('/');
}
