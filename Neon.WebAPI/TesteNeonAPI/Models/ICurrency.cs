using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TesteNeon_Flavio.Models
{
    public interface ICurrency
    {
        Currency currency { get; set; }
        bool TryParse(double value);
        Currency ConvertCurrencyFromAPI();
    }
}
