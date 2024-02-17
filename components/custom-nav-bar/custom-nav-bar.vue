<template>
  <view class="layout">
    <view class="navbar">
      <view class="statusBar" :style="{height:getStatusBarHeight() + 'px'}"></view>
      <view class="titleBar" :style="{height:getTitleBarHeight()+'px',marginLeft:getLeftIconLeft()+'px'}">
        <view class="title">
          {{title}}
        </view>
        <view class="search">
          <uni-icons class="icon" type="search" size="18" color="#888"></uni-icons>
          <text class="text">搜索</text>
        </view>
      </view>
    </view>

    <view class="fill" :style="{height:getStatusBarHeight() + getTitleBarHeight() + 'px'}">

    </view>
  </view>
</template>

<script setup>
  import {
    getStatusBarHeight,
    getTitleBarHeight,
    getLeftIconLeft
  } from '@/utils/system.js'
  
  defineProps({
    title:{
      type:String,
      default:"壁纸"
    }
  })
</script>

<style lang="scss" scoped>
  .layout {
    .navbar {
      background:
        linear-gradient(to bottom, transparent, #fff 400rpx),
        linear-gradient(to right, #beecd8 40%, #f4e2d8);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 10;

      .statusBar {}

      .titleBar {
        display: flex;
        align-items: center;
        padding: 0 30rpx;

        .title {
          font-size: 22px;
          font-weight: 700;
          color: $text-font-color-1;
        }

        .search {
          width: 220rpx;
          height: 50rpx;
          border-radius: 60rpx;
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid #fff;
          margin-left: 30rpx;
          color: #999;
          font-size: 28rpx;
          display: flex;
          align-items: center;

          .icon {
            margin-left: 5rpx;
          }

          .text {
            padding-left: 10rpx;
          }
        }
      }
    }

    .fill {}
  }
</style>