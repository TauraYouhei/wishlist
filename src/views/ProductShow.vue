<template>
  <supabase-function ref="childSupa" />
  <v-app class="all">
    <v-app-bar height="50" class="headerBar" color="#B0DEEC" app>
      <v-btn outlined class="headerBar" v-on:click="backButtonClicked">戻る</v-btn>
      <v-app-bar-title class="headerBar">{{ title }}</v-app-bar-title>
      <v-btn outlined class="headerBar" v-on:click="addButtonClicked" v-if="addFlag">完了</v-btn>
      <v-btn outlined class="headerBar" v-on:click="menuButtonClicked" v-else><v-icon>mdi-dots-horizontal</v-icon></v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-sheet>
          <div v-if="addFlag">
            <p>カテゴリ名</p>
            <v-select
              v-model="inputCategory"
              label="カテゴリ名"
              :items="caterogy"
              return-object
              single-line
            ></v-select>

            <p>サブカテゴリ名</p>
            <v-select
              v-model="inputSubCategory"
              label="サブカテゴリ名"
              :items="subCategory[inputCategory]"
              return-object
              single-line
            ></v-select>
          </div>

          <div v-else>
            <v-textarea
              :readonly="editButton"
              label="カテゴリ名"
              v-model="inputCategory"
              rows="1"
              auto-grow
            ></v-textarea>

            <v-textarea
              :readonly="editButton"
              label="サブカテゴリ名"
              v-model="inputSubCategory"
              rows="1"
              auto-grow
            ></v-textarea>
          </div>

          <v-textarea
            :readonly="editButton"
            label="商品名"
            v-model="inputProduct"
            rows="1"
            auto-grow
          ></v-textarea>

          <v-textarea
            :readonly="editButton"
            label="ショップ名"
            v-model="inputShopname"
            rows="1"
            auto-grow
          ></v-textarea>

          <v-textarea
            :readonly="editButton"
            label="URL"
            v-model="inputURL"
            rows="1"
            auto-grow
          ></v-textarea>

          <v-textarea
            :readonly="editButton"
            label="価格"
            v-model="inputPrice"
            rows="1"
            auto-grow
          ></v-textarea>

          <v-textarea
            :readonly="editButton"
            label="コメント"
            v-model="inputComment"
            rows="1"
            auto-grow
          ></v-textarea>

          <v-card v-if="menu" max-width="70" class="right">
            <v-list :items="items" @click:select="selected"></v-list>
          </v-card>

          <v-card v-if="deleteFlag" class="deleteForm" height="200" width="300">
            <v-card-title class="deleteTitile">本当に削除しますか</v-card-title>
            <template v-slot:actions>
              <v-btn size="large" color="grey-lighten-3" variant="flat" class="deleteFormButton" v-on:click="cancelButtonClicked">キャンセル</v-btn>
              <v-btn size="large" color="red" variant="flat" class="deleteFormButton" v-on:click="deleteTrue">削除</v-btn>
            </template>
          </v-card>
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
  name: 'ProductShow',

  components: {
    supabaseFunction
  },

  data () {
    return {
      title: '商品情報',
      caterogy: this.$store.state.categoryList,
      subCategory: [],
      inputCategory: this.$store.state.selectProduct.data[0].category,
      inputSubCategory: this.$store.state.selectProduct.data[0].subCategory,
      inputProduct: this.$store.state.selectProduct.data[0].product,
      inputShopname: this.$store.state.selectProduct.data[0].shopname,
      inputURL: this.$store.state.selectProduct.data[0].URL,
      inputPrice: this.$store.state.selectProduct.data[0].price,
      inputComment: this.$store.state.selectProduct.data[0].comment,
      productID: this.$store.state.selectProduct.data[0].id,
      editButton: true,
      menu: false,
      deleteFlag: false,
      addFlag: false,
      items: [
        {
          title: '編集',
          value: 1
        },
        {
          title: '削除',
          value: 2
        }
      ]
    }
  },

  methods: {
    backButtonClicked: function () {
      this.$router.push('/DatailView')
    },
    async addButtonClicked () {
      await this.$refs.childSupa.updateProduct(this.inputCategory, this.inputSubCategory, this.inputProduct, this.inputShopname, this.inputURL, this.inputPrice, this.productID, this.inputComment)
      this.$router.push('/DatailView')
    },
    editButtonClicked: function () {
      this.menu = false
      this.editButton = false
      this.addFlag = true
    },
    menuButtonClicked: function () {
      if (this.menu) {
        this.menu = false
      } else {
        this.menu = true
      }
    },
    deleteButtonClicked: function () {
      this.menu = false
      this.deleteFlag = true
    },
    cancelButtonClicked: function () {
      this.deleteFlag = false
    },
    async deleteTrue () {
      this.deleteFlag = false
      await this.$refs.childSupa.deleteProduct(this.productID)
      this.$router.push('/DatailView')
    },
    selected (val) {
      if (val.id === 1) {
        this.editButtonClicked()
      } else {
        this.deleteButtonClicked()
      }
    }
  },

  async mounted () {
    await this.$refs.childSupa.getSubCategoryList()
    this.subCategory = this.$store.state.subCategoryList
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

.right {
  position: absolute;
  top: 75px;
  right: 8px;
}

.deleteForm {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  padding-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
}

.deleteFormButton {
  margin-left: 9%;
}

.deleteTitile {
  margin-left: 9%;
}

.all {
  font-family: 'Noto Sans JP', sans-serif !important;
}
</style>
