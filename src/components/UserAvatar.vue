<template>
  <div class="is-user-avatar">
    <span>{{ initialName }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserAvatar',
  props: {
    avatar: {
      type: String,
      default: null
    }
  },
  computed: {
    newUserAvatar () {
      if (this.avatar) {
        return this.avatar
      }

      if (this.userAvatar) {
        return this.userAvatar
      }

      let name = 'somename'

      if (this.userName) {
        name = this.userName.replace(/[^a-z0-9]+/i, '')
      }

      return `https://avatars.dicebear.com/v2/human/${name}.svg?options[mood][]=happy`
    },
    initialName () {
      let name = 'x'
      if (this.userName) {
        name = this.userName[0]
      }
      return name
    },
    ...mapState(['userAvatar', 'userName'])
  }
}
</script>
