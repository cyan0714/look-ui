<template>
  <div id="pointDetail">
    <div :class="`point-detail-title point-detail-title-${themeType}`">
      <div class="title-icon"></div>
      <div class="title-content">{{ curOrg.orgName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pointDetail',
  props: {
    themeType: {
      type: String,
      default: 'unit',
    },
    curOrg: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped src="../css/components/pointDetail.scss"></style>
