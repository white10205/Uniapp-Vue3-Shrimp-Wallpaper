<template>
  <view class="homeLayout pageBg">
    <custom-nav-bar title="推荐"></custom-nav-bar>
    <view class="banner">
      <swiper :indicator-dots="true" :autoplay="true" indicator-color="rgba(255,255,255,0.5)"
        indicator-active-color="#fff" circular="true">
        <swiper-item v-for="item in bannerList" :key="item._id">
          <image :src="item.picurl" mode="aspectFill"></image>
        </swiper-item>

      </swiper>
    </view>

    <view class="notice">
      <view class="left">
        <uni-icons type="sound-filled" size="20"></uni-icons>
        <text class="text">公告</text>
      </view>
      <view class="center">
        <swiper :autoplay="true" :interval="1500" :duration="300" vertical="true">
          <swiper-item v-for="item in noticeList" :key="item._id">
            <navigator url="/pages/notice/detail">{{item.title}}</navigator>

          </swiper-item>
        </swiper>
      </view>
      <view class="right">
        <uni-icons type="right" size="20" color="#333"></uni-icons>
      </view>
    </view>

    <view class="select">
      <common-title>
        <template #name>
          每日推荐
        </template>
        <template #custom>
          <view class="date">
            <uni-icons type="calendar" size="18"></uni-icons>
            <view class="text">
              <uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
            </view>
          </view>
        </template>
      </common-title>
      <view class="content">
        <scroll-view scroll-x="true">
          <view class="box" v-for="item in randomList" @click="goPreview(item._id)" :key="item._id">
            <image :src="item.smallPicurl" mode="aspectFill"></image>
          </view>
        </scroll-view>
      </view>
    </view>

    <view class="theme">
      <common-title>
        <template #name>
          专题精选
        </template>
        <template #custom>
          <navigator url="" class="more">More+</navigator>
        </template>
      </common-title>

      <view class="content">
        <theme-item v-for="item in classifyList" :key="item._id"
        :item="item"></theme-item>
        <theme-item :isMore="true"></theme-item>
      </view>
    </view>


  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue';
  import {
    apiGetBanner,
    apiGetRandom,
    apiGetNotice,
    apiGetClassify
  } from '@/api/apis.js'
  import {onShareAppMessage,onShareTimeline} from '@dcloudio/uni-app'
  const bannerList = ref([])
  const randomList = ref([])
  const noticeList = ref([])
  const classifyList = ref([])
  //获取轮播图
  const getBanner = async () => {
    let res = await apiGetBanner()
    bannerList.value = res.data
  }

  //获取每日推荐
  const getRandom = async () => {
    let res = await apiGetRandom()
    randomList.value = res.data
  }

  //获取公告
  const getNotice = async () => {
    let res = await apiGetNotice({
      select: true
    });
    noticeList.value = res.data
  }

  //获取分类
  const getClassify = async () => {
    let res = await apiGetClassify({
      select:true
    })
    classifyList.value = res.data
  }
  getBanner()
  getRandom()
  getNotice()
  getClassify()
  //跳转到预览页面
  const goPreview = (id) => {
    uni.setStorageSync('storageClassList',randomList.value)
    uni.navigateTo({
      url: '/pages/preview/preview?id=' + id
    })
  }
  //分享给好友
  onShareAppMessage((e)=>{
    return {
      title:'咸虾米壁纸',
      path:'/pages/index/index'
    }
  })
  //分享给朋友圈
  onShareTimeline(()=>{
    return {
      title:'咸虾米壁纸',
      
    }
  })
</script>

<style lang="scss" scoped>
  .homeLayout {

    .banner {
      width: 750rpx;
      padding: 30rpx 0;

      swiper {
        width: 750rpx;
        height: 340rpx;
        padding: 0 30rpx;

        &-item {
          width: 100%;
          height: 100%;

          image {
            width: 100%;

          }
        }
      }
    }

    .notice {
      width: 690rpx;
      height: 80rpx;
      background: #f9f9f9;
      margin: 0 auto;
      border-radius: 80rpx;
      display: flex;
      line-height: 80rpx;

      .left {
        width: 140rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        :deep() {
          .uni-icons {
            color: $brand-theme-color !important;
          }
        }

        .text {
          color: $brand-theme-color;
          font-weight: 600;
          font-size: 28rpx;
        }
      }

      .center {
        flex: 1;

        swiper {
          height: 100%;

          &-item {
            height: 100%;
            font-size: 30rpx;
            color: #666;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }

      .right {
        width: 70rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .select {
      padding-top: 50rpx;

      .date {
        color: $brand-theme-color;
        display: flex;
        align-items: center;

        :deep() {
          .uni-icons {
            color: $brand-theme-color !important;
          }
        }

        text {
          margin-left: 5rpx;
        }
      }

      .content {
        width: 720rpx;
        margin-left: 30rpx;
        margin-top: 30rpx;

        scroll-view {
          white-space: nowrap;

          .box {
            width: 200rpx;
            height: 430rpx;
            display: inline-block;
            margin-right: 15rpx;

            image {
              width: 100%;
              height: 100%;
              border-radius: 10rpx;
            }
          }

          .box:last-child {
            margin-right: 30rpx;
          }
        }
      }
    }

    .theme {
      padding: 50rpx 0;

      .more {
        font-size: 32rpx;
        color: #888;
      }

      .content {
        margin-top: 30rpx;
        padding: 0 30rpx;
        display: grid;
        gap: 15rpx;
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
</style>