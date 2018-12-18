using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TesteNeon_Flavio.Models
{
    public class FakeCurrency : ICurrency
    {
        public double CurrencyValor;

        public Currency currency { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public Currency ConvertCurrencyFromAPI()
        {
            throw new NotImplementedException();
        }

        public bool TryParse(double value)
        {
            throw new NotImplementedException();
        }
    }
}
