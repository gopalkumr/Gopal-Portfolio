<template>
  <video>
    <source v-if="hasWebm" :src="srcWebm" type="video/webm" />
    <source v-if="hasMp4" :src="srcMp4" type="video/mp4" />
  </video>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    hasWebm() {
      try {
        require(`~/assets/videos/${this.src}.webm`)
        return true
      } catch (e) {
        return false
      }
    },
    hasMp4() {
      try {
        require(`~/assets/videos/${this.src}.mp4`)
        return true
      } catch (e) {
        return false
      }
    },
    srcWebm() {
      return this.hasWebm ? require(`~/assets/videos/${this.src}.webm`) : ''
    },
    srcMp4() {
      return this.hasMp4 ? require(`~/assets/videos/${this.src}.mp4`) : ''
    }
  }
}
</script>
