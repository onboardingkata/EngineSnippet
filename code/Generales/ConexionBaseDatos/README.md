# Funciones para conexion a una base de datos SQL

El archivo [ConexionBaseDatos.cs](ConexionBaseDatos.cs) cuenta con las funciones necesarias para realizar una conexion a la base de datos y ejecutar una consulta.

La forma de utilizarla es la siguiente:

```
public static AsignacionCatalogosBD ObtenerAsignacionPorId(int id) {
    AsignacionCatalogosBD respuesta = null;
    try {
        var parametros = new List < IDataParameter > ();
        using(var conexion = new AccesoBD(Configuraciones.BaseDatosMiddlewareFF())) {
            StringBuilder sql = new StringBuilder();
            sql.Append(CreaComandoSelect());
            sql.Append("WHERE ");
            sql.Append("ASIGNACION_CATALOGOS.SECUENCIAL = @SECUENCIAL");
            parametros.Add(new SqlParameter("@SECUENCIAL", id));
            using(IDataReader resultado = conexion.EjecutarReaderSQL(sql.ToString(), parametros.ToArray())) {
                if (resultado.Read()) {
                    respuesta = CrearObjetoDesdeReader(resultado);
                } else {
                    throw new Exception("No existe Respuesta de catalogos con el Id proporcionado");
                }
            }
        }

    } catch (Exception ex) {
        ExcepcionDALC.ManejarExcepcionDALC(ex);
        throw;
    }

    return respuesta;
}
```


Autor: Jorge Barajas Estrada