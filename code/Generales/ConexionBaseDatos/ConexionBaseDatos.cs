 /// <summary>
    /// Enum que indica el SMDB para establecer la conexión.
    /// </summary>
    public enum TipoBaseDatos
    {
        SQLServer = 1
    }

    /// <summary>
    /// Clase que maneja la conexión a bas de datos de las aplicaciones de Middleware
    /// </summary>
    public class AccesoBD : IDisposable
    {
        /// <summary>
        /// Objeto que contiene la conexion a la base de datos.
        /// </summary>
        protected DbConnection conexion;

        /// <summary>
        /// Provider de la base de datos a la que se conectará.
        /// </summary>
        private TipoBaseDatos tipoProveedorBD;

        /// <summary>
        /// Conexion utilizada.
        /// </summary>
        public DbConnection Conexion => this.conexion;

        /// <summary>
        /// Constructor, inicializa una nueva instancia de la clase.
        /// </summary>
        /// <param name="cadenaConexion">cadena de conexión para establecer comunicación a la base de datos.</param>
        public AccesoBD(string cadenaConexion)
        {
            if (string.IsNullOrEmpty(cadenaConexion.Trim()))
            {
                throw new ArgumentException("No se especificó la cadena de conexión", "string cadenaConexion");
            }

            this.tipoProveedorBD = TipoBaseDatos.SQLServer;

            GeneraConexion(cadenaConexion);
        }

        /// <summary>
        /// Establece la conexión a la base de datos.
        /// </summary>
        /// <param name="cadenaConexion"></param>
        private void GeneraConexion(string cadenaConexion)
        {
            ObtenerConexionPorTipo();
            this.conexion.ConnectionString = cadenaConexion;
        }

        /// <summary>
        /// Obtiene el nombre del proveedor de acuerdo al tipo de base de datos
        /// </summary>
        /// <returns></returns>
        private string ObtenerNombreProveedor()
        {
            string nombreProveedor = "";

            switch (this.tipoProveedorBD)
            {
                case TipoBaseDatos.SQLServer:
                default:
                    nombreProveedor = "System.Data.SqlClient";
                    break;
            }

            return nombreProveedor;
        }

        /// <summary>
        /// Genera el tipo de conexión a la base de datos.
        /// </summary>
        private void ObtenerConexionPorTipo()
        {
            switch (this.tipoProveedorBD)
            {
                case TipoBaseDatos.SQLServer:

                default:
                    DbProviderFactory factory = DbProviderFactories.GetFactory(ObtenerNombreProveedor());
                    this.conexion = factory.CreateConnection();
                    break;
            }
        }

        /// <summary>
        /// Crea un objeto Command
        /// </summary>
        /// <param name="commandText">Nombre del stored procedure o sentencia SQL a ejecutar.</param>
        /// <param name="commandType">Tipo de comando a ejecutar.</param>
        /// <param name="parameters">Lista de parámetros para la sentencia.</param>
        /// <returns>Un objeto Command</returns>
        private IDbCommand PrepararComando(string commandText, CommandType commandType, IDataParameter[] parameters)
        {
            IDbCommand comando = conexion.CreateCommand();
            comando.CommandText = commandText;
            comando.CommandType = commandType;

            if (parameters != null)
            {
                foreach (IDataParameter parametro in parameters)
                {
                    comando.Parameters.Add(parametro);
                }
            }

            return comando;
        }

        /// <summary>
        /// Recupera datos de una BD con base en una sentencia SQL.
        /// </summary>
        /// <param name="sql">Sentencia SQL  a ejecutar.</param>
        /// <param name="tipo">Tipo de comando a ejecutar.</param>
        /// <param name="parametros">Lista de parámetros.</param>
        /// <returns>Objeto reader con los datos recuperados.</returns>
        public IDataReader EjecutarReaderSQL(string sql, CommandType tipo, IDataParameter[] parametros)
        {
            if (string.IsNullOrEmpty(sql))
            {
                throw new ArgumentException("No se especificó la sentencia SQL", "string sql");
            }

            IDataReader resultado = null;

            if (this.conexion.State == ConnectionState.Closed)
            {
                this.conexion.Open();
            }

            using (IDbCommand comando = PrepararComando(sql, tipo, parametros))
            {
                resultado = comando.ExecuteReader(CommandBehavior.CloseConnection);
            }

            return resultado;
        }

        /// <summary>
        /// Recupera datos de una BD con base en una sentencia SQL.
        /// </summary>
        /// <param name="sql">Sentencia SQL  a ejecutar.</param>
        /// <param name="parametros">Lista de parámetros.</param>
        /// <returns>Objeto reader con los datos recuperados.</returns>
        public IDataReader EjecutarReaderSQL(string sql, IDataParameter[] parametros)
        {
            return EjecutarReaderSQL(sql, CommandType.Text, parametros);
        }

        /// <summary>
        /// Ejecuta una sentencia SQL que devuelve el número de filas afectadas (se utiliza generalmente para sentencias UPDATE y DELETE).
        /// </summary>
        /// <param name="sql">Sentencia SQL  a ejecutar.</param>
        /// <param name="tipo">Tipo de comando a ejecutar.</param>
        /// <param name="parametros">Lista de parámetros.</param>
        /// <returns>Int que indica las filas afectadas</returns>
        public int EjecutarSentenciaSQL(string sql, CommandType tipo, IDataParameter[] parametros)
        {
            if (string.IsNullOrEmpty(sql))
            {
                throw new ArgumentException("No se especificó comando SQL", "string sql");
            }

            int resultado = 0;

            if (this.conexion.State == ConnectionState.Closed)
            {
                this.conexion.Open();
            }

            using (IDbCommand comando = PrepararComando(sql, tipo, parametros))
            {
                resultado = comando.ExecuteNonQuery();
            }

            return resultado;
        }

        /// <summary>
        /// Ejecuta una sentencia SQL que devuelve el número de filas afectadas (se utiliza generalmente para sentencias UPDATE y DELETE).
        /// </summary>
        /// <param name="sql">Sentencia SQL  a ejecutar.</param>
        /// <param name="parametros">Lista de parámetros.</param>
        /// <returns>Int que indica las filas afectadas</returns>
        public int EjecutarSentenciaSQL(string sql, IDataParameter[] parametros)
        {
            return EjecutarSentenciaSQL(sql, CommandType.Text, parametros);
        }

        /// <summary>
        /// Ejecuta una sentencia SQL que devuelve un solo dato (se utiliza generalmente para sentencias INSERT).
        /// </summary>
        /// <param name="sql">Sentencia SQL  a ejecutar.</param>
        /// <param name="tipo">Tipo de comando a ejecutar.</param>
        /// <param name="parametros">Lista de parámetros.</param>
        /// <returns>Objeto con resultado de la ejecución</returns>
        public object EjecutarEscalarSQL(string sql, CommandType tipo, IDataParameter[] parametros)
        {
            if (string.IsNullOrEmpty(sql))
            {
                throw new ArgumentException("No se especificó comando SQL", "string sql");
            }

            object resultado = null;

            if (this.conexion.State == ConnectionState.Closed)
            {
                this.conexion.Open();
            }

            using (IDbCommand comando = PrepararComando(sql, tipo, parametros))
            {
                resultado = comando.ExecuteScalar();
            }

            return resultado;
        }

        /// <summary>
        /// Ejecuta una sentencia SQL que devuelve un solo dato (se utiliza generalmente para sentencias INSERT).
        /// </summary>
        /// <param name="sql">Sentencia SQL  a ejecutar.</param>
        /// <param name="parametros">Lista de parámetros.</param>
        /// <returns>Objeto con resultado de la ejecución</returns>
        public object EjecutarEscalarSQL(string sql, IDataParameter[] parametros)
        {
            return EjecutarEscalarSQL(sql, CommandType.Text, parametros);
        }

        /// <summary>
        /// Recupera datos de una BD con base en una sentencia SQL en formato XML.
        /// </summary>
        /// <param name="sql">Sentencia SQL  a ejecutar.</param>
        /// <param name="tipo">Tipo de comando a ejecutar.</param>
        /// <param name="parametros">Lista de parámetros.</param>
        /// <returns>Objeto reader con los datos recuperados.</returns>
        public XmlReader EjecutarXmlReaderSQL(string sql, CommandType tipo, IDataParameter[] parametros)
        {
            if (string.IsNullOrEmpty(sql))
            {
                throw new ArgumentException("No se especificó comando SQL", "string nombreSP");
            }

            XmlReader resultado = null;

            if (this.conexion.State == ConnectionState.Closed)
            {
                this.conexion.Open();
            }

            using (SqlCommand comando = (SqlCommand)PrepararComando(sql, tipo, parametros))
            {
                resultado = comando.ExecuteXmlReader();
            }

            return resultado;
        }

        /// <summary>
        /// Recupera datos de una BD con base en una sentencia SQL.
        /// </summary>
        /// <param name="sql">Sentencia SQL  a ejecutar.</param>
        /// <param name="tipo">Tipo de comando a ejecutar.</param>
        /// <param name="parametros">Lista de parámetros.</param>
        /// <returns>Objeto DataTable con los datos</returns>
        public DataTable ObtenerTablaReaderSQL(string sql, CommandType tipo, IDataParameter[] parametros)
        {
            IDataReader reader = EjecutarReaderSQL(sql, tipo, parametros);
            var table = new DataTable();
            table.Load(reader);
            return table;
        }

        /// <summary>
        /// Ejecuta un procedimiento almacenado para obtener datos.
        /// </summary>
        /// <param name="nombreSP">Nombre del stored procedure.</param>
        /// <param name="parametros">Lista de parámetros.</param>
        /// <returns>Objeto reader con los datos recuperados.</returns>
        public IDataReader EjecutarStoreProcedureRead(string nombreSP, IDataParameter[] parametros)
        {
            if (string.IsNullOrEmpty(nombreSP))
            {
                throw new ArgumentException("No se especificó el nombre del stored procedure", "string nombreSP");
            }
            return EjecutarReaderSQL(nombreSP, CommandType.StoredProcedure, parametros);
        }

        /// <summary>
        /// Ejecuta un procedimiento almacenado para obtener modificar datos (INSERT).
        /// </summary>
        /// <param name="nombreSP">Nombre del stored procedure.</param>
        /// <param name="parametros">Lista de parámetros.</param>
        /// <returns>Objeto con el resultado.</returns>
        public object EjecutarStoredProcedureCUD(string nombreSP, IDataParameter[] parametros)
        {
            if (string.IsNullOrEmpty(nombreSP))
            {
                throw new ArgumentException("No se especificó el nombre del stored procedure", "string nombreSP");
            }

            return EjecutarEscalarSQL(nombreSP, CommandType.StoredProcedure, parametros);
        }

        /// <summary>
        /// Ejecuta un procedimiento almacenado para obtener modificar datos (INSERT)
        /// </summary>
        /// <param name="nombreSP">Nombre del stored procedure.</param>
        /// <param name="parametros">Lista de parámetros.</param>
        /// <param name="transaccion">transacción activa dentro de la cual se ejecutará el stored procedure.</param>
        /// <returns></returns>
        public object EjecutarStoredProcedureCUDTransaccional(string nombreSP, IDataParameter[] parametros, DbTransaction transaccion)
        {
            if (string.IsNullOrEmpty(nombreSP))
            {
                throw new ArgumentException("No se especificó el nombre del stored procedure", "string nombreSP");
            }

            if (transaccion == null)
            {
                throw new ArgumentException("No se especificó la transaccion", "DbTransaction transaction");
            }

            object returnValue = null;

            if (this.conexion.State == ConnectionState.Closed)
            {
                this.conexion.Open();
            }

            using (IDbCommand comando = PrepararComando(nombreSP, CommandType.StoredProcedure, parametros))
            {
                comando.Transaction = transaccion;
                returnValue = comando.ExecuteScalar();
            }

            return returnValue;
        }

        /// <summary>
        /// Cierra la conexión a la base de datos.
        /// </summary>
        public void CerrarConexion()
        {
            if (this.conexion != null)
            {
                if (this.conexion.State == ConnectionState.Open)
                {
                    this.conexion.Close();
                }
            }
        }

        /// <summary>
        /// Libera los recursos
        /// </summary>
        public void Dispose()
        {
            CerrarConexion();
        }

    }