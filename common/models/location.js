'use strict';

module.exports = function (Location) {

  
  Location.validatesInclusionOf('status', {
    in: ['active', 'deactive']
  });
};
