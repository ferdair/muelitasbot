var moment = require('moment');

function DiasDisponibles() {
    let today = moment();
    today.locale('es');

    let restDays = [];

    //hora actual
    let hora = today.hour();
    //let hora = 10;
    //let dia = 'miercoles';
    //console.log('Hora:', hora);

    //si la hora sigue en el horario de trabajo, se puede reservar en esa hora
    if (hora >= 8 && hora < 16) {
        //añadir tambien el dia actual
        //console.log('Todavia hay chance hoy\n');
        let replyToday = {
            "content_type": "text",
            "title": today.format('dddd D'),
            "payload": today.format('dddd D')
        }

        restDays.push(replyToday);

        switch (today.format('dddd')) {
            case 'lunes':
                for (var i = 1; i < 6; i++) {
                    restDays.push(today.add(1, 'day').format('dddd D'));

                }
                break;
            case 'martes':
                for (var i = 1; i < 5; i++) {

                    let reply = {
                        "content_type": "text",
                        "title": today.add(1, 'day').format('dddd D'),
                        "payload": today.add(1, 'day').format('dddd D')
                    }
                    restDays.push(reply);
                }
                break;
            case 'miercoles':
                for (var i = 1; i < 4; i++) {
                    restDays.push(today.add(1, 'day').format('dddd D'));

                }
                break;
            case 'jueves':
                for (var i = 1; i < 3; i++) {
                    restDays.push(today.add(1, 'day').format('dddd D'));

                }
                break;
            case 'viernes':
                for (var i = 1; i < 2; i++) {
                    restDays.push(today.add(1, 'day').format('dddd D'));

                }
                break;
            case 'sabado':
                for (var i = 1; i < 1; i++) {
                    restDays.push(today.add(1, 'day').format('dddd D'));

                }
                break;
            case 'domingo':
                for (var i = 1; i <= 6; i++) {
                    restDays.push(today.add(1, 'day').format('dddd D'));

                }
                break;
        }
    } else {
        //añadir desde el dia siguiente a hoy
        //console.log('No hay chance. venga mañana\n');

        //switch (today.format('dddd')) {

    }

    //return today.format('dddd');
    return restDays;

}

module.exports = {
    DiasDisponibles
}