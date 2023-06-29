<template>
  <div class="lookui-test">hello component{{ msg }}</div>
</template>

<script>
export default {
  name: 'lookui-test',
  components: {},
  data() {
    return {
      msg: '嘻嘻'
    }
  },
  props: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped >
.lookui-test {
  color: red;
}
</style>
