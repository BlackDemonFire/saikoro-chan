const randomorg = require("random-org")
const random = new randomorg({apiKey: "f7f6dd2c-9fcc-4ca2-b1b3-a825abcb13ad"})
class FakeRandom {
  constructor () {}
  int (min, max) {
    return Math.floor(Math.random()*(max-min+1))+min;
  }
  choice (options) {
    if (!options) return null;
    if (!options instanceof Array) return options
    if (options.length==1) return options[0]
    const res = this.int(0,options.length-1)
    return options[res]
  }
}
class Random {
  constructor (apiKey) {
    this.api = new randomorg({apiKey: apiKey})
  }
  async int (min, max)  {
    const result = await this.api.generateIntegers({min:min,max:max,n:1})
    return result.data[0]
  }
  async choice (options) {
    if (!options) return null;
    if (!options instanceof Array) return options
    if (options.length==1) return options[0]
    const res = await this.int(0,options.length-1)
    return options[res]
  }
}
module.exports = (client) => {
  if (client.config.randomAPIKey) {
    client.random = new Random(client.config.randomAPIKey)
  } else {
    client.random = new FakeRandom()
  }
}