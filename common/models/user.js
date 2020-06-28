'use strict';

module.exports = function (User) {


  User.validatesUniquenessOf('email', {
    message: 'email is not unique'
  });

  User.afterRemote('create', function (context, result, next) {
    const user = context.res.locals.user;
    console.log(result.id)
    User.app.models.RoleMapping.create({
      "principalType": "user",
      "principalId": result.id,
      "roleId": 1
    }, function (err, rolemapping) {
      if (err) next(err)
      console.log("create rolemapping to admin")
      next();
    })
  });
};
