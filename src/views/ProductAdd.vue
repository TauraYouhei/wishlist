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
        <v-sheet>
          <p>カテゴリ名</p>
          <v-select
            v-model="selectCategory"
            label="カテゴリ名"
            :items="caterogy"
            return-object
            single-line
          ></v-select>

          <p>サブカテゴリ名</p>
          <v-select
            v-model="selectSubCategory"
            label="サブカテゴリ名"
            :items="subCategory[selectCategory]"
            return-object
            single-line
          ></v-select>

          <v-textarea
            v-model="inputTitle"
            class="inputInfo"
            label="タイトル(必須)"
            :rules="rules.inputTitle"
            auto-grow
            rows="1"
          ></v-textarea>

          <v-textarea
            v-model="inputShopName"
            class="inputInfo"
            label="ショップ名"
            auto-grow
            rows="1"
          ></v-textarea>

          <v-textarea
            v-model="inputURL"
            class="inputInfo"
            label="URL"
            auto-grow
            rows="1"
          ></v-textarea>

          <v-textarea
            v-model="inputPrice"
            class="inputInfo"
            label="価格"
            auto-grow
            rows="1"
          ></v-textarea>

          <v-textarea
            v-model="inputComment"
            class="inputInfo"
            label="コメント"
            auto-grow
            rows="1"
          ></v-textarea>

        </v-sheet>
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
  name: 'ProductAdd',

  components: {
    supabaseFunction
  },

  data () {
    return {
      title: '商品追加',
      selectCategory: 'カテゴリなし',
      selectSubCategory: 'サブカテゴリなし',
      inputTitle: '',
      inputShopName: '',
      inputURL: '',
      inputPrice: '',
      inputComment: '',
      flag: true,
      caterogy: this.$store.state.categoryList,
      subCategory: this.$store.state.subCategoryList,
      rules: {
        inputTitle: [val => (val || '').length > 0 || '入力してください']
      }
    }
  },

  methods: {
    backButtonClicked: function () {
      this.$router.push('/')
    },
    async addButtonClicked () {
      if (this.inputTitle !== null) {
        await this.$refs.childSupa.addProduct(this.selectCategory, this.selectSubCategory, this.inputTitle, this.inputShopName, this.inputURL, this.inputPrice, this.inputComment)
        this.$router.push('/')
      }
    }
  },

  watch: {
    inputTitle (newVal) {
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

.inputInfo {
  margin-top : 10px;
}

.all {
  font-family: 'Noto Sans JP', sans-serif !important;
}
</style>
