<template>
  <div>
    <div class="container mx-auto">
      <div v-for="product of order.goods" :key="product.id">
        <div class="flex items-center">
          <img class="w-1/6" :src="product.image" alt="" />
          <div>
            <p class="text-xl font-bold">{{ product.title }}</p>
            <div class="my-2">
              <p v-for="ing of product.ingridients" :key="ing">
                {{ ing.title }}
              </p>
            </div>
            <p class="text-xl">Итого: {{ product.price }}тг</p>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between my-10">
        <p>{{ order.total }}</p>
        <button @click="finishOrder()">Заказать</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CartComp",
  data() {
    return {
      order: null,
      currentUser: localStorage.getItem("loggedUser"),
    };
  },
  async created() {
    let res = await axios.get(
      "https://627a34aa73bad506858480a8.mockapi.io/api/orders"
    );
    let unfinishedData = res.data;
    unfinishedData.forEach((item) => {
      if (item.userLogin === this.currentUser && item.status === false) {
        this.order = item;
      } else {
        console.log("не получилось");
      }
    });
  },
  methods: {
    async finishOrder() {
      this.order.status = true;
      await axios.put(
        "https://627a34aa73bad506858480a8.mockapi.io/api/orders/" +
          this.order.id,
        this.order
      );
      let newOrder = {
        goods: [],
        total: 0,
        userLogin: this.currentUser,
        status: false,
      };
      await axios.post("https://627a34aa73bad506858480a8.mockapi.io/api/orders", newOrder)
      this.$router.push('/')
    },
  },
};
</script>