<template>
  <div style="height: 100%;">
    <el-container style="height: 100%;">
      <el-aside width="150px">

        <el-menu mode="vertical" router :default-active="route"  unique-opened  style="height: 100%;">
          <el-menu-item index="setting-page">
              <i class="el-icon-menu"></i>
              <span slot="title" slot-scope="title">配置管理</span>
          </el-menu-item>
          <el-menu-item index="add-page">
            <i class="el-icon-menu"></i>
            <span slot="title" slot-scope="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="update-page">
            <i class="el-icon-menu"></i>
            <span slot="title" slot-scope="title">导航二</span>
          </el-menu-item>
        </el-menu>

      </el-aside>
      <el-container>
        <el-header>
          header
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend ({
      name: 'index',
      data() {
        return {
          isCollapse:true,
          route: this.$route.path.replace('/','')
        }
      }
  });
</script>

<style scoped>

</style>
