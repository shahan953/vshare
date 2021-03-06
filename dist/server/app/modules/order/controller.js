'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderVideo = exports.OrderImage = exports.ContactUs = exports.OrderAll = exports.OrderCreate = exports.OrderSingle = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _order = require('./order.model');

var _user = require('../user/user.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let Order;
let OrderNew;
let mailOptions;
let Images;
let Videos;
// const { 0: secret } = config.get('secret');
const transporter = _nodemailer2.default.createTransport({
  service: 'gmail',
  auth: {
    user: _config2.default.get('nodemailer.user'),
    pass: _config2.default.get('nodemailer.pass')
  }
});

const OrderSingle = (() => {
  var _ref = _asyncToGenerator(function* (ctx) {
    try {
      Order = yield _order.OrderCrud.single({
        qr: { _id: ctx.params.id }
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = {
        Order
      };
    }
  });

  return function OrderSingle(_x) {
    return _ref.apply(this, arguments);
  };
})();

const OrderImage = (() => {
  var _ref2 = _asyncToGenerator(function* (ctx) {
    try {
      Images = yield _order.OrderCrud.get({
        qr: {
          owner: ctx.state.user.uid,
          contentType: 'Image'
        }
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = Images;
    }
  });

  return function OrderImage(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

const OrderVideo = (() => {
  var _ref3 = _asyncToGenerator(function* (ctx) {
    try {
      Videos = yield _order.OrderCrud.get({
        qr: {
          owner: ctx.state.user.uid,
          contentType: 'Video'
        }
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = Videos;
    }
  });

  return function OrderVideo(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

const ContactUs = (() => {
  var _ref4 = _asyncToGenerator(function* (ctx) {
    mailOptions = {
      from: ctx.request.body.email,
      to: 'applicationreact@gmail.com', // Admin Email Will Be Here
      subject: `${ctx.request.body.name} want a custom video`,
      text: `
      Name: ${ctx.request.body.firstname} ${ctx.request.body.firstname} Send a message\n
      Email: ${ctx.request.body.email}\n
      Phone: ${ctx.request.body.phone}\n
      ${ctx.request.body.description}
    `
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
    ctx.body = {
      status: 200,
      message: 'Successfully Sent'
    };
  });

  return function ContactUs(_x4) {
    return _ref4.apply(this, arguments);
  };
})();

const OrderCreate = (() => {
  var _ref5 = _asyncToGenerator(function* (ctx) {
    const OrderData = _extends({
      owner: ctx.state.user.uid
    }, ctx.request.body);
    try {
      OrderNew = yield _order.OrderCrud.create(OrderData);
    } catch (e) {
      ctx.throw(422, e.message);
    } finally {
      mailOptions = {
        from: ctx.request.body.email,
        to: 'applicationreact@gmail.com', // Admin Email Will Be Here
        subject: `${ctx.request.body.name} want a custom video`,
        text: ctx.request.body.description
      };
      try {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log(`Email sent: ${info.response}`);
          }
        });
      } catch (e) {
        console.log('cannot send email');
      }
      ctx.body = {
        body: OrderNew,
        message: 'SuccesFully Add new Order'
      };
    }
  });

  return function OrderCreate(_x5) {
    return _ref5.apply(this, arguments);
  };
})();

const OrderAll = (() => {
  var _ref6 = _asyncToGenerator(function* (ctx) {
    let getOrders;
    let user;
    try {
      user = yield _user.userCrud.single({
        qr: { _id: ctx.state.user.uid }
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      if (user.acc_type === 'admin') {
        getOrders = yield _order.OrderCrud.get();
      }
      ctx.body = getOrders;
    }
  });

  return function OrderAll(_x6) {
    return _ref6.apply(this, arguments);
  };
})();

exports.OrderSingle = OrderSingle;
exports.OrderCreate = OrderCreate;
exports.OrderAll = OrderAll;
exports.ContactUs = ContactUs;
exports.OrderImage = OrderImage;
exports.OrderVideo = OrderVideo;