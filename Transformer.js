const _ = require("lodash");
const CountryResponse = require("./data/Countries");

class Transformer {
  getCountries() {
    const countries = Object.keys(_.groupBy(CountryResponse.data.countries.items, "country"));
    const values = CountryResponse.data.countries.items;
    console.log(`xxl-countries: ${countries}`);
    console.log(`xxl-values: ${JSON.stringify(values)}`);

    const result = [];
    let bb = "";
    countries.forEach((country) => {
      const temp = values.filter((value) => {
          return value.country === country;
        }).map((value) => {
          return value.city;
        }).join(', ');
      console.log(`xxl-tmp: ${temp}`);
      if (country !== 'AA') {
        result.push({[country] : temp});
      } else {
        bb = temp;
      }
    });

    // solution one:
    // const secLevel = [];
    // let aa = "";
    // _.transform(result, function(result, value, key) {
    //   if ( key !== 'AA') {
    //     secLevel.push({[key]: value});
    //   } else {
    //     aa = value;
    //   }
    // });

    console.log(`xxl-result: ${JSON.stringify(result)}`);
    const transformed = {ua: bb, intt: result};
    console.log(`xxl-transformed: ${JSON.stringify(transformed)}`)
  }
}

module.exports = {
  Transformer
};