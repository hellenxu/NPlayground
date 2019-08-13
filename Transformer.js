const _ = require("lodash");
const CountryResponse = require("./data/Countries");

class Transformer {
  getCountries() {
    const countries = Object.keys(_.groupBy(CountryResponse.data.countries.items, "country"));
    const values = CountryResponse.data.countries.items;
    console.log(`xxl-countries: ${countries}`);
    console.log(`xxl-values: ${JSON.stringify(values)}`);

    const result = {};
    countries.forEach((country) => {
      const temp =
        values.filter((value) => {
          return value.country === country;
        }).map((value) => {
          return value.city;
        }).join(', ');
      console.log(`xxl-tmp: ${temp}`);
      result[country] = temp;
    });

    console.log(`xxl-result: ${JSON.stringify(result)}`);
  }
}

module.exports = {
  Transformer
};