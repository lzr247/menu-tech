<template>
  <div class="page-currencies">
    <div class="currencies">

      <section class="currencies__top-section">
        <h1 class="currencies__title">Currencies</h1>
        <button @click="showAddCurrency" class="currencies__button-add"><IconPlus/> Add currency</button>
      </section>

      <section class="currencies__search">
        <IconSeach/>
        <input v-model="search" type="search" name="currency-search" id="" placeholder="Search" />
      </section>

      <section class="currencies__currency-list">
        <div class="currencies__types">
          <div class="name">CURRENCY NAME</div>
          <div class="wrapper">
            <div class="code">CURRENCY CODE</div>
            <div class="symbol">CURRENCY SYMBOL</div>
          </div>
        </div>
        <span class='currencies__no-currencies' v-if='!currenciesExist'>There are no currencies added</span>
        <div 
          v-else 
          v-for="(currency, index) in filteredCurrencies" 
          :key="index"
          class="currencies__types clickable"
          @click="showEditCurrency(currency); showAddCurrency = true;"
        >
          <div class="name"><b>{{ currency.name }}</b></div>
          <div class="wrapper">
            <div class="code">{{ currency.isoMark }}</div>
            <div class="symbol">
              <span>{{ currency.symbol }}</span>
              <IconTrash @click="deleteCurrency(currency.id); showComponent = false;"/>
            </div>
          </div>
        </div>
      </section>
    </div>

    <CurrencyManipulation 
      v-if="showComponent"
      :componentType="componentType"
      @close="showComponent = false;"
    />

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconPlus from "vue-material-design-icons/Plus.vue";
import IconSeach from "vue-material-design-icons/Magnify.vue";
import IconTrash from "vue-material-design-icons/TrashCanOutline.vue";
import CurrencyManipulation from "@/components/CurrencyManipulation.vue";
import { mapGetters, mapActions } from "vuex";
import Currency from "@/interfaces/Currency";

export default defineComponent({
  name: "page-currencies",
  components: { IconPlus, IconSeach, IconTrash, CurrencyManipulation },
  data() {
    return {
      showComponent: false,
      componentType: '',
      currency: {
        id: 0,
        name: '',
        isoMark: '',
        symbol: ''
      },
      search: '',
    };
  },
  computed: {
    ...mapGetters([
      'filteredCurrencies'
    ]),
    currenciesExist() {
      return this.$store.state.filteredCurrencies.length;
    }
  },
  methods: {
    ...mapActions([
      'deleteCurrency'
    ]),
    showAddCurrency() {
      this.componentType = 'add';
      this.showComponent = true;
    },
    showEditCurrency(currency: Currency) {
      this.componentType = 'edit';
      this.showComponent = true;
      this.$store.dispatch('setEditCurrency', currency);
    },
  },
  watch: {
    search(newVal, oldVal) {
      this.$store.commit('filterList', newVal);
    }
  }
});
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.page-currencies {
  width: 100%;
  display: flex;
  
  .currencies {
    padding: 40px 30px;
    width: 100%;
    box-sizing: border-box;

    // First section
    &__top-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      h1 {
        margin: 0;
      }
    }

    &__button-add {
      width: 140px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $color-primary;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      .material-design-icon {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    // Search section
    &__search {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 30px;

      input {
        box-sizing: border-box;
        padding: 10px 10px 10px 30px;
        border-radius: 6px;
        font-size: 16px;
        outline: none;
        border: 2px solid $color-gray;

        &:focus {
          border: 2px solid $color-primary;
        }
      }

      .material-design-icon {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: absolute;
        margin-left: 5px;
        color: #808080;
      }
    }

    // Currency list
    &__currency-list {
      display: flex;
      flex-direction: column;
    }

    &__types {
      display: flex;
      justify-content: space-between;
      width: 100%;
      border-bottom: 1px solid #ededed;
      padding: 10px 0;

      &.clickable {
        cursor: pointer;
        &:hover {
          background-color: #f7f7f7;
        }
      }

      .name {
        width: 60%;
        font-family: $font-primary-bold;
        color: $color-gray-text;
      }

      .wrapper {
        width: 40%;
        display: flex;
        justify-content: space-between;

        .code, .symbol {
          width: 50%;
          font-family: $font-primary-bold;
          color: $color-gray-text;
        }

        .symbol {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .material-design-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
      }
    }

    &__no-currencies {
      margin-top: 30px;
      text-align: center;
      color: $color-gray-text;
      font-family: $font-primary-bold;
    }
  }
}
</style>