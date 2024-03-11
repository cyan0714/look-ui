<template>
  <look-performance-unit :token="token" :baseUrl="baseUrl"></look-performance-unit>
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
