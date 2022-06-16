//Descripcion: esta función quita los \ de los json convertidos en texto, para retornar un texto que pueda convertirse a json sin problema
function removeEscapeJson(textoRemover){
    if (textoRemover!==null && textoRemover!==undefined){
        let valorRetorno=null;
        const search = /\\/
        const replacer = new RegExp(search, 'g')



        valorRetorno = textoRemover.replace(replacer,"");
        console.log(valorRetorno);
        return valorRetorno
    }
    else{
        return textoRemover;
    }
}