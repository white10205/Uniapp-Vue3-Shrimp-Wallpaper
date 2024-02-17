"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniRate",
  props: {
    isFill: {
      // 星星的类型，是否镂空
      type: [Boolean, String],
      default: true
    },
    color: {
      // 星星未选中的颜色
      type: String,
      default: "#ececec"
    },
    activeColor: {
      // 星星选中状态颜色
      type: String,
      default: "#ffca3e"
    },
    disabledColor: {
      // 星星禁用状态颜色
      type: String,
      default: "#c0c0c0"
    },
    size: {
      // 星星的大小
      type: [Number, String],
      default: 24
    },
    value: {
      // 当前评分
      type: [Number, String],
      default: 0
    },
    modelValue: {
      // 当前评分
      type: [Number, String],
      default: 0
    },
    max: {
      // 最大评分
      type: [Number, String],
      default: 5
    },
    margin: {
      // 星星的间距
      type: [Number, String],
      default: 0
    },
    disabled: {
      // 是否可点击
      type: [Boolean, String],
      default: false
    },
    readonly: {
      // 是否只读
      type: [Boolean, String],
      default: false
    },
    allowHalf: {
      // 是否显示半星
      type: [Boolean, String],
      default: false
    },
    touchable: {
      // 是否支持滑动手势
      type: [Boolean, String],
      default: true
    }
  },
  data() {
    return {
      valueSync: "",
      userMouseFristMove: true,
      userRated: false,
      userLastRate: 1
    };
  },
  watch: {
    value(newVal) {
      this.valueSync = Number(newVal);
    },
    modelValue(newVal) {
      this.valueSync = Number(newVal);
    }
  },
  computed: {
    stars() {
      const value = this.valueSync ? this.valueSync : 0;
      const starList = [];
      const floorValue = Math.floor(value);
      const ceilValue = Math.ceil(value);
      for (let i = 0; i < this.max; i++) {
        if (floorValue > i) {
          starList.push({
            activeWitch: "100%"
          });
        } else if (ceilValue - 1 === i) {
          starList.push({
            activeWitch: (value - floorValue) * 100 + "%"
          });
        } else {
          starList.push({
            activeWitch: "0"
          });
        }
      }
      return starList;
    },
    marginNumber() {
      return Number(this.margin);
    }
  },
  created() {
    this.valueSync = Number(this.value || this.modelValue);
    this._rateBoxLeft = 0;
    this._oldValue = null;
  },
  mounted() {
    setTimeout(() => {
      this._getSize();
    }, 100);
  },
  methods: {
    touchstart(e) {
      if (this.readonly || this.disabled)
        return;
      const {
        clientX,
        screenX
      } = e.changedTouches[0];
      this._getRateCount(clientX || screenX);
    },
    touchmove(e) {
      if (this.readonly || this.disabled || !this.touchable)
        return;
      const {
        clientX,
        screenX
      } = e.changedTouches[0];
      this._getRateCount(clientX || screenX);
    },
    /**
     * 兼容 PC @tian
     */
    mousedown(e) {
    },
    mousemove(e) {
    },
    mouseleave(e) {
    },
    /**
     * 获取星星个数
     */
    _getRateCount(clientX) {
      this._getSize();
      const size = Number(this.size);
      if (isNaN(size)) {
        return new Error("size 属性只能设置为数字");
      }
      const rateMoveRange = clientX - this._rateBoxLeft;
      let index = parseInt(rateMoveRange / (size + this.marginNumber));
      index = index < 0 ? 0 : index;
      index = index > this.max ? this.max : index;
      const range = parseInt(rateMoveRange - (size + this.marginNumber) * index);
      let value = 0;
      if (this._oldValue === index && !this.PC)
        return;
      this._oldValue = index;
      if (this.allowHalf) {
        if (range > size / 2) {
          value = index + 1;
        } else {
          value = index + 0.5;
        }
      } else {
        value = index + 1;
      }
      value = Math.max(0.5, Math.min(value, this.max));
      this.valueSync = value;
      this._onChange();
    },
    /**
     * 触发动态修改
     */
    _onChange() {
      this.$emit("input", this.valueSync);
      this.$emit("update:modelValue", this.valueSync);
      this.$emit("change", {
        value: this.valueSync
      });
    },
    /**
     * 获取星星距离屏幕左侧距离
     */
    _getSize() {
      common_vendor.index.createSelectorQuery().in(this).select(".uni-rate").boundingClientRect().exec((ret) => {
        if (ret) {
          this._rateBoxLeft = ret[0].left;
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.stars, (star, index, i0) => {
      return {
        a: "60a7da3f-0-" + i0,
        b: "60a7da3f-1-" + i0,
        c: star.activeWitch,
        d: index,
        e: common_vendor.o((...args) => $options.touchstart && $options.touchstart(...args), index),
        f: common_vendor.o((...args) => $options.touchmove && $options.touchmove(...args), index),
        g: common_vendor.o((...args) => $options.mousedown && $options.mousedown(...args), index),
        h: common_vendor.o((...args) => $options.mousemove && $options.mousemove(...args), index),
        i: common_vendor.o((...args) => $options.mouseleave && $options.mouseleave(...args), index)
      };
    }),
    b: common_vendor.p({
      color: $props.color,
      size: $props.size,
      type: $props.isFill ? "star-filled" : "star"
    }),
    c: common_vendor.p({
      color: $props.disabled ? $props.disabledColor : $props.activeColor,
      size: $props.size,
      type: "star-filled"
    }),
    d: $props.disabled ? 1 : "",
    e: $options.marginNumber + "px"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app项目/虾米壁纸/uni_modules/uni-rate/components/uni-rate/uni-rate.vue"]]);
wx.createComponent(Component);
