"use strict";
const common_vendor = require("../common/vendor.js");
const SYSTEM_INFO = common_vendor.index.getSystemInfoSync();
const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 15;
const getTitleBarHeight = () => {
  if (common_vendor.index.getMenuButtonBoundingClientRect) {
    const { top, height } = common_vendor.index.getMenuButtonBoundingClientRect();
    return height + (top - getStatusBarHeight()) * 2;
  } else {
    return 40;
  }
};
const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight();
const getLeftIconLeft = () => {
  return 0;
};
exports.getLeftIconLeft = getLeftIconLeft;
exports.getNavBarHeight = getNavBarHeight;
exports.getStatusBarHeight = getStatusBarHeight;
exports.getTitleBarHeight = getTitleBarHeight;
