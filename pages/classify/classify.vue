<template>
  <view class="classLayout pageBg">
    <custom-nav-bar title="分类"></custom-nav-bar>
    <view class="classify">
      <theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
    </view>
  </view>
</template>

<script setup>
  import {
    apiGetClassify
  } from '@/api/apis.js'
  import {ref} from 'vue'
  import {onShareAppMessage,onShareTimeline} from '@dcloudio/uni-app'
  const classifyList = ref([])
  //获取分类
  const getClassify = async () => {
    let res = await apiGetClassify({
      pageSize:15
    })
    classifyList.value = res.data
  }
  getClassify()
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
.classify{
  padding: 30rpx;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 15rpx;
}
</style>
