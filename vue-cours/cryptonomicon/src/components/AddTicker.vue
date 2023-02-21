<template>
  <section>
    <div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="block text-sm font-medium text-gray-700"
        >Тикер</label
        >
        <div class="mt-1 relative rounded-md shadow-md">
          <input
            v-model="ticker"
            @input="messageValidTicker = ''"
            @keydown.enter="add"
            type="text"
            name="wallet"
            id="wallet"
            class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            placeholder="Например DOGE"
          />
        </div>
        <div
          class="flex bg-white shadow-md p-0 rounded-md shadow-md flex-wrap"
        >
              <span
                v-for="(item, index) in filteredTickers"
                :key="index"
                class="p-1 inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
                @click="
                  ticker = item;
                  add(ticker);
                "
              >
                {{ item }}
              </span>
        </div>
        <div class="text-sm text-red-600">
          {{ messageValidTicker }}
        </div>
      </div>
    </div>
    <add-button @add-button="add"/>
  </section>
</template>

<script>
import AddButton from "@/components/AddButton";
export default {
  name: "AddTicker",
  components: {
    AddButton
  },

  props: {
    messageValidTicker: String,
    filteredTickers: []
  },

  data() {
    return {
      ticker: "",
    }
  },

  methods: {
    add() {
        this.$emit('add-ticker', this.ticker)
        this.ticker = "";
      }
    }
};
</script>

<style scoped>

</style>