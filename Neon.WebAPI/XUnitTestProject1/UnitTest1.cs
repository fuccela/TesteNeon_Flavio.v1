using System;
using Xunit;
using Moq;
using System.Diagnostics.CodeAnalysis;
using TesteNeon_Flavio.Models;
using System.Net.Http;
using Newtonsoft.Json;

namespace XUnitTestProject1
{
    public class UnitTest1
    {
        public static HttpClient client = new HttpClient();
        public const string baseUrl = "https://localhost:44383/api/currency";

        [Fact]
        public void PassingTest()
        {
            var currencies = new Mock<ICurrency>();

            var teste = client.GetStringAsync($"{baseUrl}/conversion?currencyFrom=CAD&currencyTo=EUR&amount=20");

            var result = JsonConvert.DeserializeObject<Currency>(teste.Result);

            currencies.Setup(currency => currency.TryParse(It.IsAny<double>())).Returns(true);

            var teste1 = currencies.Object;
        }
    }
}
