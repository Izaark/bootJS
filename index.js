var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var APP_TOKEN = 'EAADallZAptoYBAJ52MMzmcs1eZBGwY15ZB8qzWeA9y3RjZA40Qvd46jnlyZAIpzgaw0fJ24p9YWcDJWtXafFMG8h9t80InxZCe3p7ZCS52WvnHZBOZBD2Nfy5VRXrhZArvYShfwOmiJUByre0YVYR81JG6GGgVIEAWosXG2Hems6vxAQZDZD';

var app = express();
app.use(bodyParser.json());

app.listen(3000, function(){
	console.log("funciona en el puerto 3000");
});

app.get('/',function(req,res){
	res.send('Hola bienvenido');
});

app.get('/webhook',function(req,res){

	if (req.query['hub.verify_token']=='test_token_unam'){
		res.send(req.query['hub.challenge']);

	}else{
		res.send('Acceso denegado !')
	}
});

app.post('/webhook',function(req,res){
	var data = req.body;
	if (data.object=='page'){

		data.entry.forEach(function(pageEntry){
		pageEntry.messaging.forEach(function(messagingEvent){
		if (messagingEvent.message) {
			reciveMessage(messagingEvent);
		}
		
		});

		});
		res.sendStatus(200);
	}
});

function reciveMessage(event){
var senderID = event.sender.id;
var messageText = event.message.text;
console.log(senderID);
console.log(messageText);
}
