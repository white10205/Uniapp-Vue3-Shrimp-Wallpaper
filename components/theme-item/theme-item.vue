<template>
  <view class="themeItem">
    <navigator :url="'/pages/classList/classList?id=' + item._id + '&name=' + item.name" class="box" v-if="!isMore">
      <image :src="item.picurl" mode="aspectFill" class="pic"></image>
      <view class="mask">
        {{item.name}}
      </view>
      <view class="tab">
        {{compareTimestamp(item.updateTime)}}前更新
      </view>
    </navigator>
    <navigator url="/pages/classify/classify" open-type="reLaunch" class="box more" v-else>
      <image src="../../common/images/more.jpg" mode="aspectFill" class="pic"></image>
      <view class="mask">
        <uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
        <view class="text">
          更多
        </view>
      </view>
    </navigator>
  </view>
</template>

<script setup>
  import {compareTimestamp} from '@/utils/common.js'
  defineProps({
    isMore: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default () {
        return {
          name: "默认名称",
          picurl: "../../common/images/more.jpg",
          updateTime: Date.now() - 1000 * 60 * 60 * 5
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
  .themeItem {
    .box {
      height: 340rpx;
      border-radius: 10rpx;
      overflow: hidden;
      position: relative;

      .pic {
        width: 100%;
        height: 100%;
      }

      .mask {
        width: 100%;
        height: 70rpx;
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.2);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(20rpx);
        font-weight: 600;
        font-size: 30rpx;
      }

      .tab {
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(250, 129, 90, 0.7);
        backdrop-filter: blur(20rpx);
        color: #fff;
        font-size: 22rpx;
        padding: 6rpx 14rpx;
        border-radius: 0 0 20rpx 0;
        transform: scale(0.8);
        transform-origin: left top;
      }
    }

    .box.more {

      .mask {
        flex-direction: column;
        width: 100%;
        height: 100%;
      }

      .text {
        font-size: 18rpx;
      }
    }
  }
</style>