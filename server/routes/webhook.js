const express = require('express');
const app = express();
const { WebhookClient } = require('dialogflow-fulfillment');

app.get("/", (req, res) => {
    res.send("Escuchando peticiones");
})

app.post('/webhook', express.json(), function(req, res) {
    const agent = new WebhookClient({ request: req, response: res });
    console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(req.body));



    function PreguntarHorario(agent) {
        agent.add(`Estamos atendiendo de lunes a viernes de 9:00 am a 16:00 pm`);
        agent.add(`¿Desea reservar una cita?`);

    }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('PreguntarHorario', PreguntarHorario);
    // intentMap.set('your intent name here', yourFunctionHandler);
    // intentMap.set('your intent name here', googleAssistantHandler);
    agent.handleRequest(intentMap);
});



module.exports = app;