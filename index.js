
module.exports = process.env.EXPRESS_COV
  ? require('./lib-cov/devicestock')
  : require('./lib/devicestock');
