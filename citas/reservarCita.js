const axios = require('axios');
const moment = require('moment-timezone');
moment.tz('America/Guayaquil').format();


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
function createCalendarEvent(dateTimeStart, dateTimeEnd, appointment_type, idUser) {
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
                        description: idUser + '//',
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

    console.log(`Moment type: ${moment}`);
    let actual = moment().toDate();
    console.log(`Moment to date: var actual: ${actual}`);
    let esHoy = false;
    //= new Date(); //Fechay y hora actual
    //let minDia = new Date(new Date(dia).setHours(dia.getHours() - 17)); //desde las 00 horas
    let minDia = new Date(new Date(dia)); //fecha que viene de dialogflow
    //let maxDia = new Date(new Date(minDia).setHours(minDia.getHours() + 23)); //hasta las 23 hr
    let maxDia = new Date(new Date(dia));
    maxDia.setHours(23); // máximo hasta las 23 horas
    maxDia.setMinutes(0);


    //si el dia elegido es hoy se consulta los eventos minimo desde la hora en la que es
    if ((actual.getDay() === dia.getDay()) && (actual.getMonth() === dia.getMonth())) {
        console.log("ES HOY !!");
        minDia.setHours(actual.getHours()); //si es hoy se consulta desde la hora y minutos actuales
        minDia.setMinutes(actual.getMinutes());
        esHoy = true;

    } else {
        minDia.setHours(0);
        minDia.setMinutes(0);
        esHoy = false;
    }

    console.log(`Consultar desde: ${minDia}`);
    console.log(`Consultar hasta: ${maxDia}`);

    //si es hoy
    if (esHoy) {
        return new Promise((resolve, reject) => {
            let fechaHoraAgendar;

            calendar.events.list({
                auth: serviceAccountAuth, // List events for time period
                calendarId: calendarId,
                timeMin: minDia.toISOString(),
                timeMax: maxDia.toISOString(),
                showDeleted: false,

            }, (err, res) => {
                let events = res.data.items;

                if (err) {
                    console.log(`Fecha a agendar si es hoy ${fechaHoraAgendar}`);
                    resolve(fechaHoraAgendar);

                    reject(console.log('The API returned an error: ' + err));
                }
                //si hay eventos
                if (events.length) {
                    console.log(`Èventos hoy: ${events}`);
                    //obtengo la hora final de la última cita 

                    let fechaHoraUltimaCita = new Date(events[events.length - 1].end.dateTime || events[events.length - 1].end.date); // fecha hora ultima cita
                    //aun no termina la ultima cita
                    if (moment(actual).isBefore(fechaHoraUltimaCita)) {
                        console.log("Aun no termina la última cita");

                        //tiempo en minutos que falta para que finalice la última cita
                        let minRestante = moment(fechaHoraUltimaCita).diff(moment(actual), 'minutes');
                        console.log(`La ultima cita de hoy termina en: ${fechaHoraUltimaCita}`);
                        console.log(`Faltan ${minRestante} para que finalice la cita`);
                        //si aun falta una hora o más para que se termine la última cita
                        if (minRestante >= 60) {
                            console.log(`Falta mas de una hora`);
                            fechaHoraAgendar = new Date(fechaHoraUltimaCita.setMinutes(actual.getMinutes() + 1));
                            console.log(`Fecha a agendar si es hoy ${fechaHoraAgendar}`);
                            resolve(fechaHoraAgendar);

                        } else {
                            if ((minRestante >= 20) && (minRestante <= 59)) { //aun falta ntre 20 y 59 mins para que se termine
                                console.log(`Falta entre 20 y 59 min`);
                                fechaHoraAgendar = new Date(fechaHoraUltimaCita.setMinutes(actual.getMinutes() + 1));
                                console.log(`Fecha a agendar si es hoy ${fechaHoraAgendar}`);
                                resolve(fechaHoraAgendar);

                            } else {
                                console.log(`falta menos de 20 min`);
                                fechaHoraAgendar = new Date(actual.setMinutes(actual.getMinutes() + 20));
                                console.log(`Fecha a agendar si es hoy ${fechaHoraAgendar}`);
                                resolve(fechaHoraAgendar);

                            }
                        }

                    } else { //ya termino la última cita
                        console.log('Ya termino la última cita');
                        fechaHoraAgendar = new Date(actual.setMinutes(actual.getMinutes() + 20));
                        console.log(`Fecha a agendar si es hoy ${fechaHoraAgendar}`);
                        resolve(fechaHoraAgendar);

                    }
                } else { //no hay eventos y es hoy
                    console.log(`No hay eventos hoy`);
                    fechaHoraAgendar = new Date(actual.setMinutes(actual.getMinutes() + 20));
                    console.log(`Fecha a agendar si es hoy ${fechaHoraAgendar}`);
                    resolve(fechaHoraAgendar);

                }
            });

        });
    } else { //otro día en el futuro
        return new Promise((resolve, reject) => {
            let fechaHoraAgendar;
            calendar.events.list({
                auth: serviceAccountAuth, // List events for time period
                calendarId: calendarId,
                timeMin: minDia.toISOString(),
                timeMax: maxDia.toISOString(),
                showDeleted: false,

            }, (err, res) => {
                if (err) {
                    reject(console.log('The API returned an error: ' + err));
                }
                let events = res.data.items;
                //si hay eventos y no es hoy
                if (events.length) {
                    console.log(`Hay eventos pero no es hoy`);
                    let fechaHoraUltimaCita = new Date(events[events.length - 1].end.dateTime || events[events.length - 1].end.date); // fecha hora ultima cita
                    fechaHoraAgendar = new Date(fechaHoraUltimaCita.setMinutes(actual.getMinutes() + 1))
                } else { //no hay eventos
                    console.log(`No hay eventos pero no es hoy`);
                    fechaHoraAgendar = new Date(minDia)
                }

            });
            console.log(`Fecha a agendar si no es hoy ${fechaHoraAgendar}`);
            resolve(fechaHoraAgendar);
        })
    }


    /*return new Promise((resolve, reject) => {

        let fechaHoraAgendar;

        calendar.events.list({
            auth: serviceAccountAuth, // List events for time period
            calendarId: calendarId,
            timeMin: minDia.toISOString(),
            timeMax: maxDia.toISOString(),
            showDeleted: false,

        }, (err, res) => {
            let fechaHoraUltimaCita;

            if (err) {
                reject(console.log('The API returned an error: ' + err));
            }
            //const events = res.data.items;
            let events = res.data.items;
            //si hay eventos
            if (events.length) {
                console.log('Upcoming 10 events:');
                events.map((event, i) => {
                    const start = event.start.dateTime || event.start.date;
                    console.log(`${start} - ${event.summary}`);
                });

                fechaHoraUltimaCita = new Date(events[events.length - 1].end.dateTime || events[events.length - 1].end.date); // fecha hora ultima cita
                console.log(`Fecha hora ultima cita: +${ fechaHoraUltimaCita}`);
                //si ya paso la hora de la última cita, la hora para agendar es 25 min mas a la actual
                if (actual.getHours() > fechaHoraUltimaCita.getHours()) {
                    fechaHoraAgendar = new Date(actual.setMinutes(actual.getMinutes() + 25));
                    console.log(`Hora diasDisponibles.js+25 min ${   fechaHoraAgendar}`);
                } else { //si aun no pasa la hora de la ultima cita
                    let difHora = fechaHoraUltimaCita.getHours() - actual.getHours();
                    if (difHora >= 1) { //si falta una hora para que finalice la ultima cita se agenda despues de un minuto 
                        fechaHoraAgendar = new Date(fechaHoraUltimaCita.setMinutes(fechaHoraUltimaCita.getMinutes() + 1));
                        console.log(`Mas un minuto si falta 1 hora o mas: ${  fechaHoraAgendar}`);
                    } else { //si falta menos de una hora para que finalice la ultima cita
                        fechaHoraAgendar = new Date(fechaHoraUltimaCita.setMinutes(fechaHoraUltimaCita.getMinutes() + 15));
                        console.log(`Mas 15 minuto si falta menos 1: ${  fechaHoraAgendar}`);
                    }

                }

                //let aux = new Date(new Date(fechaHoraUltimaCita).setMinutes(minDia.getMinutes() + 1));
                //fechaHoraUltimaCita = aux;
                console.log(`fECHA DEFINITIVA PARA AGENDAR ${  fechaHoraAgendar}`);
                //let fechaParaCita = new Date(new Date(fechaHoraUltimaCita).setMinutes(dateTimeStart.getMinutes() + 30));//hora de la ultima cita + 30 min

            } else {
                console.log('No upcoming events found.');
                //sino la hora para la primera cita del día
                //fechaHoraUltimaCita = new Date(new Date(minDia).setHours(minDia.getHours() + 14));
                if (esHoy) {
                    console.log(`Es hoy: ${esHoy}`);
                    fechaHoraAgendar = new Date(new Date(minDia).setHours(actual.getHours()));
                    fechaHoraAgendar.setMinutes(actual.getMinutes() + 20);

                } else {
                    fechaHoraAgendar = new Date(new Date(minDia).setHours(9));
                }


            }
            console.log('Fecha ultima cita: ', fechaHoraUltimaCita);
            resolve(fechaHoraAgendar);
        });

    })*/



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