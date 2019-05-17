<template>
  <section class="vue-platform">
    <aside>
      <el-menu
        default-active="0"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#262a39"
        text-color="hsla(0,0%,100%,.6)"
        active-text-color="#fff"
      >
        <router-link :to="{ path: '/platform' }">
          <el-menu-item index="100000">
              <i class="el-icon-document"></i>
              <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="(item, index) in menuList">
          <template v-if="item.nodes.length > 0">
            <el-submenu :index="index + ''" :key="'aside' + index">
              <template slot="title">
                <i :class="'el-icon-' + iconType(index)"></i>
                <span slot="title">{{ item.name }}</span>
              </template>
              <template v-for="(child, index2) in item.nodes">
                <router-link :to="{ path: child.url }" :key="child.name">
                  <el-menu-item :index="index +  '-' + index2" :key="child.name"
                    >{{ child.text }}
                  </el-menu-item>
                </router-link>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <router-link
              :to="{ name: item.url, params: { menuName: 'item.menuName' } }"
              :key="item.name"
            >
              <el-menu-item :index="index + ''" :key="'aside' + index">
                <i :class="'el-icon-' + item.iconType" :key="'aside' + index"></i>
                <span slot="title">{{ item.text }}</span>
              </el-menu-item>
            </router-link>
          </template>
        </template>
      </el-menu>
    </aside>
    <section class="contain">
      <header>
        <el-popover ref="popover" placement="bottom" width="200" trigger="click">
          <div>
            <ul>
              <li>
                修改个人信息
              </li>
              <li @click="exitSystem">
                退出
              </li>
            </ul>
          </div>
        </el-popover>
        <div class="blank"></div>
        <div class="userInfo">
          <el-button v-popover:popover>蔡俊俊</el-button>
        </div>
      </header>
      <main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </main>
    </section>
  </section>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('userInfo')

export default {
  name: "layout",
  created() {
    this._getUserInfo();
  },
  methods: {
    ...mapActions(['_getUserInfo']),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    exitSystem() {
      window.localStorage.removeItem("userToken");
      window.location =
        "http://www.demo.com";
    },
    iconType(index) {
      if (index === 0) {
        return "news";
      } else if (index === 1) {
        return "menu";
      } else if (index === 2) {
        return "d-caret";
      } else if (index === 3) {
        return "star-off";
      } else if (index === 4) {
        return "news";
      } else if (index === 5) {
        return "setting";
      } else if (index === 6) {
        return "edit-outline";
      } else if (index === 7) {
        return "star-on";
      } else {
        return "edit-outline";
      }
    }
  },
  computed: {
    ...mapState({
      menuList: state => state.menuList,
    }),
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vue-platform {
  height: 100%;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  aside {
    width: 240px;
    display: flex;
    .el-menu {
      width: 240px;
    }
    .el-submenu {
      .el-menu-item {
        min-width: initial;
      }
    }
  }
  .contain {
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    flex-basis: auto;
    flex-direction: column;
    header {
      padding-right: 24px;
      padding-left: 24px;
      display: flex;
      flex-direction: row;
      flex-shrink: 0;
      height: 56px;
      text-align: right;
      line-height: 56px;
      box-shadow: 0 3px 3px rgba(216,223,227,.4);
      cursor: pointer;
      .el-button {
        border: none;
      }
      .el-button:hover {
        background-color: white;
      }
      .blank {
        flex: 1;
      }
      .userInfo {
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
        border-left: 1px solid #e8e8e8;
      }
    }
    main {
      height: 900px;
      display: flex;
      padding: 20px;
      flex-direction: column;
      background-color: #f5f5f5;
    }
  }
}

</style>
