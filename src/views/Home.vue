<template>
  <div class="Page">

    <!-- Header -->
    <HomeHeader />

    <!-- Instructions -->

    <!-- Form -->
    <div class="Section">
      <div class="Wrapper">

        <QrCodeWifi />

      </div>
    </div>
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader.vue';
import QrCodeWifi from '@/components/QrCodeWifi.vue';

export default {
  name: 'home',

  data: () => ({
    ui: {
      loaded: true,
      state: 'process',
    },
  }),

  components: {
    HomeHeader,
    QrCodeWifi,
  },
};
</script>
