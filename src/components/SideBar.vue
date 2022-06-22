<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <svg-icon icon-class="logo" style="width:75%;color:#F96D00"></svg-icon>
      </div>
      <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">
        <a-menu-item key="/imageUpload">
          <template #icon>
            <picture-outlined/>
          </template>
          <router-link to="/imageUpload" class="link_a">
            <span>{{ language == 2 ? '新闻动态' : '新闻动态' }}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/developHistory">
          <template #icon>
            <CalendarOutlined/>
          </template>
          <router-link to="/developHistory" class="link_a">
            <span>{{ language == 2 ? '发展历程' : '发展历程' }}</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff;height: 60px;line-height: 60px">
        <div class="flex">
          <div class="flex">
            <div>
              <menu-unfold-outlined v-if="collapsed" class="trigger"
                                    @click="() => (collapsed = !collapsed)"/>
              <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)"/>
            </div>
            <a-breadcrumb style="margin-left: 16px;" v-if="breadCrumbsShow">
              <a-breadcrumb-item v-for="(item,index) in breadCrumbs" :key="index">{{ item }}
              </a-breadcrumb-item>
            </a-breadcrumb>
          </div>
          <div class="flex">
            <div style="margin-right: 10px;">
              <fullscreen-outlined style="font-size: 20px;position: relative;top: 5px;"
                                   @click="fullScreen" v-if="!isFullscreen"/>
              <fullscreen-exit-outlined style="font-size: 20px;position: relative;top: 5px;"
                                        @click="fullScreen" v-else/>
            </div>
            <a-dropdown :trigger="['click']" :getPopupContainer="(triggerNode) => triggerNode.parentNode">
              <a class="ant-dropdown-link" @click.prevent style="padding: 0px 5px;">
                <a-button type="primary" shape="circle">{{ language == 1 ? 'EN' : '中' }}</a-button>
              </a>
              <template #overlay>
                <a-menu class="dropMenu" @click="selectLanguage">
                  <a-menu-item key="2">
                    <span>中文</span>
                  </a-menu-item>
                  <a-menu-divider/>
                  <a-menu-item key="1">
                    <span>English</span>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <a-dropdown :trigger="['click']" :getPopupContainer="(triggerNode) => triggerNode.parentNode">
              <a class="ant-dropdown-link" @click.prevent style="position: relative;top: -3px;">
                <a-avatar src="https://joeschmoe.io/api/v1/random"/>
              </a>
              <template #overlay>
                <a-menu class="dropMenu">
                  <a-menu-item key="0">
                    <span>{{ language == 2 ? '个人中心' : 'Personal Center' }}</span>
                  </a-menu-item>
                  <a-menu-divider/>
                  <a-menu-item key="1" @click="loginOut">
                    <span>{{ language == 2 ? '退出登录' : 'Log Out' }}</span>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>
      <a-divider/>
      <a-layout-header style="background: #fff; padding: 0 10px;height: 40px;line-height: 40px;" v-if="showTags">
        <tags-view></tags-view>
      </a-layout-header>
      <a-layout-content :style="{ margin: '16px 14px', padding: '10px'}">
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  defineComponent,
  reactive,
  ref,
  toRefs
} from 'vue';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  PictureOutlined
} from '@ant-design/icons-vue';
import TagsView from './TagsView/index.vue'
import screenfull from 'screenfull'

export default defineComponent({
  components: {
    PictureOutlined,
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    TagsView
  },

  setup() {
    const state = reactive({
      selectedKeys: [],
      openKeys: ['sub1'],
    });
    return {
      ...toRefs(state),
      collapsed: ref(false),
      isFullscreen: ref(false)
    };
  },
  computed: {
    showTags() {
      return this.$store.state.common.showTags
    },
    breadCrumbs() {
      return this.$store.state.common.breadCrumbs
    },
    breadCrumbsShow() {
      return this.$store.state.common.breadCrumbsShow
    },
    language() {
      return this.$store.state.common.language
    },
  },
  mounted() {
    this.selectedKeys = [this.$route.path]
    this.init()
  },
  watch: {
    $route(val) {
      this.selectedKeys = [val.path]
      let view = {
        path: val.path,
        query: val.query,
        fullPath: val.fullPath,
        title: val.meta.title,
      }
      this.$store.dispatch('tagsView/addView', view)

      let breadCrumbs = []
      if (val.meta.parentTitle) breadCrumbs.push(val.meta.parentTitle)
      if (val.meta.title) breadCrumbs.push(val.meta.title)

      this.$store.dispatch('common/saveBreadCrumbs', breadCrumbs)
    }
  },
  methods: {
    selectLanguage(val) {
      this.$store.dispatch('common/saveLanguage', val.key)
    },
    // 全屏显示
    fullScreen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: '你的浏览器不支持全屏',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    },
    loginOut() {
      this.$router.push({
        path: '/login'
      })
    }
  }

});
</script>
<style lang="scss">
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

.logo {
  padding: 10px;
}

.svg-icon {
  max-height: 50px !important;
}

.site-layout .site-layout-background {
  background: #fff;
}

.ant-layout-header {
  padding: 0px 24px;
  text-align: left;
}

.ant-divider-horizontal {
  margin: 0px;
}

.ant-breadcrumb-separator {
  margin: 0px 5px !important;
}

.ant-dropdown {
  top: 60px !important;
}


.ant-dropdown-menu {
  border-radius: 5px;
  padding: 5px;
}
</style>
