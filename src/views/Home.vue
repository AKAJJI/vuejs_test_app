<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <Jumbo />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Jumbo from "@/components/Jumboltron.vue";

export default {
  name: "Home",
  components: {
    Jumbo
  }
};
</script>
