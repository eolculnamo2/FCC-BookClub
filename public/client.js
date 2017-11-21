function login(){
	var main = document.getElementById('main')
	main.innerHTML = '<form class = "login" method = "POST" action = "/login">';
	main.innerHTML += '<h4 class ="loginText">User</h4> <input placeholder = "Live to Read" class = "loginInput" name = "user"><br/>';
	main.innerHTML += '<h4 class ="loginText">Password</h4> <input placeholder ="Read to Live" class = "loginInput" name = "password" type = "password"><br/></br>';
	main.innerHTML += '<button class = "loginButton" type = submit id = submit> Login </button>';
	main.innerHTML += '<a href = "/"><button class = "loginButton" id = "back"> Back </button></a>'
}

