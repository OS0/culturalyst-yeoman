'use strict';

import {User} from '../../sqldb';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import stripe from '../../config/stripe'

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function() {
    res.status(statusCode).end();
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.findAll({
      attributes: [
        '_id',
        'name',
        'location',
        'birthday',
        'email',
        'role',
        'supporters',
        'budget',
        'earned',
        'provider'
      ]
    })
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(handleError(res));
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
  var newUser = User.build(req.body);
  newUser.setDataValue('provider', 'local');
  newUser.setDataValue('role', 'user');
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({_id: user._id}, config.secrets.session, {
        expiresInMinutes: 60 * 5
      });
      res.json({token: token});
    })
    .catch(validationError(res));
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;
  console.log(userId);
  User.find({
      where: {
        _id: userId
      }
    })
    .then(function(user) {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(function(err) {
      return next(err);
    });
};

exports.showResults = function(req, res, next) {
  var query;
  if (req.params.submedium !== 'undefined' && req.params.submedium !== 'null'){
    query = {submedium: req.params.submedium};
    console.log(req.params.submedium);
  } else {
    query = {medium: req.params.medium}
  }

  User.findAll({
      where: query
    })
    .then(function(users) {
      if (!users) {
        console.log('No users');
        return res.status(404).end();
      }
      var array = [];
      users.forEach(function(img){
        array.push(img);
      })
      res.json(array);

    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.destroy({_id: req.params.id})
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.find({
      where: {
        _id: userId
      }
    })
    .then(function(user) {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(function() {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
};

/**
 * Update the users information
 */
exports.updateUserInfo = function(req, res, next) {
  var userId = req.user._id;
  var name = req.body.name;
  var email = req.body.email;
  var location = req.body.location;

  User.find({
      where: {
        _id: userId
      }
    })
    .then(function(user) {
        user.name = name;
        user.email = email;
        user.location = location;
        return user.save()
          .then(function() {
            res.status(204).end();
          })
          .catch(validationError(res));
    });
};
exports.updateArtistContent = function(req, res, next) {
  console.log('this fired');
  var userId = req.user._id;
  var url = req.body.url;
  User.find({
      where: {
        _id: userId
      }
    })
    .then(function(user) {
        user.picUrl = url;
        return user.save()
          .then(function() {
            res.status(204).end();
          })
          .catch(validationError(res));
    });
};

exports.updateArtistCover = function(req, res, next) {
  console.log('this fired');
  var userId = req.user._id;
  var url = req.body.url;
  User.find({
      where: {
        _id: userId
      }
    })
    .then(function(user) {
        user.img = url;
        return user.save()
          .then(function() {
            res.status(204).end();
          })
          .catch(validationError(res));
    });
};

exports.updateArtistInfo = function(req, res, next) {
  var userId = req.user._id;
  var bio = req.body.bio;
  var medium = req.body.medium;
  var submedium = req.body.submedium;
  var reward = req.body.reward;

  User.find({
      where: {
        _id: userId
      }
    })
    .then(function(user) {
        user.role = "artist";
        user.short = bio;
        user.medium = medium;
        user.submedium = submedium;
        user.reward = reward;
        return user.save()
          .then(function() {
            res.status(204).end();
          })
          .catch(validationError(res));
    });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;

  User.find({
      where: {
        _id: userId
      },
      attributes: [
        '_id',
        'name',
        'location',
        'birthday',
        'email',
        'role',
        'picUrl',
        'img',
        'supporters',
        'budget',
        'earned',
        'provider'
      ]
    })
    .then(function(user) { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

//Artist Acct Registration
exports.registerdb = function(account, id){
  console.log('calling me')
  User.find({
      where: {
        _id: id
      }
    })
    .then(function(user) {
        user.account = JSON.stringify(account)
        return user.save()
          .then(function() {
            res.status(204).end();
          })
          .catch(validationError(res));
    });
}

exports.register = function(req,res){
  var userId = req.body._id
  var data = req.body.data
  data['tos_acceptance'].date = Math.floor(Date.now() / 1000);
  data['tos_acceptance'].ip = req.connection.remoteAddress;
  stripe.accounts.create(data)
    .then(function(acct){
      exports.registerdb(acct, userId);
    }).then(function() {
      res.status(204).end();
    })
}

//Subscribe Customer to monthly payments
exports.subscribe= function(req,res){
  var amount = req.body.amount
  var artistId = req.body._id
  //for subscriptions
  var recurring = req.body.recurring
  //find Artist by ID
  var feePercent = 30/(amount/100)

  User.find({
      where: {
        _id: artistId
      }
    })
    .then(function(user) {
      console.log('user: ', user)
      console.log('useracct: ', JSON.parse(user.dataValues.account))
      if(user){
        //if custID
        if(req.body.customer){
          //create charge
          stripe.customers.createSubscription(req.body.customer,
            {
              plan: 'user' + artistID + 'plan' + amount/100,
              application_fee_percent: 10.4 + feePercent
            }).then( function(charge){
              //store charge to db for user/artist dashboard
              console.log('charge: ', charge)
              res.status(204).end()
          }).catch(handleError(res))
        } else {
          //create cutomer from card token
          return stripe.customers.create({
            source: req.body.token
          }).then(function(customer){
            console.log('customer: ',customer)
            //create charge from cust id
            return stripe.customers.createSubscription(customer,
              {
                plan: 'user' + artistID + 'plan' + amount/100,
                application_fee_percent: 10.4 + feePercent
              }
            ).then(function(subscription){
              console.log('sub: ', subscription)
              //save charge to db for user/artist dashboard
              res.status(204).end()
            }).catch(handleError(res))
          })
        }
      } else {
        console.log('no user found bruh')

      }
    });
}

//One time charge to customer
exports.charge = function(req,res){
  var amount = req.body.amount
  var artistId = req.body._id
  //for subscriptions
  var recurring = req.body.recurring
  //find Artist by ID
  var fee = amount * 0.104 + 30
  console.log(fee)

  User.find({
      where: {
        _id: artistId
      }
    })
    .then(function(user) {
      console.log('user: ', user)
      console.log('useracct: ', JSON.parse(user.dataValues.account))
      if(user){
        //if custID
        if(req.body.customer){
          //create charge
          stripe.charges.create({
            amount: amount,
            currency: 'usd',
            customer: req.body.customer,
            destination: JSON.parse(user.dataValues.account).id,
            application_fee: fee
          }).then( function(charge){
              //store charge to db for user/artist dashboard
              console.log('charge: ', charge)
              res.status(204).end()
          }).catch(handleError(res))
        } else {
          //create cutomer from card token
          return stripe.customers.create({
            source: req.body.token
          }).then(function(customer){
            console.log('customer: ',customer)
            //create charge from cust id
            return stripe.charges.create({
              amount: amount,
              currency: 'usd',
              customer: customer.id,
              destination: JSON.parse(user.dataValues.account).id,
              application_fee: fee
            }).then(function(charge){
              console.log('charges: ', charge)
              //save charge to db for user/artist dashboard
              res.status(204).end()
            }).catch(handleError(res))
          })
        }
      } else {
        console.log('no user found bruh')

      }
    });
}
