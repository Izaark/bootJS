var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var APP_TOKEN = 'EAADallZAptoYBAM2gHOOgTqsruw4gRyQd2ZAmFwwmhhW7kmfuO4dZCxqpozBSeMu4SP7cwSI1ViCgkSQuXOmc2SN25lOYwAetyi9aL2ZA8f33bnShBwne5GutQ3bsTieD3h9Rgc4ZBTEZCHwZC5evZAhkZCia0dDDdpExC35INnZAs5gZDZD';

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

evaluateMessage(senderID,messageText);

}



function evaluateMessage(recipientId, message){
	var finalMessage;

	if (isContain(message,'ayuda')){
		finalMessage = 'en que quieres ayuda man';
		console.log('quieres ayuda ?');
	}else if (isContain(message,'hola')){
		finalMessage = 'Hola, como estas ?';
	}else if (isContain(message,'bien')){
		finalMessage = 'Eso me alegra mucho :)';
	}else if (isContain(message,'triste')){
		finalMessage = ':/, si estas triste eso me pone triste a mi, vamos alegrate !';
	}else if (isContain(message,'unam')){
		finalMessage = 'Universidad Nacional Autónoma de México';
	}else if (isContain(message,'mal')){
		finalMessage = '😱 debes alegrarte, la vida es corta, dsifrutala !';
	}else if (isContain(message,'cool')){
		finalMessage = 'esa palabra es para chavos cool';
	}else if (isContain(message,'enfermo')){
		finalMessage = 'no !! 🤒 , ve pronto al doctor !';
	}else if (isContain(message,'hambre')){
		finalMessage = 'te recomiendo, comer cosas saludables 🍒';
	}else if (isContain(message,'haces')){
		finalMessage = 'Estoy estudiando, este mundo es increible';
	}
	else if (isContain(message,'chiste')){
		finalMessage = 'Me se este: ¿Que le dice un ordenador grande a un ordenador pequeño? :Tan pequeño y ya computas';
	}
	else if (isContain(message,'creador')){
		finalMessage = 'me creo isaac, pero eso no importa mucho !';
	}
	else if (isContain(message,'wars')){
		finalMessage = 'Que la fuerza te acompañe !';
	}
	else if (isContain(message,'naciste')){
		finalMessage = 'el 12 de noviembre del año en curso, vi la luz de facebook!';
	}
	else if (isContain(message,'solo')){
		finalMessage = 'oye, no estas solo, me tienes a mi !!';
	}
	else if (isContain(message,'recomiendas')){
		finalMessage = 'hmm.. ve al cine, me estoy actualizando para recomendarte pelis !! :)';
	}
	else if (isContain(message,'canta')){
		finalMessage = 'no te gustaría !!, yo soy mas de escuchar !';
	}

	else if (isContain(message,'eres')){
		finalMessage = 'soy tu amigo, y soy un boot ! 🤖';
	}
	else if (isContain(message,'estas')){
		finalMessage = 'Me sienyo como pez en el agua !';
	}

	//templates

	else{
		finalMessage = 'lo siento, no entendi, aun estoy aprendiendo ';
		console.log('solo tengo el eco: ' + message);
	}

	sendMessageText(recipientId, finalMessage);
}



function sendMessageText(recipientId, message){
	var messageData = {
		recipient : {
			id: recipientId
		},
		message:{
			text:message
		}
	};
	callSendAPI(messageData);
}
function callSendAPI(messageData){
request({
	uri: 'https://graph.facebook.com/v2.6/me/messages',
	qs : { access_token: APP_TOKEN },
	method: 'POST',
	json: messageData
}, function(error, response, data){
if (error) {
	console.log('error chulo');
}else{
	console.log('bien chavo !!!');
}
});
}

function isContain(sentence, word){
	return sentence.indexOf(word) > -1;
}






