<template>
  <div class="QrCodeWifi">
    <form class="QrCodeWifi__Content" @submit.prevent="validateForm">

      <b-field label="Nombre de la red">
        <b-input v-model="form.ssid"></b-input>
      </b-field>

      <b-field label="Seguridad">
        <div class="block">
          <b-radio
            v-for="encryption in encryptionTypes"
            v-bind:key="encryption.type"
            v-model="form.encryption"
            :name="encryption.type"
            :native-value="encryption.value">
            {{ encryption.type }}
          </b-radio>
        </div>
      </b-field>

      <b-field label="Password">
        <b-input v-model="form.password"></b-input>
      </b-field>

      <b-field label="Difusión">
        <div class="block">
          <b-checkbox v-model="form.hidden">
            SSID Oculto
          </b-checkbox>
        </div>
      </b-field>

      <div class="buttons" v-on:click="downloadQR">
        <b-button icon-left="download">
            Download
        </b-button>
      </div>

    </form>

    <div class="QRCodeCapture">
      <div class="QRCodeCapture__Image" id="capture">
        <qrcode-vue
          :value="qrString"
          :size="qr.size"
          :level="qr.level"
          :foreground="qr.color"
          :background="qr.bg"
          renderAs="canvas">
        </qrcode-vue>
      </div>
    </div>

  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import html2canvas from 'html2canvas';

import utils from '../utils';

export default {
  name: 'QrCodeWifi',

  data: () => ({
    ui: {
      loaded: true,
      state: 'process',
    },

    form: {
      ssid: '',
      encryption: 'WPA',
      password: '',
      hidden: false,
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
      // this.qr.value = utils.getWifiScript(this.form);
      // this.qr.show = true;
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
        this.saveAs(canvas.toDataURL(), `WifiQR_${this.form.ssid}.png`);
      });
    },
  },

  computed: {
    qrString() {
      return utils.getWifiScript(this.form);
    },
  },

  components: {
    QrcodeVue,
  },
};
</script>
