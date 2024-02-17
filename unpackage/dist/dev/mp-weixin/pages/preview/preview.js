"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const api_apis = require("../../api/apis.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const classList = common_vendor.ref([]);
    const currentIndex = common_vendor.ref(0);
    const currentId = common_vendor.ref(null);
    const storageClassList = common_vendor.index.getStorageSync("storageClassList") || [];
    const readImgs = common_vendor.ref([]);
    const currentInfo = common_vendor.ref(null);
    const isScore = common_vendor.ref(false);
    classList.value = storageClassList.map((item) => {
      return {
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
    const swiperChange = (e) => {
      currentIndex.value = e.detail.current;
      currentInfo.value = classList.value[currentIndex.value];
      readImgs.value.push(
        currentIndex.value,
        currentIndex.value <= 0 ? classList.value.length - 1 : currentIndex.value - 1,
        currentIndex.value === classList.value.length - 1 ? 0 : currentIndex.value + 1
      );
    };
    common_vendor.onLoad(async (e) => {
      currentId.value = e.id;
      if (e.type == "share") {
        let res = await api_apis.apidetailWall({ id: currentId.value });
        classList.value = res.data.map((item) => {
          return {
            ...item,
            picurl: item.smallPicurl.replace("_small.webp", ".jpg")
          };
        });
      }
      currentIndex.value = classList.value.findIndex(
        (item) => item._id === currentId.value
      );
      currentInfo.value = classList.value[currentIndex.value];
      console.log(classList.value);
      readImgs.value.push(
        currentIndex.value,
        currentIndex.value < 0 ? classList.value.length - 1 : currentIndex.value - 1,
        currentIndex.value === classList.value.length - 1 ? 0 : currentIndex.value + 1
      );
    });
    const userScore = common_vendor.ref(0);
    const maskState = common_vendor.ref(true);
    const maskChange = () => {
      maskState.value = !maskState.value;
    };
    const inforPopup = common_vendor.ref(null);
    const clickInfo = () => {
      inforPopup.value.open();
    };
    const clickInfoClose = () => {
      inforPopup.value.close();
    };
    const scorePopup = common_vendor.ref(null);
    const clickScore = () => {
      if (currentInfo.value.userScore) {
        isScore.value = true;
        userScore.value = currentInfo.value.userScore;
      }
      scorePopup.value.open();
    };
    const clickScoreClose = () => {
      scorePopup.value.close();
      userScore.value = 0;
      isScore.value = false;
    };
    const submitScore = async () => {
      let {
        classid,
        id: wallId
      } = currentInfo.value;
      let res = await api_apis.apiGetSetUpScore({
        classid,
        wallId,
        userScore: userScore.value
      });
      if (res.errCode === 0) {
        common_vendor.index.showToast({
          title: "评分成功",
          icon: "none"
        });
        classList.value[currentIndex.value].userScore = userScore.value;
        common_vendor.index.setStorageSync("storageClassList", classList.value);
        clickScoreClose();
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        success: () => {
        },
        fail: (err2) => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }
      });
    };
    const clickDownload = async () => {
      try {
        common_vendor.index.showLoading({
          title: "下载中....",
          mask: true
        });
        let {
          classid,
          _id: wallId
        } = currentInfo.value;
        let res = await api_apis.apiWriteDownload({
          classid: currentInfo,
          wallId
        });
        if (err.errCode !== 0)
          throw res;
        common_vendor.index.getImageInfo({
          src: currentInfo.value.picurl,
          success: (res2) => {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res2.path,
              success: () => {
                console.log(res2);
              },
              fail: (err2) => {
                if (err2.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                  common_vendor.index.showToast({
                    title: "保存失败，请重新点击下载",
                    icon: "none"
                  });
                  return;
                }
                common_vendor.index.showModal({
                  title: "提示",
                  content: "需要授权保存相册",
                  success: (res3) => {
                    if (res3.confirm) {
                      common_vendor.index.openSetting({
                        success(setting) {
                          if (setting.authSetting["scope.writePhotosAlbum"]) {
                            common_vendor.index.showToast({
                              title: "获取授权成功！",
                              icon: "none"
                            });
                          } else {
                            common_vendor.index.showToast({
                              title: "获取授权失败！",
                              icon: "none"
                            });
                          }
                        }
                      });
                    }
                  }
                });
              },
              complete: () => {
                common_vendor.index.hideLoading();
              }
            });
          }
        });
      } catch (err2) {
        console.log(err2);
        common_vendor.index.hideLoading();
      }
    };
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "咸虾米壁纸-",
        path: "/pages/preview/preview?id=" + currentId.value + "&type=share"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "咸虾米壁纸-",
        query: "id=" + currentId.value + "&type=share"
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: currentInfo.value
      }, currentInfo.value ? common_vendor.e({
        b: common_vendor.f(classList.value, (item, index, i0) => {
          return common_vendor.e({
            a: readImgs.value.includes(index)
          }, readImgs.value.includes(index) ? {
            b: common_vendor.o(maskChange, item._id),
            c: item.picurl
          } : {}, {
            d: item._id
          });
        }),
        c: currentIndex.value,
        d: common_vendor.o(swiperChange),
        e: maskState.value
      }, maskState.value ? {
        f: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        g: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        h: common_vendor.o(goBack),
        i: common_vendor.t(currentIndex.value + 1),
        j: common_vendor.t(classList.value.length),
        k: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        l: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月/dd日"
        }),
        m: common_vendor.p({
          type: "info",
          size: "28"
        }),
        n: common_vendor.o(clickInfo),
        o: common_vendor.p({
          type: "star",
          size: "28"
        }),
        p: common_vendor.t(currentInfo.value.score),
        q: common_vendor.o(clickScore),
        r: common_vendor.p({
          type: "download",
          size: "23"
        }),
        s: common_vendor.o(clickDownload)
      } : {}, {
        t: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        v: common_vendor.o(clickInfoClose),
        w: common_vendor.t(currentInfo.value._id),
        x: common_vendor.t(currentInfo.value.nickname),
        y: common_vendor.p({
          readonly: true,
          touchable: "false",
          value: currentInfo.value.score,
          size: "16"
        }),
        z: common_vendor.t(currentInfo.value.score),
        A: common_vendor.t(currentInfo.value.description),
        B: common_vendor.f(currentInfo.value.tabs, (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab),
            b: tab
          };
        }),
        C: common_vendor.sr(inforPopup, "2dad6c07-6", {
          "k": "inforPopup"
        }),
        D: common_vendor.p({
          type: "bottom"
        }),
        E: common_vendor.t(isScore.value ? "评分过了~" : "壁纸评分"),
        F: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        G: common_vendor.o(clickScoreClose),
        H: common_vendor.o(($event) => userScore.value = $event),
        I: common_vendor.p({
          allowHalf: true,
          modelValue: userScore.value
        }),
        J: common_vendor.t(userScore.value),
        K: common_vendor.o(submitScore),
        L: !userScore.value || isScore.value,
        M: common_vendor.sr(scorePopup, "2dad6c07-9", {
          "k": "scorePopup"
        }),
        N: common_vendor.p({
          ["is-mask-click"]: false
        })
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"], ["__file", "D:/uni-app项目/虾米壁纸/pages/preview/preview.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
