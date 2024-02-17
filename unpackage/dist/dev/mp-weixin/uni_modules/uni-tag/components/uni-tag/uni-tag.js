"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniTag",
  emits: ["click"],
  props: {
    type: {
      // 标签类型default、primary、success、warning、error、royal
      type: String,
      default: "default"
    },
    size: {
      // 标签大小 normal, small
      type: String,
      default: "normal"
    },
    // 标签内容
    text: {
      type: String,
      default: ""
    },
    disabled: {
      // 是否为禁用状态
      type: [Boolean, String],
      default: false
    },
    inverted: {
      // 是否为空心
      type: [Boolean, String],
      default: false
    },
    circle: {
      // 是否为圆角样式
      type: [Boolean, String],
      default: false
    },
    mark: {
      // 是否为标记样式
      type: [Boolean, String],
      default: false
    },
    customStyle: {
      type: String,
      default: ""
    }
  },
  computed: {
    classes() {
      const {
        type,
        disabled,
        inverted,
        circle,
        mark,
        size,
        isTrue
      } = this;
      const classArr = [
        "uni-tag--" + type,
        "uni-tag--" + size,
        isTrue(disabled) ? "uni-tag--disabled" : "",
        isTrue(inverted) ? "uni-tag--" + type + "--inverted" : "",
        isTrue(circle) ? "uni-tag--circle" : "",
        isTrue(mark) ? "uni-tag--mark" : "",
        // type === 'default' ? 'uni-tag--default' : 'uni-tag-text',
        isTrue(inverted) ? "uni-tag--inverted uni-tag-text--" + type : "",
        size === "small" ? "uni-tag-text--small" : ""
      ];
      return classArr.join(" ");
    }
  },
  methods: {
    isTrue(value) {
      return value === true || value === "true";
    },
    onClick() {
      if (this.isTrue(this.disabled))
        return;
      this.$emit("click");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.text
  }, $props.text ? {
    b: common_vendor.t($props.text),
    c: common_vendor.n($options.classes),
    d: common_vendor.s($props.customStyle),
    e: common_vendor.o((...args) => $options.onClick && $options.onClick(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1f94d070"], ["__file", "D:/uni-app项目/虾米壁纸/uni_modules/uni-tag/components/uni-tag/uni-tag.vue"]]);
wx.createComponent(Component);
