function login(){
	var main = document.getElementById('mainly')
	var a = '<h4 class ="loginText">User</h4> <input placeholder = "Live to Read" class = "loginInput" name = "user"><br/>';
	var b = '<h4 class ="loginText">Password</h4> <input placeholder ="Read to Live" class = "loginInput" name = "password" type = "password"><br/></br>';
	var c = '<button class = "loginButton" type = submit id = submit> Login </button>';
	var d = '<a href = "/"><button type = "button" class = "loginButton" id = "back"> Back </button></a>';
  var e = '</form>';
  main.innerHTML = '<form class = "login" method = "POST" action = "/login">'+a+b+c+d+e;
}

function register(){
	var main = document.getElementById('mainly')
	var a = '<h4 class ="loginText">Username</h4> <input placeholder = "Username" class = "loginInput" name = "user"><br/>';
	var b = '<h4 class ="loginText">Password</h4> <input placeholder ="Password" class = "loginInput" name = "password" type = "password">';
	var c = '<h4 class ="loginText">Confirm Password</h4> <input placeholder ="Confirm Password" class = "loginInput" name = "confirmPassword" type = "password"><br/></br>';
	var d = '<button class = "loginButton" type = "submit" id = submit> Register </button>';
	var e = '<a href = "/"><button type = "button" class = "loginButton" id = "back"> Back </button></a>';
  var f = '</form>';
  main.innerHTML = '<form class = "login" method = "POST" action = "/register">'+a+b+c+d+e+f;
}
