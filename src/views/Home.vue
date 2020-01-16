<template>
  <div class="Page">

    <!-- Header -->

    <!-- Instructions -->

    <!-- Form -->

    <form @submit.prevent="validateForm">
      <div class="field-group">
        <input type="text" name="" v-model="form.ssid" placeholder="">
      </div>
      <div class="field-group">
        <select name="" v-model="form.encryption">
          <option
            v-for="encryption in encryptionTypes"
            v-bind:key="encryption.type"
            :value="encryption.value">
            {{ encryption.type }}
          </option>
        </select>
      </div>
      <div class="field-group">
        <input type="text" name="" v-model="form.password" placeholder="">
      </div>
      <div class="field-group">
        <button @click="validateForm">Generar QR</button>
        <button @click="downloadQR">Download</button>
      </div>
    </form>

    <br>

    <div v-if="qr.show" id="capture">
      <qrcode-vue
        :value="qr.value"
        :size="qr.size"
        :level="qr.level"
        :foreground="qr.color"
        :background="qr.bg"
        renderAs="canvas">
      </qrcode-vue>
    </div>

    <!-- QR Code -->

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import QrcodeVue from 'qrcode.vue';
import html2canvas from 'html2canvas';

import utils from '../utils';

export default {
  name: 'home',

  data: () => ({
    ui: {
      loaded: true,
      state: 'process',
    },

    form: {
      ssid: '',
      encryption: '',
      password: '',
    },

    encryptionTypes: [
      { type: 'WPA/WPA2', value: 'WPA' },
      { type: 'WEP', value: 'WEP' },
      { type: 'None', value: '' },
    ],

    qr: {
      value: '',
      size: 240,
      show: false,
      color: '#34495e',
      bg: '#2ecc71',
      level: 'L',
    },
  }),

  mounted() {
    this.form.ssid = 'HomeWifi';
    this.form.encryption = 'WPA';
    this.form.password = 'b0x1RGRu1d';
  },

  methods: {
    validateForm() {
      this.qr.value = utils.getWifiScript(this.form);
      this.qr.show = true;
    },
    saveAs(uri, filename) {
      const link = document.createElement('a');
      if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(uri);
      }
    },
    downloadQR() {
      html2canvas(document.querySelector('#capture')).then((canvas) => {
        this.saveAs(canvas.toDataURL(), 'file-name.png');
      });
    },
  },

  components: {
    QrcodeVue,
  },
};
</script>
