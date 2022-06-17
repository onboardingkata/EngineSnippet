const mongoClient = require("mongodb").MongoClient;
let connectionString = ""; //cadena de conexion a mongo

const DEFINITION_ID = ""; //Identificador de la definición que se desea obtener
const ESQUEMA_VERSION = "" //version de la definición que se desea obtener

const INSTANCIA_ID=""; //instancia que se desea actualizar
const DB_NAME = ""; //Nombre de la base de datos de mongo db

const ID_CONTENEDOR_ACTUALIZAR = ""; //contenedor que vamos a leer para obtener el custom status

mongoClient.connect(
    connectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    function (error, dbClient) {
        if (error) {
            console.log(error);
        } else {
            //conectobien
            let definitions = dbClient.db(DB_NAME).collection("definitions");

            let instances = dbClient.db(DB_NAME).collection("instances");

            (async () => {
                let definitionValues = await definitions.findOne({ "schemaId.id": DEFINITION_ID, "schemaId.version": ESQUEMA_VERSION })
                let containerDefinition = definitionValues.containers[ID_CONTENEDOR_ACTUALIZAR];
                
                let instancia = await instances.findOne({"documentId":INSTANCIA_ID});

                instancia.containers[ID_CONTENEDOR_ACTUALIZAR].customStatusFunction = containerDefinition.customStatusFunction;


                const container = JSON.parse( `{ 
                    "containers.${ID_CONTENEDOR_ACTUALIZAR}": ${JSON.stringify(instancia.containers[ID_CONTENEDOR_ACTUALIZAR])}
                }`);

                const updateOptions = {
                    upsert: true
                };

                const updateStmnt = {
                    '$set': container
                };

                let resultUpdate = await instances.updateOne({"documentId":INSTANCIA_ID}, 
                updateStmnt, updateOptions);

                console.log(resultUpdate);

                console.log("Termino");

            })();
        }
    }
); 
