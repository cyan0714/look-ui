<template>
  <div id="pointDetailTable">
    <el-table class="lookui-table" :data="tableData" height="430" style="width: 100%">
      <el-table-column
        v-for="(item, index) in columns"
        :prop="item.prop"
        :label="item.label"
        :key="index">
        <template slot-scope="scope">
          <slot :name="item.prop" :item="scope.row">
            <span>{{ scope.row[item.prop] }}</span>
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        class="lookui-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="12"
        background>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      queryParams: {
        current: 1,
        pageSize: 10,
      },
    };
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleCurrentChange() {},
    handleSizeChange() {},
  },
};
</script>

<style scoped lang="scss">
#pointDetailTable {
  .pagination-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
