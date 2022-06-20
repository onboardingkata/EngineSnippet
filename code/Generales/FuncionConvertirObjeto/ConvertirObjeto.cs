//Esta función se utiliza para los DTO, pasar un objeto a otro que se utiliza para mostrar o enviar la información

using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MWFFComunes
{
    public class ConfiguracionMapper : Profile
    {
       
        public T2 RealizaMapper<T1, T2>(T1 origen)
        {
            //Initialize the mapper
            var config = new MapperConfiguration(cfg =>
            cfg.CreateMap<T1, T2>());

            //Using AutoMapper
            var mapper = new Mapper(config);
            var empMapper = mapper.DefaultContext.Mapper.Map<T1,T2>(origen);

            return empMapper;
        }
    }
}