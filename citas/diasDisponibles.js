const moment = require('moment');
moment.tz('America/Guayaquil').format();

function DiasDisponibles() {
    let today = moment();
    console.log(`Actual desde diasDisponibles.js: ${today}`);
    //let today = moment("20210130", "YYYYMMDD"); //para probar XD
    today.locale('es');

    let restDays = [];
    let hour = today.hour();

    //              0       1           2           3          4        5           6
    let week = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

    //dia actual que coincide con algun día de la semana
    let eqDay = week.find(day => today.format('dddd') === day);

    //index del día de la semana(week)
    let idxDay = week.indexOf(eqDay);
    console.log(`Coincide: ${eqDay} índice: ${idxDay}`);

    //si la hora actual está entre las 8 am y 3pm tambien se añade el dia actual 
    if (hour >= 8 && hour < 16) {
        var tdy = today.format('dddd D');
        var tdyReply = {
            "content_type": "text",
            "title": tdy,
            "payload": tdy
        }
        restDays.push(tdyReply);

    }

    if (idxDay === 6) { //si es domingo, mando toda la semana en adelante
        //suponiendo que domingo no trabaja. Sino <7
        for (i = 0; i < 6; i++) {
            var tdy = today.add(1, 'days').format('dddd D');
            var day = {
                    "content_type": "text",
                    "title": tdy,
                    "payload": tdy
                }
                //console.log(today.add(1, 'days').format('dddd D'));
            restDays.push(day);
        }
    }
    //suponiendo que domingo no trabaja. Sino <7
    for (i = idxDay + 1; i < 6; i++) {
        var tdy = today.add(1, 'days').format('dddd D');
        var day = {
                "content_type": "text",
                "title": tdy,
                "payload": tdy
            }
            //console.log(today.add(1, 'days').format('dddd D'));
        restDays.push(day);
    }
    //retorno los días restantes  disponibles en los que trabaja
    return JSON.stringify(restDays);
}

module.exports = {
    DiasDisponibles
}