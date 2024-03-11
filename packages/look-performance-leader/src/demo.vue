<template>
  <look-performance-leader :token="token" :baseUrl="baseUrl"></look-performance-leader>
</template>

<script>
import { baseUrl, token } from '@/constant-test';

export default {
  components: {},
  data() {
    return {
      token,
      baseUrl,
    }
  },
  props: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
</style>
