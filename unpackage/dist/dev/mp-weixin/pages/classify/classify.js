"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_theme_item2 = common_vendor.resolveComponent("theme-item");
  (_easycom_custom_nav_bar2 + _easycom_theme_item2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_theme_item = () => "../../components/theme-item/theme-item.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_theme_item)();
}
const _sfc_main = {
  __name: "classify",
  setup(__props) {
    const classifyList = common_vendor.ref([]);
    const getClassify = async () => {
      let res = await api_apis.apiGetClassify({
        pageSize: 15
      });
      classifyList.value = res.data;
    };
    getClassify();
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "咸虾米壁纸",
        path: "/pages/index/index"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "咸虾米壁纸"
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "分类"
        }),
        b: common_vendor.f(classifyList.value, (item, k0, i0) => {
          return {
            a: item._id,
            b: "6bcfa975-1-" + i0,
            c: common_vendor.p({
              item
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6bcfa975"], ["__file", "D:/uni-app项目/虾米壁纸/pages/classify/classify.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
