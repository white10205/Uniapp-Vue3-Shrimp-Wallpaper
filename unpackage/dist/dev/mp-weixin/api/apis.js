"use strict";
const utils_request = require("../utils/request.js");
function apiGetBanner() {
  return utils_request.request({
    url: "/homeBanner"
  });
}
function apiGetRandom() {
  return utils_request.request({
    url: "/randomWall"
  });
}
function apiGetNotice(data = {}) {
  return utils_request.request({
    url: "/wallNewsList",
    data
  });
}
function apiGetClassify(data = {}) {
  return utils_request.request({
    url: "/classify",
    data
  });
}
function apiGetClassList(data = {}) {
  return utils_request.request({
    url: "/wallList",
    data
  });
}
function apiGetSetUpScore(data = {}) {
  return utils_request.request({
    url: "/setupScore",
    data
  });
}
function apiWriteDownload(data = {}) {
  return utils_request.request({
    url: "/downloadWall",
    data
  });
}
function apidetailWall(data = {}) {
  return utils_request.request({
    url: "/detailWall",
    data
  });
}
function apiUserInfo(data = {}) {
  return utils_request.request({
    url: "/userInfo",
    data
  });
}
exports.apiGetBanner = apiGetBanner;
exports.apiGetClassList = apiGetClassList;
exports.apiGetClassify = apiGetClassify;
exports.apiGetNotice = apiGetNotice;
exports.apiGetRandom = apiGetRandom;
exports.apiGetSetUpScore = apiGetSetUpScore;
exports.apiUserInfo = apiUserInfo;
exports.apiWriteDownload = apiWriteDownload;
exports.apidetailWall = apidetailWall;
