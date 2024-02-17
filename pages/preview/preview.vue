<template>
  <view class="preview" v-if="currentInfo">
    <swiper circular :current="currentIndex" @change="swiperChange" >
      <swiper-item v-for="(item,index) in classList" :key="item._id">
        <image v-if="readImgs.includes(index)" @click="maskChange" :src="item.picurl" mode="aspectFill"></image>
      </swiper-item>
    </swiper>
    <view class="mask" v-if="maskState">
      <view class="goBack" :style="{top: getStatusBarHeight() + 'px'}" @click="goBack">
        <uni-icons type="back" color="#fff" size="20"></uni-icons>
      </view>
      <view class="count">
        {{currentIndex + 1}} / {{classList.length}}
      </view>
      <view class="time">
        <uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
      </view>
      <view class="date">
        <uni-dateformat :date="new Date()" format="MM月/dd日"></uni-dateformat>
      </view>
      <view class="footer" >
        <view class="box" @click="clickInfo">
          <uni-icons type="info" size="28"></uni-icons>
          <view class="text">
            信息
          </view>
        </view>

        <view class="box" @click="clickScore">
          <uni-icons type="star" size="28"></uni-icons>
          <view class="text">
            {{currentInfo.score}}分
          </view>
        </view>

        <view class="box" @click="clickDownload">
          <uni-icons type="download" size="23"></uni-icons>
          <view class="text">
            下载
          </view>
        </view>
      </view>
    </view>
    <uni-popup ref="inforPopup" type="bottom">
      <view class="infoPopup">
        <view class="popHeader">
          <view></view>
          <view class="title">
            壁纸信息
          </view>
          <view class="close" @click="clickInfoClose">
            <uni-icons type="closeempty" size="18" color="#999"></uni-icons>
          </view>
        </view>
        <scroll-view scroll-y>
          <view class="content">
            <view class="row">
              <text class="label">
                壁纸ID：
              </text>
              <view selectable class="value">{{currentInfo._id}}</view>
            </view>

            <view class="row">
              <text class="label">
                分类：
              </text>
              <view selectable class="value class">明星美女</view>
            </view>

            <view class="row">
              <text class="label">
                发布者：
              </text>
              <view selectable class="value">{{currentInfo.nickname}}</view>
            </view>

            <view class="row">
              <text class="label">
                评分：
              </text>
              <view selectable class="value roteBox">
                <uni-rate readonly touchable="false" :value="currentInfo.score" size="16" />
                <view class="score">
                  {{currentInfo.score}}分
                </view>
              </view>
            </view>

            <view class="row">
              <text class="label">
                摘要：
              </text>
              <view selectable class="value">{{currentInfo.description}}</view>
            </view>

            <view class="row">
              <text class="label">
                标签：
              </text>
              <view selectable class="value tabs">
                <view class="tab" v-for="tab in currentInfo.tabs" :key="tab">
                  {{tab}}
                </view>
              </view>
              
            </view>
            <view class="safe-area-inset-bottom">
              
            </view>
          </view>
        </scroll-view>
      </view>
    </uni-popup>
    <uni-popup ref="scorePopup" :is-mask-click="false">
      <view class="scorePopup">
        <view class="popHeader">
          <view></view>
          <view class="title">
            {{isScore? '评分过了~':'壁纸评分'}}
          </view>
          <view class="close" @click="clickScoreClose">
            <uni-icons type="closeempty" size="18" color="#999"></uni-icons>
          </view>
        </view>

        <view class="content">
          <uni-rate v-model="userScore" allowHalf />
          <text class="text">{{userScore}}分</text>
        </view>

        <view class="footer">
          <button @click="submitScore" type="default" size="mini" plain :disabled="!userScore || isScore">确认评分</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue';
  import {
    getStatusBarHeight
  } from '@/utils/system.js'
  import {
    apiGetSetUpScore,
    apiWriteDownload,
    apidetailWall
  } from '@/api/apis.js'
  import {
    onLoad,onShareAppMessage,onShareTimeline
  } from '@dcloudio/uni-app'
  
  //预览页面数组
  const classList = ref([])
  //当前索引值
  const currentIndex = ref(0)
  //当前Id
  const currentId = ref(null)
  //从缓存中获取图片
  const storageClassList = uni.getStorageSync('storageClassList') || []
  //保存看过的图片
  const readImgs = ref([])
  //保存当前壁纸信息
  const currentInfo = ref(null)
  //是否有评分
  const isScore = ref(false)
  //处理图片，变为大图
  classList.value = storageClassList.map(item => {
    return {
      ...item,
      picurl: item.smallPicurl.replace("_small.webp", ".jpg")
    }
  })

  //轮播图滑动当前索引值改变
  const swiperChange = (e) => {
    currentIndex.value = e.detail.current
    currentInfo.value = classList.value[currentIndex.value]
    readImgs.value.push(currentIndex.value,
      currentIndex.value <= 0 ? classList.value.length - 1 : currentIndex.value - 1,
      currentIndex.value === classList.value.length - 1 ? 0 : currentIndex.value + 1,
    )
  }
  onLoad(async (e) => {
    currentId.value = e.id
    if(e.type == 'share'){
     let res = await apidetailWall({id:currentId.value})
     classList.value = res.data.map(item =>{
       return {
         ...item,
         picurl: item.smallPicurl.replace("_small.webp", ".jpg")
       }
     })
    }
    currentIndex.value = classList.value.findIndex((item) =>
      item._id === currentId.value
    )
    currentInfo.value = classList.value[currentIndex.value]
    console.log(classList.value);
    readImgs.value.push(currentIndex.value,
      currentIndex.value < 0 ? classList.value.length - 1 : currentIndex.value - 1,
      currentIndex.value === classList.value.length - 1 ? 0 : currentIndex.value + 1,
    )
  })

  //用户评分
  const userScore = ref(0)

  //遮罩层状态
  const maskState = ref(true)
  //改变遮罩层状态
  const maskChange = () => {
    maskState.value = !maskState.value
  }

  const inforPopup = ref(null)
  //点击信息按钮
  const clickInfo = () => {
    inforPopup.value.open()
  }

  //点击关闭信息弹窗
  const clickInfoClose = () => {
    inforPopup.value.close()
  }

  // 评分弹窗状态
  const scorePopup = ref(null)
  //评分弹窗
  const clickScore = () => {
    if (currentInfo.value.userScore) {
      isScore.value = true
      userScore.value = currentInfo.value.userScore
    }
    scorePopup.value.open()
  }
  //关闭评分弹窗
  const clickScoreClose = () => {
    scorePopup.value.close()
    userScore.value = 0;
    isScore.value = false
  }

  //确认评分
  const submitScore = async () => {
    let {
      classid,
      id: wallId
    } = currentInfo.value
    let res = await apiGetSetUpScore({
      classid,
      wallId,
      userScore: userScore.value
    })
    if (res.errCode === 0) {
      uni.showToast({
        title: '评分成功',
        icon: 'none'
      })
      classList.value[currentIndex.value].userScore = userScore.value
      uni.setStorageSync("storageClassList", classList.value)
      clickScoreClose()
    }

  }

  //返回上一页
  const goBack = () => {
    uni.navigateBack({
      success:()=>{
        
      },
      fail:(err)=>{
        uni.reLaunch({
          url:'/pages/index/index'
        })
      }
    })
  }

  //点击下载按钮
  const clickDownload = async () => {
    // #ifdef H5
    uni.showModal({
      content: '长按保存壁纸',
      showCancel: false
    })
    // #endif

    // #ifndef H5
    try {
      uni.showLoading({
        title: '下载中....',
        mask: true
      })
      let {
        classid,
        _id: wallId
      } = currentInfo.value
      let res = await apiWriteDownload({
        classid: currentInfo,
        wallId,
      })
      if (err.errCode !== 0) throw res
      uni.getImageInfo({
        src: currentInfo.value.picurl,
        success: (res) => {
          uni.saveImageToPhotosAlbum({
            filePath: res.path,
            success: () => {
              console.log(res);
            },
            fail: err => {
              if (err.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
                uni.showToast({
                  title: '保存失败，请重新点击下载',
                  icon: 'none'
                })
                return
              }

              uni.showModal({
                title: '提示',
                content: '需要授权保存相册',
                success: res => {
                  if (res.confirm) {
                    uni.openSetting({
                      success(setting) {
                        if (setting.authSetting['scope.writePhotosAlbum']) {
                          uni.showToast({
                            title: '获取授权成功！',
                            icon: 'none'
                          })
                        } else {
                          uni.showToast({
                            title: '获取授权失败！',
                            icon: 'none'
                          })
                        }
                      }
                    })
                  }
                }
              })
            },
            complete: () => {
              uni.hideLoading()
            }
          })
        }
      })
    } catch (err) {
      console.log(err);
      uni.hideLoading()
    }
    // #endif


  }
  
  
  //分享给好友
  onShareAppMessage((e)=>{
    return {
      title:'咸虾米壁纸-',
      path:'/pages/preview/preview?id=' + currentId.value + "&type=share"
    }
  })
  //分享给朋友圈
  onShareTimeline(()=>{
    return {
      title:'咸虾米壁纸-',
      query:'id=' + currentId.value + "&type=share"
    }
  })
</script>

<style lang="scss" scoped>
  .preview {
    width: 100%;
    height: 100vh;
    position: relative;

    swiper {
      width: 100%;
      height: 100%;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .mask {
      &>view {
        position: absolute;
        left: 0;
        margin: auto;
        color: #fff;
        right: 0;
        width: fit-content;
      }

      .goBack {
        width: 38px;
        height: 38px;
        background: rgba(0, 0, 0, 0.5);
        left: 30rpx;
        margin-left: 0;
        border-radius: 100px;
        top: 0;
        backdrop-filter: blur(10rpx);
        border: 1rpx solid rgba(255, 255, 255, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .count {
        top: 10vh;
        background: rgba(0, 0, 0, 0.3);
        font-size: 28rpx;
        border-radius: 40rpx;
        padding: 8rpx 28rpx;
        backdrop-filter: blur(10rpx);
      }

      .time {
        font-size: 140rpx;
        top: calc(10vh + 80rpx);
        font-weight: 100;
        line-height: 1em;
        text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
      }

      .date {
        font-size: 34rpx;
        top: calc(10vh + 230rpx);
        text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
      }

      .footer {
        background: rgba(255, 255, 255, 0.8);
        bottom: 10vh;
        width: 65vw;
        height: 120rpx;
        border-radius: 120rpx;
        color: #000;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(20rpx);

        .box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rpx 12rpx;

          .text {
            font-size: 26rpx;
            color: $text-font-color-2;
          }
        }
      }
    }

    .popHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        color: $text-font-color-2;
        font-size: 26rpx;
      }

      .close {
        padding: 6rpx;
      }
    }

    .infoPopup {
      background: #fff;
      padding: 30rpx;
      border-radius: 30rpx 30rpx 0 0;
      overflow: hidden;

      scroll-view {
        max-height: 50vh;

        .content {
          .row {
            display: flex;
            padding: 16rpx 0;
            font-size: 32rpx;
            line-height: 1.7em;

            .label {
              color: $text-font-color-3;
              width: 140rpx;
              text-align: right;
              font-size: 30rpx;
            }

            .value {
              flex: 1;
              width: 0;
            }

            .roteBox {
              display: flex;
              align-items: center;

              .score {
                font-size: 26rpx;
                color: $text-font-color-2;
                padding-left: 10rpx;
              }
            }

            .tabs {
              display: flex;
              flex-wrap: wrap;

              .tab {
                border: 1px solid $brand-theme-color;
                color: $brand-theme-color;
                font-size: 22rpx;
                padding: 10rpx 30rpx;
                border-radius: 40rpx;
                line-height: 1em;
                margin: 0 10rpx 10rpx 0;
              }
            }

            .class {
              color: $brand-theme-color;
            }
          }
        }
      }
    }

    .scorePopup {
      background: #fff;
      padding: 30rpx;
      width: 70vw;
      border-radius: 30rpx;

      .content {
        padding: 30rpx 0;
        display: flex;
        justify-content: center;
        align-items: center;

        .text {
          color: #ffca3e;
          padding-left: 10rpx;
          width: 80rpx;
          line-height: 1em;
          text-align: center;
        }
      }

      .footer {
        padding: 10rpx 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>