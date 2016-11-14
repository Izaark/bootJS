var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var APP_TOKEN = 'EAADallZAptoYBAHFZB59o1PfChyto5E1KtTwUBoe7yO2QnBA53wywFQW3Anry0cuX71lHPwQJrEwZAWzZAWXuZBBlOiE3rW744WP9wZBop5ug0lmoHTnbcDPld865W1mNw54zYZB7NZCy3j4mRK10X18geG4qM9cUBAEZBwbgRCKvkQZDZD';


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
		finalMessage = 'no te gustaría !!, yo soy mas de escuchar';
	}
	else if (isContain(message,'eres')){
		finalMessage = 'soy tu amigo, y soy un boot ! 🤖';
	}
	else if (isContain(message,'estas')){
		finalMessage = 'Me siento como pez en el agua !';
	}
	else if (isContain(message,'dos litros')||isContain(message,'2 litros')){
		finalMessage = 'Perfecto, tomar dos litros de agua te ayudará a tener una mejor vida!!';
	}
	else if (isContain(message,'un litro')||isContain(message,'menos litro')){
		finalMessage = 'te recomiendo que deberías de tomar 2 litros diarios';
	}
	else if (isContain(message,'sed')){
		finalMessage = 'hablando de eso, cuantos litros de agua tomas al día ?';
	}
	else if (isContain(message,'jajaja')||isContain(message,'gracioso')){
		finalMessage = 'jajaja, gracioso xD';
	}
	//templates
	else if (isContain(message,'hambre')||isContain(message,'comida')){
			buttonComida(recipientId);
	}else if (isContain(message,'aburrido')){
			//finalMessage = 'Igual yo deberías ver una peli';
			TemplateCine(recipientId);
			finalMessage = 'deberias salir a caminar, pudes comnocer a alguien en el camino\nO puedes ver una peli !';
	}else if (isContain(message,'buscar')||isContain(message,'google')){
			sendMessageTemplate(recipientId);
	}else if (isContain(message,'cine')||isContain(message,'pelicula')){
			TemplateCine(recipientId);
	}else if (isContain(message,'dime algo')){
			buttonTaurina(recipientId);
	}
	//API Weater
	else if (isContain(message,'clima')){
			getTiempo(function(temperature){
			message = MessageTiempo(temperature);
			sendMessageText(recipientId,message);
			});
	}
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

//botones !!

function buttonComida(recipientId){
		var messageData = {
		recipient:{
			id: recipientId
		},
		message:{
			attachment:{
				type:'template',
				payload:{
					template_type: "button",
					text :"Consideras buena,regular o mala tu comida ?",
					buttons:[
					{
						type: "web_url",
						url : "https://www.buzzfeed.com/deenashanker/23-comidas-saludables-que-todos-deberian-saber-com?utm_term=.gyLwZL33ek#.gg7Dy8xxBV",
						title: "Buena"
            			
					},						
					{
						type: "web_url",
						title: "regular",
						url:"http://es.wikihow.com/comer-de-forma-saludable"
					},
					{
						type: "postback",
						title: "mala",
						payload:"lol"
						
					}
					]
				}
			}
		}
	};
	callSendAPI(messageData);
}
function buttonTaurina(recipientId){
		var messageData = {
		recipient:{
			id: recipientId
		},
		message:{
			attachment:{
				type:'template',
				payload:{
					template_type: "button",
					text :"Sabes que es la taurina ?",
					buttons:[
					{
						type: "web_url",
						url : "https://www.buzzfeed.com/deenashanker/23-comidas-saludables-que-todos-deberian-saber-com?utm_term=.gyLwZL33ek#.gg7Dy8xxBV",
						title: "si"
            			
					},						
					{
						type: "web_url",
						title: "No",
						url:"http://www.scielo.cl/scielo.php?script=sci_arttext&pid=S0717-75182002000300003"
					}
					]
				}
			}
		}
	};
	callSendAPI(messageData);
}


//funciones con templates
function TemplateCine(recipientId){
		var messageData = {
		recipient:{
			id: recipientId
		},
		message:{
			attachment:{
				type:'template',
				payload:{
					template_type: "generic",
					elements:[
					{
					title: "Te recomiendo ir a este lugar",
					subtitle: "Cinepolis",
					item_url: "http://www.cinepolis.com/",
					image_url: "http://www.cinu.mx/noticias/cinepolis.png",
					}
					]
				}
			}
		}
	};
	callSendAPI(messageData);
}

function sendMessageTemplate(recipientId){
	var messageData = {
		recipient:{
			id: recipientId
		},
		message:{
			attachment:{
				type:'template',
				payload:{
					template_type: "generic",
					elements: [elementsTemplate()]
				}
			}
		}
	};
	callSendAPI(messageData);
}

function elementsTemplate(){
	return {
		title: "El mejor navegador",
		subtitle: "De google",
		item_url: "https://www.google.com.mx",
		image_url: "https://yt3.ggpht.com/-v0soe-ievYE/AAAAAAAAAAI/AAAAAAAAAAA/OixOH_h84Po/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
		buttons: [buttonTemplate()],
	}
}
function buttonTemplate(){
	return{
		type: "web_url",
		url : "https://www.google.com.mx",
		title: "Busca algo"
	}
}
//API tiempo
function MessageTiempo(temperature){
	if (temperature <15) {
		return "Estamos a: "+ temperature +"º, Hace frio, ponte el sueter";
	}
	else{
		return "Estamos a: " +  temperature + "Esta bien el dia";
	}
}
function getTiempo(callback){
	request("http://api.geonames.org/findNearByWeatherJSON?lat=19.4284700&lng=-99.1276600&username=izaak",
	function(error,response,data){
		if (!error) {
			response = JSON.parse(data);
			var temperature = response.weatherObservation.temperature;
			callback(temperature);
		}
	});
}





