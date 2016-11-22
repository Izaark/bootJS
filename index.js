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
	}else if (isContain(message,'chiste')){
		finalMessage = 'Me se este: ¿Que le dice un ordenador grande a un ordenador pequeño? :Tan pequeño y ya computas';
	}else if (isContain(message,'creador')){
		finalMessage = 'me creo isaac, pero eso no importa mucho !';
	}else if (isContain(message,'wars')){
		finalMessage = 'Que la fuerza te acompañe !';
	}else if (isContain(message,'naciste')){
		finalMessage = 'el 12 de noviembre del año en curso, vi la luz de facebook!';
	}else if (isContain(message,'solo')){
		finalMessage = 'oye, no estas solo, me tienes a mi !!';
	}else if (isContain(message,'recomiendas')){
		finalMessage = 'hmm.. ve al cine, me estoy actualizando para recomendarte pelis !! :)';
	}else if (isContain(message,'canta')){
		finalMessage = 'no te gustaría !!, yo soy mas de escuchar';
	}else if (isContain(message,'eres')){
		finalMessage = 'soy tu amigo, y soy un boot ! 🤖';
	}else if (isContain(message,'estas')){
		finalMessage = 'Me siento como pez en el agua !';
	}else if (isContain(message,'jajaja')||isContain(message,'gracioso')){
		finalMessage = 'jajaja, gracioso xD';
	}
	//Questions	type 1 AND 2
	else if (isContain(message,'pareja')){
		finalMessage = 'Cuando sales con tu pareja comes a pesar de no tener hambre?';
	}else if (isContain(message,'si como')){
		finalMessage = 'Por que no intentas pedir algo pequeño para acompañar';
	}else if (isContain(message,'no como')){
		finalMessage = 'Intenta comer algo pequeño un helado no estaría mal';
	}
	else if (isContain(message,'sed')){
		finalMessage = 'Hablando de eso, cuantos litros de refresco tomas al día ?';
	}else if (isContain(message,'dos litros')||isContain(message,'2 litros')){
		finalMessage = 'Alto!!, tomar tanto refresco afectará tus riñones,';
	}else if (isContain(message,'un litro')||isContain(message,'menos litro')){
		finalMessage = 'Intenta tomar menor regresco y beber mas agua';
	}
	else if (isContain(message,'me siento')){
		finalMessage = 'Hmmm.. oye cuando te sientes estresado, ansioso o deprimido sules comer mas ?\nSi, No o tal vez ?';
	}else if (isContain(message,'si algo')){
		finalMessage = 'Por que no intentas liberar esa tensión de otra manera';
	}else if (isContain(message,'casi no')){
		finalMessage = 'Esta bien solo recuerda llevar una dieta valanceada !';
	}else if (isContain(message,'tal vez como')){
		finalMessage = 'Deberías poner más atención a tu alimentación';
	}
	else if (isContain(message,'fruta')){
		finalMessage = 'Oye has comido frutas ultimamente ?';
	}else if (isContain(message,'si eh comido')){
		finalMessage = 'Cual es tu fruta favorita, las mias son la 🍎 y la 🍓';
	}else if (isContain(message,'no eh comido')){
		finalMessage = 'Einstein decía:\nSi quieres resultados diferentes, no hagas las mismas cosas.\nIntenta comer frutas!! 🍒🍉🍇';
	}
	else if (isContain(message,'leer')){
		finalMessage = 'En verdad te gusta leer ?';
	}else if (isContain(message,'si leo')){
		finalMessage = 'Felicidades seguro eres una persona muy interesante';
	}else if (isContain(message,'no leo')){
		finalMessage = '"Sabías que la Santa Inquisición asesino a 1.6 millones de mujeres pelirrojas porque pensó que tenían un pacto con el diablo debido a su color de cabello"\n\nSi leyeras podrías saber datos como este o historias muy interesantes\nTe invito a leer el principito de Antonie de Saint du Exupery';
	}
	else if (isContain(message,'bailar')){
		finalMessage = 'Sabes bailar ?';
	}else if (isContain(message,'si bailo')){
		finalMessage = '............... ¡Genial! .............\nEs un buen pretexto para divertirte y conocer más gente';
	}else if (isContain(message,'no bailo')){
		finalMessage = 'Existen lugares donde dan clases a precios accesibles\n¡Porque no lo intentas¡';
	}
	//Questions kind 4
	else if (isContain(message,'fumar')||isContain(message,'cigaro')){
		finalMessage = 'Sabías que….\nCerca de 4 millones de personas mueren por fumar cada año.\nEn México mueren aproximadamente 122 personas al día por el cigarro.\nTambién es una las principales causas de cáncer de garganta y pulmones; lo que te lleva a una muerte lenta e irreversible.';
	}
	else if (isContain(message,'chicle')){
		finalMessage = 'Sabías que….\nMascar chicle te puede causar gastritis. Porque tu organismo se engaña y piensa que estás enjeriendo alimentos.\nPor lo que los jugos gástricos se liberan sobre el estómago.';
	}
	else if (isContain(message,'sopa maruchan')||isContain(message,'sopa instantanea')){
		finalMessage = 'Sabías que….\nTu cuerpo tarda hasta 3 meses en digerir sopas instantáneas. Algunos de los problemas  que ocasiona su consumo son:\nIntestino perezoso, obstrucción intestinal, la cual termina en cirugía en mayor de los casos.';
	}
	else if (isContain(message,'huesos')){
		finalMessage = '¿Sabes cuántos huesos conforman tu cuerpo?\nDurante la niñez posees 300 huesos. Mientras que al pasar los 12 años  cuentas con 206 huesos.\nEsto se debe a que los huesos de tus pies se van uniendo para poder soportar el peso que tienes al ser adulto.';
	}
	else if (isContain(message,'presión')||isContain(message,'presion')){
		finalMessage = 'Sabías qué….\nEl consumo excesivo de sal provoca presión alta\nLa sal causa presión arterial elevada y esta es la  principal causa de muerte en el mundo  y la segunda causa de discapacidad en y provoca 7. 6 millones de muertes prematuras al año.'
	}
	else if (isContain(message,'obecidad')){
		finalMessage = 'Sabías qué….\nHoy en día, la obesidad en México es considerada un problema serio\n52% de la población la padece.\nSus  principales complicaciones médicas son: enfermedades pulmonares y de corazón al igual que  diabetes, cáncer y enfermedades del hígado y gota.'
	}

	//templates questions more type 3
	else if (isContain(message,'hambre')||isContain(message,'comida')){
			buttonComida(recipientId);
	}else if (isContain(message,'aburrido')){
			TemplateCine(recipientId);
	}else if (isContain(message,'atención')||isContain(message,'atencion')){
			buttonAtencion(recipientId);
	}else if (isContain(message,'cancion')||isContain(message,'canción')||isContain(message,'música')){
			buttonMusica(recipientId);
			finalMessage = 'A mi me gusta escuhar música en Spotify';
	}else if (isContain(message,'cafe')||isContain(message,'café')){
			buttonCafe(recipientId);
			finalMessage = 'A mi me gusta el té';
	}else if (isContain(message,'agua')||isContain(message,'tomar agua')){
			buttonAgua(recipientId);
	}
	else if (isContain(message,'buscar')||isContain(message,'google')){
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
		finalMessage = 'Trataré de asimilarlo y recordarlo, aun estoy aprendiendo :)';
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

//butons !!
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
						payload:"rtgyui"
						
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
						url : "https://es.wikipedia.org/wiki/Monster_Energy",
						title: "si"
            			
					},						
					{
						type: "web_url",
						title: "No",
						url:"https://es.wikipedia.org/wiki/Taurina"
					}
					]
				}
			}
		}
	};
	callSendAPI(messageData);
}
function buttonAtencion(recipientId){
		var messageData = {
		recipient:{
			id: recipientId
		},
		message:{
			attachment:{
				type:'template',
				payload:{
					template_type: "button",
					text :"Te cuesta trabajo poner atención?",
					buttons:[
					{
						type: "web_url",
						url : "https://ods.od.nih.gov/factsheets/VitaminB12-DatosEnEspanol/",
						title: "si"
            			
					},						
					{
						type: "web_url",
						title: "No",
						url:"http://www.escuchaactiva.com/articulo_prestar_atencion.htm"
					}
					]
				}
			}
		}
	};
	callSendAPI(messageData);
}
function buttonMusica(recipientId){
		var messageData = {
		recipient:{
			id: recipientId
		},
		message:{
			attachment:{
				type:'template',
				payload:{
					template_type: "button",
					text :"Te gusta escuhar música ?",
					buttons:[
					{
						type: "web_url",
						url : "https://play.spotify.com/user/johanbrook/playlist/2mtlhuFVOFMn6Ho3JmrLc2",
						title: "si"
            			
					},						
					{
						type: "web_url",
						title: "No",
						url:"http://www.seventeenenespanol.com/vida-real/698776/7-razones-musica-te-ayuda-sentirte-mejor/"
					}
					]
				}
			}
		}
	};
	callSendAPI(messageData);
}
function buttonCafe(recipientId){
		var messageData = {
		recipient:{
			id: recipientId
		},
		message:{
			attachment:{
				type:'template',
				payload:{
					template_type: "button",
					text :"Tomas café ?☕️ ",
					buttons:[
					{
						type: "web_url",
						url : "http://www.cafebunte.com/el-cafe/datos-curiosos-del-cafe",
						title: "si"           			
					},						
					{
						type: "web_url",
						title: "No",
						url:"https://es.wikipedia.org/wiki/Caf%C3%A9"
					}
					]
				}
			}
		}
	};
	callSendAPI(messageData);
}
function buttonAgua(recipientId){
		var messageData = {
		recipient:{
			id: recipientId
		},
		message:{
			attachment:{
				type:'template',
				payload:{
					template_type: "button",
					text :"Tomas suficiente agua al día ?",
					buttons:[
					{
						type: "web_url",
						url : "http://www.fitnessrevolucionario.com/2013/12/22/cuanta-agua-debes-beber-la-respuesta-no-es-2-litros-al-dia/",
						title: "si"           			
					},						
					{
						type: "web_url",
						title: "No",
						url:"http://quepasasi.info/no-tomo-agua"
					},
					{
						type: "web_url",
						title: "tal vez",
						url:"http://www.atl.org.mx/index.php?option=com_content&view=article&id=3659:agua-natural-vs-refrescos&catid=113:agua-y-salud&Itemid=577"
					}
					]
				}
			}
		}
	};
	callSendAPI(messageData);
}

//functions with templates
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
//API twather
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





