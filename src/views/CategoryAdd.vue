<template>
  <supabase-function ref="childSupa" />
  <v-app class="all">
    <v-app-bar class="headerBar" color="#B0DEEC" app>
      <v-btn outlined class="headerBar" v-on:click="backButtonClicked">戻る</v-btn>
      <v-app-bar-title class="headerBar">{{ title }}</v-app-bar-title>
      <v-btn outlined class="headerBar" v-on:click="addButtonClicked" :disabled="flag">追加</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <div class="inputBox">
          <v-textarea
            label="新しいカテゴリ名を入力"
            :rules="rules"
            hide-details="auto"
            v-model="newCategory"
            auto-grow
            rows="1"
          ></v-textarea>
        </div>
      </v-container>
    </v-main>

    <v-footer color="#B0DEEC" app height="80px">
      <v-btn
        class="footerButton"
        disabled
        prepend-icon="mdi-folder-plus"
        stacked>
        カテゴリ
      </v-btn>
      <v-btn
        class="footerButton"
        disabled
        prepend-icon="mdi-plus-circle"
        stacked>
        商品追加
      </v-btn>
      <v-btn
        class="footerButton"
        prepend-icon="mdi-cog"
        stacked>
        設定
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import supabaseFunction from '../components/supabaseFunction.vue'

export default {
  name: 'CategoryAdd',

  components: {
    supabaseFunction
  },

  data: () => ({
    title: 'カテゴリ追加',
    rules: [
      value => !!value || '入力してください',
      value => (value && value.length >= 1) || 'Min 3 characters'
    ],
    newCategory: '',
    flag: true
  }),

  methods: {
    backButtonClicked: function () {
      this.$router.push('/')
    },
    async addButtonClicked () {
      await this.$refs.childSupa.addCaterogy(this.newCategory)
      await this.$refs.childSupa.getCategoryList()
      await this.$refs.childSupa.getSubCategoryList()
      this.$router.push('/')
    }
  },

  watch: {
    newCategory (newVal) {
      if (newVal.length > 0) {
        this.flag = false
      } else {
        this.flag = true
      }
    }
  }
}
</script>

<style scoped>
.headerBar {
  font-weight : bold;
  text-align : center;
  color : #FFFFFF;
}

.footerButton {
  font-size : 11px;
  height : 50px;
  width : 23%;
  margin: 0 auto;
}

.inputBox {
  witdh : 100%;
  height : 100px;
  margin-top : 280px;
}

.all {
  font-family: 'Noto Sans JP', sans-serif !important;
}
</style>
