using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TesteNeon_Flavio.Models;

namespace TesteNeon_Flavio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyController : ControllerBase
    {
        private const string currencyLayer = "http://apilayer.net/api/";
        private const string endpointLive = "live";
        private const string endpointList = "list";
        private const string currencyKey = "9cf4b5473164812d647b10de4bfd8e59";

        static HttpClient client = new HttpClient();
        static Currency currency;

        [HttpGet("Currencies")]
        public async Task<string> Currencies()
        {
            Dictionary<string, string> currencies = new Dictionary<string, string>();

            var HttpResponse = await client.GetAsync($"{currencyLayer}/{endpointList}?access_key={currencyKey}");

            if (HttpResponse.IsSuccessStatusCode)
            {
                currencies = JObject.Parse(await HttpResponse.Content.ReadAsStringAsync())["currencies"]
                    .ToObject<Dictionary<string, string>>();

                return JsonConvert.SerializeObject(currencies.ToList());
            }
            else
            {
                return "Ops! Something went wrong :(";
            }
        }
    
        // GET api/currency
        [HttpGet("Conversion")]
        public async Task<Currency> Conversion(string currencyfrom, string currencyto, double amount)
        {
            Dictionary<string, double> currencies = new Dictionary<string, double>();

            var httpResponse = await client.GetAsync($"{currencyLayer}/{endpointLive}?access_key={currencyKey}&currencies={currencyfrom},{currencyto}");

            if (httpResponse.IsSuccessStatusCode)
            {
                currencies = JObject.Parse(await httpResponse.Content.ReadAsStringAsync())["quotes"].ToObject<Dictionary<string, double>>();

                double moedaFrom = currencies[$"USD{currencyfrom}"];
                double moedaTo = currencies[$"USD{currencyto}"];

                currency = 
                    new Currency()
                    {
                        NameCurrency = $"{currencyfrom}{currencyto}",
                        ValueCurrency = CalculateDiference(moedaFrom, moedaTo, amount)
                    };
            }

            return currency;
        }

        public double CalculateDiference(double currencyFrom, double currencyTo, double amount)
        {
            double calculo = Math.Round(((double)(1 * amount) / currencyFrom) * currencyTo, 2);

            return calculo;
        }
    }
}
