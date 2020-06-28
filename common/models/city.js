'use strict';

module.exports = function (City) {

  
  City.validatesInclusionOf('status', {
    in: ['active', 'deactive']
  });
};
