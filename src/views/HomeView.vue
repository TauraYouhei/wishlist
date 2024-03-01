<template>
  <supabase-function ref="childSupa" />
  <v-app class="all">
    <v-app-bar class="headerBar" color="#B0DEEC" app>
      <v-btn outlined class="headerBar" v-on:click="backButtonClicked" v-if="flag">戻る</v-btn>
      <v-btn varian="text" disabled v-else>&nbsp;&nbsp;&nbsp;</v-btn>
      <v-app-bar-title class="headerBar">{{ title }}</v-app-bar-title>
      <v-btn outlined class="headerBar" v-on:click="menuButtonClicked"><v-icon>mdi-dots-horizontal</v-icon></v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-sheet class="wrap">
          <v-card class="item" v-for="list in this.categoryList" :key="list">
            <v-btn class="minus" icon="mdi-minus" size="x-small" color="red" v-on:click="minusButtonClicked(list)" v-if="flag"></v-btn>
            <v-btn class="itembtn" height="100" v-on:click="buttonClicked(list)" variant="text">{{ list }}</v-btn>
          </v-card>

          <v-card v-if="menu" max-width="70" class="right">
            <v-list :items="items" @click:select="selected"></v-list>
          </v-card>

          <v-card v-if="editFlag" height="500" width="350" class="editForm" elevation="5">
            <p>変更前のカテゴリ名を選択してください</p>
            <v-select
              v-model="selectCategory"
              label="変更前のカテゴリ名"
              :items="caterogy"
              return-object
              single-line
            ></v-select>

            <p>変更後のカテゴリ名を入力してください</p>
            <v-text-field
              label="新しいカテゴリ名を入力"
              :rules="rules"
              hide-details="auto"
              v-model="newCategory"
            ></v-text-field>

            <br><br><v-btn size="large" color="grey-lighten-3" variant="flat" class="editFormButton" v-on:click="cancelButtonClicked">キャンセル</v-btn>
            <v-btn size="large" color="#B0DEEC" variant="flat" class="editFormButton" :disabled="inputFlag" v-on:click="changeButtonClicked">変更する</v-btn>
          </v-card>
        </v-sheet>
      </v-container>
    </v-main>

    <v-footer color="#B0DEEC" app height="80px">
      <v-btn
        class="footerButton"
        prepend-icon="mdi-folder-plus"
        stacked
        v-on:click="categoryButtonClicked">
        カテゴリ
      </v-btn>
      <v-btn
        class="footerButton"
        prepend-icon="mdi-plus-circle"
        stacked
        v-on:click="puroductAddButtonClicked">
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
  name: 'HomeView',

  components: {
    supabaseFunction
  },

  data () {
    return {
      title: '欲しいものリスト',
      categoryList: this.$store.state.categoryList,
      caterogy: this.$store.state.categoryList,
      selectCategory: 'カテゴリなし',
      flag: false,
      menu: false,
      editFlag: false,
      items: [
        {
          title: '編集',
          value: 1
        },
        {
          title: '削除',
          value: 2
        }
      ],
      rules: [
        value => !!value || '入力してください',
        value => (value && value.length >= 1) || 'Min 3 characters'
      ],
      newCategory: '',
      inputFlag: true
    }
  },

  methods: {
    buttonClicked: function (category) {
      this.$store.commit('setSelectCategory', category)
      this.$router.push('/DatailView')
    },
    categoryButtonClicked: function () {
      this.$router.push('/CategoryAdd')
    },
    puroductAddButtonClicked: function () {
      this.$router.push('/ProductAdd')
    },
    async minusButtonClicked (category) {
      await this.$refs.childSupa.deleteCategoryList(category)
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    },
    menuButtonClicked: function () {
      if (this.menu) {
        this.menu = false
      } else {
        this.menu = true
      }
    },
    selected (val) {
      if (val.id === 2) {
        this.menu = false
        this.flag = true
      } else {
        this.menu = false
        this.editFlag = true
      }
    },
    backButtonClicked: function () {
      this.flag = false
    },
    cancelButtonClicked: function () {
      this.editFlag = false
    },
    async changeButtonClicked () {
      this.editFlag = false
      await this.$refs.childSupa.updateCategory(this.selectCategory, this.newCategory)
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    }
  },

  async mounted () {
    await this.$refs.childSupa.getCategoryList()
    await this.$refs.childSupa.getSubCategoryList()
  },

  watch: {
    newCategory (newVal) {
      if (newVal.length > 0) {
        if (this.selectCategory === 'カテゴリなし') {
          this.inputFlag = true
        } else {
          this.inputFlag = false
        }
      } else {
        this.inputFlag = true
      }
    }
  }
}
</script>

<style scoped>
.wrap {
  display: flex;
  flex-wrap: wrap;
}

.item {
  margin : 0 5%;
  margin-top : 20px;
  width: 40%;
  height: 160px;
  background-color: #FFFFFF;
  border-radius : 7px;
  border : 2px solid #B0DEEC;
  position: reactive;
}

.itembtn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

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

.minus {
  position: absolute;
  top: 0;
  left: 0;
}

.right {
  position: absolute;
  top: 75px;
  right: 8px;
}

.editForm {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  padding-top: 100px;
  padding-left: 20px;
  padding-right: 20px;
}

.editFormButton {
  margin-left: 8%;
}

.all {
  font-family: 'Noto Sans JP', sans-serif !important;
}
</style>
