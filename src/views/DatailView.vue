<template>
  <supabase-function ref="childSupa" />
  <v-app class="all">
    <v-app-bar height="50" lass="headerBar" color="#B0DEEC" app>
      <v-btn outlined class="headerBar" v-on:click="backButtonClicked">戻る</v-btn>
      <v-app-bar-title class="headerBar">{{ $store.state.selectCategory }}</v-app-bar-title>
      <v-btn outlined class="headerBar" v-on:click="menuButtonClicked"><v-icon>mdi-dots-horizontal</v-icon></v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-sheet>
          <v-text-field
            label="検索"
            outlined
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-sheet>
        <v-card class="mx-auto">
          <v-list v-model:opened="open" @click:select="clickItem">
            <v-list-group v-for="list in keys" :key="list" :value="list">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi-drag-vertical-variant">
                  <v-list-item-title>{{list}} ({{this.productCount[list]}})</v-list-item-title>
                </v-list-item>
              </template>
              <v-list-item
                v-for="i in this.productList[list]"
                :key="i"
                :value="i"
                :v-modl="selectProduct"
              ><v-list-item-title>{{i}}</v-list-item-title></v-list-item>
            </v-list-group>
          </v-list>
        </v-card>

        <v-card v-if="menu" max-width="70" class="right">
          <v-list :items="items" @click:select="selected"></v-list>
        </v-card>

        <v-card v-if="editFlag" height="500" width="350" class="editForm" elevation="5">
          <p>変更前のサブカテゴリ名を選択してください</p>
          <v-select
            v-model="selectSubCategory"
            label="変更前のサブカテゴリ名"
            :items="keys"
            return-object
            single-line
          ></v-select>

          <p>変更後のサブカテゴリ名を入力してください</p>
          <v-text-field
            label="新しいサブカテゴリ名を入力"
            :rules="rules"
            hide-details="auto"
            v-model="newSubCategory"
          ></v-text-field>

          <br><br><v-btn size="large" color="grey-lighten-3" variant="flat" class="editFormButton" v-on:click="cancelButtonClicked">キャンセル</v-btn>
          <v-btn size="large" color="#B0DEEC" variant="flat" class="editFormButton" :disabled="inputFlag" v-on:click="changeButtonClicked">変更する</v-btn>
        </v-card>

        <v-card v-if="deleteFlag" height="350" width="350" class="editForm" elevation="5">
          <p>削除するサブカテゴリ名を選択してください</p>
          <v-select
            v-model="selectSubCategory"
            label="削除するサブカテゴリ名"
            :items="keys"
            return-object
            single-line
          ></v-select>
          <br><br><v-btn size="large" color="grey-lighten-3" variant="flat" class="editFormButton" v-on:click="cancelButtonClicked">キャンセル</v-btn>
          <v-btn size="large" color="red" variant="flat" class="editFormButton" :disabled="selectFlag" v-on:click="deleteButtonClicked">削除する</v-btn>
        </v-card>
      </v-container>
    </v-main>

    <v-footer color="#B0DEEC" app height="80px">
      <v-btn
        class="footerButton"
        prepend-icon="mdi-folder-plus"
        stacked
        v-on:click="subCategoryAddButtonClicked">
        サブカテゴリ
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
  name: 'DatailView',

  components: {
    supabaseFunction
  },

  data () {
    return {
      open: ['Users'],
      selectProduct: '',
      productList: [],
      productCount: [],
      keys: [],
      resultArray: [],
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
      menu: false,
      editFlag: false,
      deleteFlag: false,
      newSubCategory: '',
      rules: [
        value => !!value || '入力してください',
        value => (value && value.length >= 1) || 'Min 3 characters'
      ],
      inputFlag: true,
      selectFlag: true,
      selectSubCategory: 'サブカテゴリなし'
    }
  },

  methods: {
    backButtonClicked: function () {
      this.$router.push('/')
    },
    subCategoryAddButtonClicked: function () {
      this.$router.push('/SubCategoryAdd')
    },
    puroductAddButtonClicked: function () {
      this.$router.push('/ProductAdd')
    },
    async clickItem (arg) {
      await this.$refs.childSupa.getProductShow(arg.id)
      this.$router.push('/ProductShow')
    },
    menuButtonClicked: function () {
      this.selectSubCategory = 'サブカテゴリなし'
      if (this.menu) {
        this.menu = false
      } else {
        this.menu = true
      }
    },
    selected (val) {
      if (val.id === 2) {
        this.menu = false
        this.deleteFlag = true
      } else {
        this.menu = false
        this.editFlag = true
      }
    },
    cancelButtonClicked: function () {
      this.editFlag = false
      this.deleteFlag = false
    },
    async changeButtonClicked () {
      this.editFlag = false
      await this.$refs.childSupa.updateSubCategory(this.selectSubCategory, this.newSubCategory)
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    },
    async deleteButtonClicked () {
      this.deleteFlag = false
      await this.$refs.childSupa.deleteSubCategory(this.selectSubCategory)
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    }
  },

  async mounted () {
    await this.$refs.childSupa.getSubCategoryList()
    await this.$refs.childSupa.getProductList(this.$store.state.selectCategory)
    this.productList = this.$store.state.productList
    this.productCount = this.$store.state.productCount
    this.keys = Object.keys(this.productList)
  },

  watch: {
    newSubCategory (newVal) {
      if (newVal.length > 0) {
        if (this.selectSubCategory === 'サブカテゴリなし') {
          this.inputFlag = true
        } else {
          this.inputFlag = false
        }
      } else {
        this.inputFlag = true
      }
    },

    selectSubCategory (newVal) {
      if (this.selectSubCategory === 'サブカテゴリなし') {
        this.selectFlag = true
      } else {
        this.selectFlag = false
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
  margin-bottom: 4%;
}

.item {
  margin-top : 1px;
  width: 100%;
  height: 80px;
  border-radius : 7px;
  border : 2px solid #B0DEEC;
}

p {
  text-align: left;
  font-size: 15px;
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
