<template>
  <div id="app">
    <div class="bgvideo">
      <video src="@/assets/video/winter20191211.mp4" muted autoplay loop></video>
    </div>
    <weatherContainer />
  </div>
</template>

<script>
import weatherContainer from '@/components/weather/side/container.vue'
export default {
  components: {
    weatherContainer
  }
}
</script>

<style scoped>
div {
  width: 100vw;
  height: 100vh;
  /* border: 3px solid red; */
  position: relative;
}
.bgvideo {
  position: absolute;
}
video {
  height: 100%;
  width: 100%;
  /* object-fit: cover; 能够让视频填充满整个div */
  object-fit: cover;
}
</style>
