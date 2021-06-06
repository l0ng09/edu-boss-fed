<template>
  <div class="menu">
    <div>
      <div slot="header" class="clearfix">
        <el-button
          style="margin-bottom: 20px"
          @click="$router.push({ name: 'menu-create' })"
        >添加菜单</el-button>
      </div>
      <el-table
        :data="menus"
        style="width: 100%">
        <el-table-column
          label="编号"
          min-width="150"
          type="index">
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="level"
          label="菜单级数"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序"
          min-width="150">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        background
        @current-change="handleCurrentChange"
        :disabled="isLoading"
        :page-size="menuQueryParam.size"
        layout="prev, pager, next"
        :total="totalCount"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenus, deleteMenu, getMenusList } from '@/services/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menus: [], // 菜单列表
      menuQueryParam: {
        size: 8,
        current: 1
      },
      isLoading: false,
      totalCount: 0
    }
  },

  created () {
    this.loadMenuList()
  },

  methods: {
    async loadMenuList () {
      const { data } = await getMenusList(this.menuQueryParam)
      if (data.code === '000000') {
        this.menus = data.data.records
        this.totalCount = data.data.total
      }
    },

    handleEdit (item: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: item.id
        }
      })
    },

    handleDelete (item: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => { // 确认执行这里
          // 请求删除操作
          const { data } = await deleteMenu(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadMenuList() // 更新数据列表
          }
        })
        .catch(err => { // 取消执行这里
          console.log(err)
          this.$message.info('已取消删除')
        })
    },

    handleCurrentChange (val: number) {
      // 请求获取对应页码的数据
      this.menuQueryParam.current = val // 修改要查询的页码
      this.loadMenuList()
    }
  }
})
</script>

<style lang="scss" scoped></style>
