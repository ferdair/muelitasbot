'use strict';

// Import the Dialogflow module from Google client libraries.
//const functions = require('firebase-functions');
const { google } = require('googleapis');
//const { WebhookClient } = require('dialogflow-fulfillment');

// Enter your calendar ID below and service account JSON below
const calendarId = "tohttlt7u5vbiodk5ovsq6e9ik@group.calendar.google.com";
const serviceAccount = {
    "type": "service_account",
    "project_id": "muelitas-mavf",
    "private_key_id": "56d329ff0875f4215405d53aee2d99f20e7bc446",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9BpMD4ow/7/on\nGYmBEGuP+TYBPVR7ay1WNcUNq3EPncoxwaoMqY3lijvEzpmNSdlRNu8fvUNtn+Rf\nqMhE83/L9gRkKGL23fyEw1qQ/m4CbWQNYKvmsH3LqgzsSzytgnc4eOzF+NLVH2x2\nqymQPSnRBx92/u6LiWHntHChWIuoNM+Pqw3hDv5UgUB5axO9FqwshBoAocI8Loz4\n7NE+2U+5Opq8uNG4HvGKk9z0D4R3fWYnhwqPrWzp+VvSLYyhTDHvEQIdeRvQ1Xt6\nqIF2tTCCMSFZUVrxffxUhUxoviN1Qmfw1oBT28SHxdYeJAzq+TOOrpRv+5YLDDTR\n9oZEHManAgMBAAECggEARxIuupo2g1+2XXcjlSxYVPStkn+9wP3GORDUe1RHmUiJ\nmnWne0VQ/coguNm5MD9g/0E5XWSq8o/YrQLn8czf8w8YDZSFyS4j4MMWzUdsk2sP\n4FvFpmIbmjTg0QNk2BQiwU/uLm1k0A8Vl/S5Fut4Soh0Eyi9BifscNMOOgvxzpcP\nGLpCdfP30t1wxPGLcu3qBARQFUAOX3nynx8h9mg4zTkM2/2AWFXKF1YlInIrZxPr\nh5N5I/0eaxMkToQ8g1XxninvGs6MmRIQuO1MOsC37+voQXRMyhSDWOELBqL9gDXU\nW+flgKU4Gng0yP/dapJmTyeQiYQYFv04h4w8XoXoQQKBgQDlIcG3UXMvgcrk1SQ1\n9zu4yaA2YF8XDC7RMb8oEItK7b+yIYURcMzA8e48nyPv1BFQJnrz4YSsKGW1R30I\n6rhez7KSsuQQUK4VEslXQIHdkHp1ZH3xJrgPLyPfVKIaYWN+aCFoC64UcpeQa/7V\nbp0oATAwQWs1fQ2yipGNKjZFBwKBgQDTMOG149ROf2C+lZf4eoJU3mdiU6OCn2DM\ndl0I4WbuCbPXLDtCTQ3y/1ofh+LtkTeNSaBFxQs7qIMgtjbt9R2YoVpJgkXtUu7q\niRidj/avfqz6DFIGFUVYZmG1JCvItupNovf3P8QgOhR2feQyZqM+VE1zeVQSb/9T\nAq7KAm2pYQKBgBwGlPsnKz+UUIzMxTEUnGltv/rmrrrS8qcDvq3X2DHCAsB2+R+4\n/FJdRRaFIJAlEDkNe9x4qRGln0sdA14j14lBPkZTOzIDrEdHlPjnGvtOwKu7Luxg\nIAM7cNfQMkOnxdOgSPXA9/noSkGP9AuHDBHok0xTtBlGwnYkHMl3cEvhAoGBAITN\nGTHiiS+vY6uUsBKdHvW1QPeQtqI+DIWl7IzYCHyo90DYXI8tmxbxwb9QGL/g8DjV\nUoZtCMpEBej9C/+IgkrnM7pDxCsfWoN7IFJ8I9hpZOZ79txCZe/XuZtJmorFkwKs\n9xawL2lAfHuiYGvdJMveATIa2mYZrUmKx1TaQBEhAoGBANLSJxVMLdIQ+TLX3Nfo\nEqmPPJlqIP1BLN1jdabs/pIxXDvlCcFYnB7AuFUL/s+rwvrgT0eErIAbMwScEWbb\nYF+obrMfjPizZGWPvkjkPUPCu0XsSIFPtEwFQ3OGbanxFwMAa7sXaCTOGTgIhiaz\nqsFHGMQAOXQOuuDjDQTlDudS\n-----END PRIVATE KEY-----\n",
    "client_email": "calendario4@muelitas-mavf.iam.gserviceaccount.com",
    "client_id": "105221903200812125059",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/calendario4%40muelitas-mavf.iam.gserviceaccount.com"
};

// Set up Google Calendar Service account credentials
const serviceAccountAuth = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: 'https://www.googleapis.com/auth/calendar'
});

const calendar = google.calendar('v3');
process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements

//Creates calendar event in Google Calendar
function createCalendarEvent(dateTimeStart, dateTimeEnd, appointment_type) {
    return new Promise((resolve, reject) => {
        calendar.events.list({
            auth: serviceAccountAuth, // List events for time period
            calendarId: calendarId,
            timeMin: dateTimeStart.toISOString(),
            timeMax: dateTimeEnd.toISOString()
        }, (err, calendarResponse) => {
            // Check if there is a event already on the Calendar
            if (err || calendarResponse.data.items.length > 0) {
                reject(err || new Error('Requested time conflicts with another appointment'));
            } else {
                // Create event for the requested time period
                calendar.events.insert({
                    auth: serviceAccountAuth,
                    calendarId: calendarId,
                    resource: {
                        summary: appointment_type + ' ',
                        description: appointment_type,
                        start: { dateTime: dateTimeStart },
                        end: { dateTime: dateTimeEnd }
                    }
                }, (err, event) => {
                    err ? reject(err) : resolve(event);
                });
            }
        });
    });
}


function getHoraDisponible(dia) {

    let minDia = new Date(dia).setHours(0); //hora de la ultima cita + 30 min;
    console.log('Consultar desde: ', minDia);
    let maxDia = new Date(dia).setHours(22);; //hasta las 23 hrs
    let fechaHoraUltimaCita;
    console.log('Consultar hasta: ', maxDia);

    calendar.events.list({
        auth: serviceAccountAuth, // List events for time period
        calendarId: calendarId,
        timeMin: minDia.toISOString(),
        timeMax: maxDia.toISOString(),
        showDeleted: false,

    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const events = res.data.items;
        if (events.length) {
            console.log('Upcoming 10 events:');
            events.map((event, i) => {
                const start = event.start.dateTime || event.start.date;
                console.log(`${start} - ${event.summary}`);
            });

            //retornar fecha y hora para cita 
            fechaHoraUltimaCita = events[events.length - 1].end.dateTime || events[events.length - 1].end.date;
            //let fechaParaCita = new Date(new Date(fechaHoraUltimaCita).setMinutes(dateTimeStart.getMinutes() + 30));//hora de la ultima cita + 30 min
            console.log('Fecha ultima cita: ', fechaHoraUltimaCita);

        } else {
            console.log('No upcoming events found.');
            //sino la hora para la primera cita del día
            fechaHoraUltimaCita = new Date(new Date(minDia).setHours(minDia.getHours() + 9));
        }
    });

    return fechaHoraUltimaCita;
    /*.then(function(response) {
            // Handle the results here (response.result has the parsed body).

            console.log('Desde la response dela petición\n');
            console.log("Response Items", response.data.items);
            console.log('Ultima cita: ', response.data.items[response.data.items.length - 1]);
            console.log('Hora fin cita', finCita);
            events = response.data.items;
        },
        function(err) { console.error("Execute error", err); });;

    let ttlEvDia = events.length;
    let ultimaCita = events[ttlEvDia - 1];
    let finCita = ultimaCita.end;
    console.log('DESDE EL ARRAY EVENTS');
    console.log(`El dia ${dia} tiene un total de ${ttlEvDia}\n`);
    console.log('Ultima cita: ', ultimaCita);
    console.log('Hora fin cita', finCita);*/

}

module.exports = {
    createCalendarEvent,
    getHoraDisponible
}