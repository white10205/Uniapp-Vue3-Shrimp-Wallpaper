"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "custom-nav-bar",
  props: {
    title: {
      type: String,
      default: "壁纸"
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        b: common_vendor.t(__props.title),
        c: common_vendor.p({
          type: "search",
          size: "18",
          color: "#888"
        }),
        d: common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        e: common_vendor.unref(utils_system.getLeftIconLeft)() + "px",
        f: common_vendor.unref(utils_system.getStatusBarHeight)() + common_vendor.unref(utils_system.getTitleBarHeight)() + "px"
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-412fc155"], ["__file", "D:/uni-app项目/虾米壁纸/components/custom-nav-bar/custom-nav-bar.vue"]]);
wx.createComponent(Component);
