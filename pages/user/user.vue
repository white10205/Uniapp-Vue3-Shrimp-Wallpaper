<template>
  <view class="userLayout pageBg" v-if="userInfo">
    <view :style="{height:getNavBarHeight() + 'px'}"></view>
    <view class="userInfo">
      <view class="avatar">
        <image src="../../static/avatar.jpg" mode="aspectFill"></image>
      </view>
      <view class="ip">
        {{userInfo.IP}}
      </view>
      <view class="address">
        来自于：{{userInfo.address.province}}
      </view>
    </view>
    
    <view class="section">
      <view class="list">
        <navigator class="row" url="/pages/classList/classList">
          <view class="left">
            <uni-icons type="download-filled" size="20"></uni-icons>
            <view class="text">
              我的下载
            </view>
          </view>
          <view class="right">
            <view class="text">
              {{userInfo.downloadSize}}
            </view>
            <uni-icons type="right" size="15"></uni-icons>
          </view>
        </navigator>
        
        <navigator class="row" url="/pages/classList/classList">
          <view class="left">
            <uni-icons type="star-filled" size="20" ></uni-icons>
            <view class="text">
              我的评分
            </view>
          </view>
          <view class="right">
            <view class="text">
             {{userInfo.scoreSize}}
            </view>
            <uni-icons type="right" size="15" color="#aaa"></uni-icons>
          </view>
        </navigator>
        
        <view class="row">
          <view class="left">
            <uni-icons type="chatboxes-filled" size="20" ></uni-icons>
            <view class="text">
              联系客服
            </view>
          </view>
          <view class="right">
            <view class="text">
              
            </view>
            
          </view>
          <!-- #ifdef MP -->
          <button open-type="contact">联系客服</button>
          <!-- #endif -->
          <!-- #ifndef MP -->
          <button @click="clickContact">拨打电话</button>
          <!-- #endif -->
          
        </view>
      </view>
    </view>
    
    <view class="section">
      <view class="list">
        <view class="row" >
          <view class="left">
            <uni-icons type="notification-filled" size="20" color="#28b389"></uni-icons>
            <view class="text">
              订阅更新
            </view>
          </view>
          <view class="right">
            <view class="text">
              
            </view>
          </view>
        </view>
        
        <view class="row" >
          <view class="left">
            <uni-icons type="flag-filled" size="20"></uni-icons>
            <view class="text">
              常见问题
            </view>
          </view>
          <view class="right">
            <view class="text">
              
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {getNavBarHeight} from '@/utils/system.js'
  import {apiUserInfo} from '@/api/apis.js'
  import{ref} from 'vue'
const clickContact = ()=>{
  uni.makePhoneCall({
    phoneNumber:"19720921918"
  })
}
const userInfo = ref(null)
const getUserInfo = async ()=>{
  let res = await apiUserInfo()
  userInfo.value = res.data
  console.log(userInfo.value);
}
getUserInfo()
</script>

<style lang="scss" scoped>
  .userLayout {
    .userInfo {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 50rpx 0;

      .avatar {
        width: 160rpx;
        height: 160rpx;
        border-radius: 50%;
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .ip{
        font-size: 44rpx;
        color: #333;
        padding: 20rpx 0 5rpx;
      }
      .address{
        font-size: 28rpx;
        color: #aaa;
      }
    }
    .section{
      width: 690rpx;
      margin: 50rpx auto;
      border: 1px solid #eee;
      border-radius: 10rpx;
      box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);
      .list{
        .row{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30rpx;
          height: 100rpx;
          border-bottom: 1px solid #eee;
          position: relative;
          background-color: #fff;
          &:last-child{
            border-bottom: 0;
          }
          .left{
            display: flex;
            align-items: center;
            :deep(){
              .uni-icons{
                color:$brand-theme-color !important;
              }
            }
            .text{
              padding-left: 20rpx;
              color: #666;
            }
          }
          .right{
            display: flex;
            align-items: center;
            :deep(){
              .uni-icons{
                color:$brand-theme-color !important;
              }
            }
            .text{
              padding-left: 28rpx;
              color: #aaa;
            }
          }
          button{
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
          }
        }
      }
    }
  }
</style>