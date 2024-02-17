"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const api_apis = require("../../api/apis.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const userInfo = common_vendor.ref(null);
    const getUserInfo = async () => {
      let res = await api_apis.apiUserInfo();
      userInfo.value = res.data;
      console.log(userInfo.value);
    };
    getUserInfo();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.value
      }, userInfo.value ? {
        b: common_vendor.unref(utils_system.getNavBarHeight)() + "px",
        c: common_vendor.t(userInfo.value.IP),
        d: common_vendor.t(userInfo.value.address.province),
        e: common_vendor.p({
          type: "download-filled",
          size: "20"
        }),
        f: common_vendor.t(userInfo.value.downloadSize),
        g: common_vendor.p({
          type: "right",
          size: "15"
        }),
        h: common_vendor.p({
          type: "star-filled",
          size: "20"
        }),
        i: common_vendor.t(userInfo.value.scoreSize),
        j: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        k: common_vendor.p({
          type: "chatboxes-filled",
          size: "20"
        }),
        l: common_vendor.p({
          type: "notification-filled",
          size: "20",
          color: "#28b389"
        }),
        m: common_vendor.p({
          type: "flag-filled",
          size: "20"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "D:/uni-app项目/虾米壁纸/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
