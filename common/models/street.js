'use strict';

module.exports = function (Street) {

  
  Street.validatesInclusionOf('status', {
    in: ['active', 'deactive']
  });
};
