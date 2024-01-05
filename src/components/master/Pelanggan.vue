<template>
     <div class="data-pelanggan">
      <div>
        <h3>Data Pelanggan</h3>
      </div>
        <Vue3EasyDataTable :headers="headers" :items="items" @click-row="handleRowClick"/>
    </div>

    <PopupInfoRapat v-if="isPopupShow"/>
    <!-- <div class="popup-data-pelanggan">
      asdasdas
    </div> -->
  </template>
  
<script>
import { Icon } from '@iconify/vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import PopupInfoRapat from '../meetings/PopupInfoRapat.vue';

  export default {
    components: {
      Icon,
      Vue3EasyDataTable,
      PopupInfoRapat
	},
    data() {
      return {
        sidebarActive: true,
        isPopupShow: false,
        headers: [
            { text: "CustomerNo", value: "CustomerNo" },
            { text: "CustomerName", value: "CustomerName"},
            ],
        items: [
            { CustomerNo: "024102930", CustomerName: "Stephen Curry"},  
            { CustomerNo: "029421952", CustomerName: "Lebron James"},
            { CustomerNo: "02195102", CustomerName: "Kevin Durant"},
            { CustomerNo: "029015010", CustomerName: "Giannis Antetokounmpo"},
          ]
      };
    },
    methods: {
      handleRowClick(item) {
        this.isPopupShow = true
        console.debug('item', item)
      }
    },
  };
  </script>
