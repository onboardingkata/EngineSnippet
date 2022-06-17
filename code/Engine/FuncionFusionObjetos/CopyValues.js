//Descripcion: La función copia los valores de un objeto a otro, permite hacer el merge de dos objetos depositando las propiedades de la fuente en el destino.
function copyValues(source, targetValues) {

    if (!source) {

        return targetValues;

    }
    const target = targetValues;
    Object.keys(source).forEach((property) => {
        if (Utils.isObject(source[property]) && !Utils.isArray(source[property])) {
            Object.keys(source[property]).forEach((subProperty) => {
                if (!target[property]) {
                    target[property] = {};
                }
                target[property][subProperty] = source[property][subProperty];
            });
        } else {
            target[property] = source[property];
        }
    });
    return target;

}