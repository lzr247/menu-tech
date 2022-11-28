<template>
  <div class="add-currency">
    <!-- Add -->
    <section v-if="componentType === 'add'" class="add-currency__nav">
      <div class="add-currency__nav__first">
        <IconClose @click="$emit('close')"/>
        <h3>Add Currency</h3>
      </div>
      <div class="add-currency__nav__last">
        <button class="button-cancel" @click="$emit('close')">Cancel</button>
        <button class="button-save" type="submit" form="addCurrencyForm">Add</button>
      </div>
    </section>

    <!-- Edit -->
    <section v-if="componentType === 'edit'" class="add-currency__nav">
      <div class="add-currency__nav__first">
        <IconClose @click="$emit('close')"/>
        <h3>Edit Currency</h3>
      </div>
      <div class="add-currency__nav__last">
        <button class="button-cancel" @click="$emit('close')">Cancel</button>
        <button class="button-save" type="submit" form="addCurrencyForm">Save</button>
      </div>
    </section>

    <section class="add-currency__currency-info">
      <form 
        id="addCurrencyForm"
        class="addCurrencyForm"
        @submit.prevent="submitCurrency"
        novalidate
      >
        <label for="name">Currency name</label>
        <input v-model="currencyData.name" type="text" name="name" id="name" :class="currencyValidation.nameRequired ? 'input-error' : ''">
        <div v-if="currencyValidation.nameRequired" class="error-required">Please enter currency name</div>

        <label for="code">Currency code</label>
        <input v-model="currencyData.isoMark" type="text" name="code" id="code" :class="currencyValidation.codeRequired ? 'input-error' : ''">
        <div v-if="currencyValidation.codeRequired" class="error-required">Please enter currency code</div>

        <label for="symbol">Currency symbol</label>
        <input v-model="currencyData.symbol" type="text" name="symbol" id="symbol" :class="currencyValidation.symbolRequired ? 'input-error' : ''">
        <div v-if="currencyValidation.symbolRequired" class="error-required">Please enter a symbol</div>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconClose from "vue-material-design-icons/Close.vue";
import { mapGetters } from 'vuex';
import Currency from '@/interfaces/Currency';

export default defineComponent({
  name: 'currency-manipulation',
  components: { IconClose },
  props: {
    componentType: String
  },
  data() {
    return {
      currencyData: {
        id: 0,
        name: '',
        isoMark: '',
        symbol: ''
      } as Currency,
      currencyValidation: {
        nameRequired: false,
        codeRequired: false,
        symbolRequired: false
      }
    }
  },
  methods: {
    submitCurrency():void {
      // I am aware that this is catastrophic
      // Validate fields
      if(!this.currencyData.name) {
        this.currencyValidation.nameRequired = true;
      } else if(!this.currencyData.isoMark) {
        this.currencyValidation.codeRequired = true;
        this.currencyValidation.nameRequired = false;
      } else if(!this.currencyData.symbol) {
        this.currencyValidation.symbolRequired = true;
        this.currencyValidation.codeRequired = false;
        this.currencyValidation.nameRequired = false;
      } else {
        this.currencyValidation.symbolRequired = false;
        this.currencyValidation.codeRequired = false;
        this.currencyValidation.nameRequired = false;

        // Check type
        if(this.componentType === 'add') {
          // Validation passed
          // Check if the list is not empty
          if(typeof this.$store.state.currencies[0] !== 'undefined') {
            this.currencyData.id = this.$store.state.currencies[this.$store.state.currencies.length-1].id + 1;
          } else {
            this.currencyData.id = 0;
          }

          this.$store.dispatch('addCurrency', this.currencyData);
          this.emptyCurrencyData();
          this.$emit('close');

        } else if(this.componentType === 'edit') {
          this.$store.dispatch('editCurrency', this.currencyData);
          this.emptyCurrencyData();
          this.$emit('close');
        }
      }
    },
    emptyCurrencyData() {
      this.currencyData = {
        id: 0,
        name: '',
        isoMark: '',
        symbol: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'currencies'
    ]),
  },
  mounted() {
    //If type is edit fetch currency to edit from store
    if(this.componentType === 'edit') {
      this.currencyData = this.$store.state.editCurrency;
    }
  },
  watch: {
    // This is in case if the component is already rendered with 'add' type
    componentType(newVal, oldVal) {
      if(newVal === 'edit') {
        this.currencyData = this.$store.state.editCurrency;
      } else if(newVal === 'add') {
        this.emptyCurrencyData();
      }
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.add-currency {
  min-width: 500px;
  max-width: 500px;
  border-left: 1px solid #ededed;

  &__nav {
    border-bottom: 1px solid #ededed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;

    &__first {
      display: flex;
      justify-content: center;
      align-items: center;

      .material-design-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-right: 10px;
      }

      h2 {
        margin: 0;
      }
    }

    &__last {
      display: flex;

      button {
        cursor: pointer;
        margin: 0 5px;
        border-radius: 4px;
        padding: 8px 10px;

        &.button-cancel {
          border: 1px solid #ededed;
          background-color: #fff;
          
        }

        &.button-save {
          background-color: #ff6600;
          color: #fff;
          border: none;
        }
      }
      
    }
  }

  &__currency-info {

    .addCurrencyForm {
      box-sizing: border-box;
      width: 100%;
      padding: 16px 20px;
      
      label {
        font-family: $font-primary-bold;
        margin-bottom: 4px;
        display: block;

        &:not(:first-of-type) {
          margin-top: 24px;
        }
      }

      input {
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 6px;
        font-size: 16px;
        outline: none;
        border: 1px solid $color-gray;

        &:focus {
          border: 1px solid $color-primary;
        }

        &.input-error {
          border: 1px solid $color-error;
        }
      }

      .error-required {
        color: $color-error;
      }
    }
  }
}
</style>
