<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
 <title>Login Register</title>
 <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css">
 <link rel="stylesheet" 
 href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
 <style>
  html{
   padding:50px;
  }
 </style>
</head>
<body>
 <div class="container">
  <div class="col-sm-6 col-sm-offset-3">
        <h2>WEB-FLO Login</h2>

   <% if(message.length > 0) { %>
    <div class="alert alert-danger"><%= message %></div> 
   <% } %>

   <form action="/login" method="post">
    <div class="form-group">
     <label>Username</label>
     <input type="text" class="form-control" name="username">
    </div>
    <div class="form-group">
     <label>Password</label>
     <input type="password" class="form-control" name="password">
    </div>

    <button type="submit" class="btn btn-succcess btn-lg">Login</button>
   </form>

   <hr>

   <p>Need an account <a href="/signup">Register</a></p>
   <p>Go Back <a href="/">Home</a>.</p>
  </div>
 </div>
</body>
</html>
