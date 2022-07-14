"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warn = exports.merge = exports.isUndefined = exports.isString = exports.isPromise = exports.isObject = exports.info = exports.error = exports.combineMerge = exports.assert = void 0;

var _deepmerge = _interopRequireDefault(require("deepmerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const merge = _deepmerge.default;
exports.merge = merge;

const combineMerge = (target, source, options) => {
  const emptyTarget = value => Array.isArray(value) ? [] : {};

  const clone = (value, options) => merge(emptyTarget(value), value, options);

  const destination = target.slice();
  source.forEach(function (e, i) {
    if (typeof destination[i] === "undefined") {
      const cloneRequested = options.clone !== false;
      const shouldClone = cloneRequested && options.isMergeableObject(e);
      destination[i] = shouldClone ? clone(e, options) : e;
    } else if (options.isMergeableObject(e)) {
      destination[i] = merge(target[i], e, options);
    } else if (target.indexOf(e) === -1) {
      destination.push(e);
    }
  });
  return destination;
};

exports.combineMerge = combineMerge;

const isUndefined = val => {
  return typeof val === 'undefined';
};

exports.isUndefined = isUndefined;

const isObject = obj => {
  return obj !== null && typeof obj === 'object';
};

exports.isObject = isObject;

const isString = obj => {
  return typeof obj === 'string';
};

exports.isString = isString;

const isPromise = val => {
  return val && typeof val.then === 'function';
};

exports.isPromise = isPromise;

const info = (message, ...args) => {
  (console.info || console.log)('[vuexBridge]', message, ...args);
};

exports.info = info;

const warn = (message, ...args) => {
  (console.warn || console.log)('[vuexBridge]', message, ...args);
};

exports.warn = warn;

const assert = (condition, msg) => {
  if (!condition) error(msg);
};

exports.assert = assert;

const error = msg => {
  throw new Error("[vuexBridge] " + msg);
};

exports.error = error;