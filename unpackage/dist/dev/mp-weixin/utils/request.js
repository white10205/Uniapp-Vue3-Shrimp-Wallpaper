"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "https://tea.qingnian8.com/api/bizhi";
function request(config = {}) {
  let { url, method = "GET", header = {}, data = {} } = config;
  url = BASE_URL + url;
  header["access-key"] = "215808";
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url,
      method,
      header,
      data,
      success: (res) => {
        if (res.data.errCode === 0) {
          resolve(res.data);
        } else if (res.data.errCode === 400) {
          common_vendor.index.showModal({
            title: "错误提示",
            content: res.data.errMsg,
            showCancel: false
          });
          reject(res.data);
        } else {
          common_vendor.index.showToast({
            title: res.data.errMsg,
            icon: "none"
          });
          reject(res.data);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
exports.request = request;
