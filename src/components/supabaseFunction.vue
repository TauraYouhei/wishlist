<template>
    <div></div>
</template>

<script>
import { supabase } from '../supabase'

export default {
  data () {
    return {
      categoryList: [],
      subCategoryList: [],
      subCategoryList2: [],
      productList: [],
      foo: {},
      yohei: [],
      count: [],
      counter: ''
    }
  },
  methods: {
    async addCaterogy (category) {
      await supabase.from('category').insert({
        category: category
      })
      this.$store.commit('setSelectCategory', category)
      this.addSubCategory('サブカテゴリなし')
    },

    async addSubCategory (subCategory) {
      await supabase.from('category').insert({
        category: this.$store.state.selectCategory,
        subCategory: subCategory
      })
    },

    async addProduct (category, subcategory, title, shopname, URL, price, comment) {
      await supabase.from('productlist').insert({
        category: category,
        subCategory: subcategory,
        product: title,
        shopname: shopname,
        URL: URL,
        price: price,
        comment: comment
      })
    },

    async getCategoryList () {
      this.categoryList = await supabase.from('category').select('category')
      const categoryList2 = []
      for (let i = 0; i < this.categoryList.data.length; i++) {
        categoryList2.push(this.categoryList.data[i].category)
      }
      const resultArray = categoryList2.filter((element, index) => {
        return categoryList2.indexOf(element) === index
      })
      this.$store.commit('setCategoryList', resultArray)
    },

    async getSubCategoryList () {
      this.subCategoryList = await supabase.from('category').select('*')
      this.categoryList = this.$store.state.categoryList
      for (const category of this.categoryList) {
        this.subCategoryList2[category] = []
        for (const subcategory of this.subCategoryList.data) {
          if (category === subcategory.category && subcategory.subCategory !== null) {
            this.subCategoryList2[category].push(subcategory.subCategory)
          }
        }
      }
      this.$store.commit('setSubCategoryList', this.subCategoryList2)
    },

    async getProductList (category) {
      this.productList = await supabase.from('productlist').select('*')
      this.subCategoryList = this.$store.state.subCategoryList
      for (const subcategory2 of this.subCategoryList[category]) {
        this.foo[subcategory2] = []
        this.count[subcategory2] = 0
        this.counter = 0
        for (const product of this.productList.data) {
          if (subcategory2 === product.subCategory && category === product.category) {
            this.foo[subcategory2].push(product.product)
            this.count[subcategory2] = this.counter + 1
            this.counter = this.counter + 1
          }
        }
      }
      this.$store.commit('setProductList', this.foo)
      this.$store.commit('setProductCount', this.count)
    },

    async getProductShow (productID) {
      const productInfo = await supabase.from('productlist').select('*').eq('product', productID)
      this.$store.commit('setSelectProduct', productInfo)
    },

    async updateProduct (category, subcategory, title, shopname, URL, price, id, comment) {
      await supabase.from('productlist').update({
        category: category,
        subCategory: subcategory,
        product: title,
        shopname: shopname,
        URL: URL,
        price: price,
        comment: comment
      }).eq('id', id)
    },

    async updateCategory (oldCategory, newCategory) {
      await supabase.from('category').update({
        category: newCategory
      }).eq('category', oldCategory)

      await supabase.from('productlist').update({
        category: newCategory
      }).eq('category', oldCategory)

      await this.getCategoryList()
      await this.getSubCategoryList()
    },

    async updateSubCategory (oldSubCategory, newSubCategory) {
      await supabase.from('category').update({
        subCategory: newSubCategory
      }).eq('subCategory', oldSubCategory)

      await supabase.from('productlist').update({
        subCategory: newSubCategory
      }).eq('subCategory', oldSubCategory)
    },

    async deleteProduct (id) {
      await supabase.from('productlist').delete().eq('id', id)
    },

    async deleteCategoryList (category) {
      await supabase.from('category').delete().eq('category', category)
      await supabase.from('productlist').delete().eq('category', category)
      await this.getCategoryList()
      await this.getSubCategoryList()
    },

    async deleteSubCategory (subCategory) {
      await supabase.from('category').delete().eq('subCategory', subCategory)
      await supabase.from('productlist').delete().eq('subCategory', subCategory)
    }
  }
}
</script>
