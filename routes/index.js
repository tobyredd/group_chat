module.exports = function Route(app){
	var users = [];
	var messages = [];
	app.get('/', function(req, res){
		res.render('index', { title: 'Welcome Page' });
	});
	app.io.route('got_a_new_user', function(req){
		console.log('room: ', req.data.room);
		console.log('name: ', req.data.name);
		console.log('socketid: ', req.socket.id)
		req.io.join(req.data.room);
		users.push({name: req.data.name, socketID: req.socket.id });
		console.log('users', users);
		req.io.broadcast('new_user', {new_user_name: req.data.name, socketId: req.socket.id })
	})
	app.io.route('message_received', function(req){
		console.log(req.data);
		messages.push({user: req.data.name, message: req.data.message, socketId: req.socket.id});
		app.io.broadcast('message_broadcast', {user: req.data.name, message: req.data.message, socketId: req.socket.id })
	})
}