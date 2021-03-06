'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = exports.baseUrl = undefined;

var _middlewares = require('../../middlewares');

var _controller = require('./controller');

const baseUrl = exports.baseUrl = '/api/content';

const routes = exports.routes = [{
  method: 'GET',
  route: '/category',
  handlers: [_controller.contentCategory]
}, {
  method: 'GET',
  route: '/download/image',
  handlers: [_middlewares.isAuthenticated, _controller.ContentDownLoadImage]
}, {
  method: 'GET',
  route: '/download/video',
  handlers: [_middlewares.isAuthenticated, _controller.ContentDownLoadVideo]
}, {
  method: 'GET',
  route: '/download/:id',
  handlers: [_middlewares.isAuthenticated, _controller.ContentDownLoad]
}, {
  method: 'GET',
  route: '/category/:filter',
  handlers: [_controller.filterContent]
}, {
  method: 'GET',
  route: '/user/:user',
  handlers: [_controller.userContent]
}, {
  method: 'GET',
  route: '/my',
  handlers: [_middlewares.isAuthenticated, _controller.myContent]
}, {
  method: 'GET',
  route: '/video',
  handlers: [_controller.contentAllVideos]
}, {
  method: 'GET',
  route: '/video/:category',
  handlers: [_controller.VideosWithCat]
}, {
  method: 'GET',
  route: '/image',
  handlers: [_controller.contentAllImages]
}, {
  method: 'GET',
  route: '/image/:category',
  handlers: [_controller.ImageWithCat]
}, {
  method: 'GET',
  route: '/',
  handlers: [_controller.contentAll]
}, {
  method: 'GET',
  route: '/:id',
  handlers: [_controller.contentSingle]
}, {
  method: 'PUT',
  route: '/:id',
  handlers: [_middlewares.isAuthenticated, _controller.contentUpdate]
}, {
  method: 'PUT',
  route: '/public/:id',
  handlers: [_controller.UpdateViews]
}, {
  method: 'DELETE',
  route: '/:id',
  handlers: [_middlewares.isAuthenticated, _controller.contentDelete]
}, {
  method: 'POST',
  route: '/',
  handlers: [_middlewares.isAuthenticated, _controller.contentCreate]
}];