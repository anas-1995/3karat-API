'use strict';

module.exports = function (Sublocation) {

  
  Sublocation.validatesInclusionOf('status', {
    in: ['active', 'deactive']
  });
};
