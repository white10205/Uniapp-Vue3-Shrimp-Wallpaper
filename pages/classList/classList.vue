<template>
  <view class="classList">
    <view class="loadingLayout" v-if="!classList.length && !noData">
      <uni-load-more status="loading"></uni-load-more>
    </view>
    <view class="content">
      <navigator :url="'/pages/preview/preview?id=' + item._id" class="item" v-for="item in classList" :key="item._id">
        <image :src="item.smallPicurl" mode="aspectFill"></image>
      </navigator>
    </view>
    <view class="loadingLayout" v-if="classList.length || noData">
      <uni-load-more :status="noData? 'noMore':'loading'"></uni-load-more>
    </view>
  </view>
  <view class="safe-area-inset-bottom">
    
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue';
  import {
    apiGetClassList
  } from '../../api/apis';
  import {onLoad,onUnload,onReachBottom,onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"
  import {gotoHome} from '@/utils/common.js'
  const classList = ref([])
  const noData = ref(false)
  const queryParams = {
    pageNum:1,
    pageSize:12
  }
  let pageName;
  onLoad((e)=>{
    let {id,name} = e 
    if(!id) {
      gotoHome()
    }
    queryParams.classid = id
    pageName = name
    uni.setNavigationBarTitle({
      title:name
    })
    getClassList()
  })
  onReachBottom(()=>{
    if(noData.value) return;
    queryParams.pageNum++ 
    getClassList()
  })
  //获取分类列表
  const getClassList = async () => {
    let res = await apiGetClassList(queryParams)
    if(res.data.length < queryParams.pageSize) noData.value = true
    
    classList.value = [...classList.value,...res.data]
    uni.setStorageSync('storageClassList',classList.value)
  }
  
  //分享给好友
  onShareAppMessage((e)=>{
    return {
      title:'咸虾米壁纸-' + pageName,
      path:'/pages/classList/classList?id=' + queryParams.classid + "&name=" + pageName
    }
  })
  //分享给朋友圈
  onShareTimeline(()=>{
    return {
      title:'咸虾米壁纸-' + pageName,
      query:'id=' + queryParams.classid + "&name=" + pageName
    }
  })
  
  onUnload(()=>{
    uni.removeStorageSync('storageClassList')
  })
</script>

<style lang="scss" scoped>
  .classList {
    .content {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5rpx;
      padding: 5rpx;

      .item {
        height: 440rpx;

        image {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
  }
</style>