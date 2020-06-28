'use strict';

module.exports = function (app) {
  var Admin = app.models.Admin;
  var Role = app.models.Role
  var RoleMapping = app.models.RoleMapping;
  var AccessToken = app.models.AccessToken;
  var MultiAccessToken = app.models.MultiAccessToken;
  var ACL = app.models.ACL;
  var User = app.models.User;
  var Media = app.models.Media;
  var City = app.models.City;
  var Location = app.models.Location;
  var Sublocation = app.models.Sublocation;
  var Street = app.models.Street;
  var Royalty = app.models.Royalty;
  var Item = app.models.Item;
  var imagesRoyalty = app.models.imagesRoyalty;

  
  var adminData = [{
    "email": "admin@akarat.com",
    "password": "password",
    username: "admin",
    emailVerified: true
  }]

  var roleData = [{
    name: "super-admin",
    description: "admin of system"
  }, {
    name: "admin-office",
    description: "Admin Office"
  }]






  function customdAutoUpload(database, databaseName, data) {
    return new Promise(resolve => {
      var mysqlDs = app.dataSources.mainDB;
      mysqlDs.autoupdate(databaseName, function (err) {
        if (err) resolve(err);
        console.log('\nAutoupdated table `' + databaseName + '`.');
        database.find({}, function (err, db) {
          if (err) resolve(err);
          if (db.length != 0) {
            console.log('\n`' + databaseName + '` has ' + db.length + ' rows.');
            resolve();
          } else {
            database.create(data, function (err, data) {
              if (err) resolve(err);
              console.log('\nCreate Dat To `' + databaseName + ' , ' + data.length + ' rows `.');
              resolve();
            })
          }
        })
      })
    })
  }

  function addRoleToadmin() {
    return new Promise(resolve => {
      Admin.find({
        "where": {
          "email": "admin@akarat.com"
        }
      }, function (err, admin) {
        if (err) resolve(err)
        Role.find({
          "where": {
            "name": 'super-admin'
          }
        }, function (err, role) {
          if (err) resolve(err)
          RoleMapping.find({
            "where": {
              "principalId": admin[0].id
            }
          }, function (err, rolemappings) {
            if (err) resolve(err)
            if (rolemappings.length == 0) {
              RoleMapping.create({
                "principalType": "admin",
                "principalId": admin[0].id,
                "roleId": role[0].id
              }, function (err, rolemapping) {
                if (err) resolve(err)
                console.log("create rolemapping to admin")
                resolve()
              })
            } else {
              resolve()
            }
          })
        })

      })
    })
  }


  async function init() {
    await customdAutoUpload(Admin, 'admin', adminData);
    await customdAutoUpload(Role, 'Role', roleData);
    await customdAutoUpload(RoleMapping, 'RoleMapping', []);
    await addRoleToadmin();
    await customdAutoUpload(AccessToken, 'AccessToken', []);
    await customdAutoUpload(MultiAccessToken, 'MultiAccessToken', []);
    await customdAutoUpload(ACL, 'ACL', []);
    await customdAutoUpload(User, 'user', []);
    await customdAutoUpload(Media, 'media', []);
    await customdAutoUpload(City, 'city', []);
    await customdAutoUpload(Location, 'location', []);
    await customdAutoUpload(Sublocation, 'sublocation', []);
    await customdAutoUpload(Street, 'street', []);
    
    await customdAutoUpload(Royalty, 'royalty', []);
    await customdAutoUpload(Item, 'item', []);
    await customdAutoUpload(imagesRoyalty, 'imagesRoyalty', []);
    
    
  }

  init()

};
