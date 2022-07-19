const { stubFalse } = require("lodash");

module.exports.cron = {
    myFirstJob: {
      schedule: '0 1 * * *',
      onTick: async function () {
        
      }
    }
  };