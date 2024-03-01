import { createStore } from 'vuex'
import { VuexPersistence } from 'vuex-persist'

const vuexPersist = new VuexPersistence({
  storage: localStorage
})

export default createStore({
  state: {
    selectCategory: '',
    selectSubCaterogy: '',
    selectProduct: '',
    categoryList: [],
    subCategoryList: [],
    productList: [],
    productCount: []
  },
  getters: {
  },
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,

    setSelectCategory (state, selectCategory) {
      state.selectCategory = selectCategory
    },
    setSelectSubCategory (state, selectSubCaterogy) {
      state.selectSubCaterogy = selectSubCaterogy
    },
    setSelectProduct (state, selectProduct) {
      state.selectProduct = selectProduct
    },
    setCategoryList (state, categoryList) {
      state.categoryList = categoryList
    },
    setProductList (state, productList) {
      state.productList = productList
    },
    setProductCount (state, productCount) {
      state.productCount = productCount
    },
    setSubCategoryList (state, subCategoryList) {
      state.subCategoryList = subCategoryList
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexPersist.plugin]
})
