//Función:      calcularEdad
//Descripción:  Encargada de calcular la edad o lapso de tiempo entre una fecha y el dia actual
//Entradas:   
//fecha =>    campo de fecha a calcular la  edad
//Salida: si recibe fecha vacio retorna undefined o de lo contrario retorna la edad calculada

 function calcularEdad(fecha) {
        if (fecha === null || fecha === undefined || fecha === "") {
            return undefined;
        } else {
            let hoy = moment(new Date).toDate();

            let splitValue = fecha.split("/");
            let fechaCompare = `'${splitValue[2]}-${splitValue[1]}-${splitValue[0]}'`;

            var cumpleanos = new Date(fechaCompare);
            var edad = hoy.getFullYear() - cumpleanos.getFullYear();
            var m = hoy.getMonth() - cumpleanos.getMonth();

            if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
                edad--;
            }

            return edad;
        }
    }