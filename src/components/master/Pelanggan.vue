<template>
     <div class="data-pelanggan">
      <div>
        <h3>Data Pelanggan</h3>

        <div class="display-flex search-pelanggan">
         <button class="btn btn-primary height-38">
            <i class="fas fa-search"></i>
         </button>
          <input v-model="search" @input="handleSearchChange" type="search" id="form1" class="form-control height-38" placeholder="Search Pelanggan ..."/>
          <!-- <input type="search" v-model="search"> -->
            <!-- <i class="fas fa-search"></i> -->
          <button @click="onCreatePelanggan" class="btn btn-success height-38">
            <i class="fas fa-plus"></i>
            Tambah Data
          </button>
        </div>
        
      </div>
        <Vue3EasyDataTable :headers="headers" :items="dataPelanggan" @click-row="handleRowClick"
        border-cell
        buttons-pagination
        alternating
        show-index
        :search-value="search"
        search-field="CustName"
        >
        <template #item-operation="{ item }">
            <div>
                <button @click="handleDetailClick" class="btn btn-primary font-size-13 margin-4"><Icon icon="bx:detail" />Detail</button>
                <button class="btn btn-primary font-size-13 margin-4"><Icon icon="tabler:edit" />Edit</button>
            </div>
        </template>
        <template #loading>
          <img
            src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
            style="width: 100px; height: 80px;"
          />

  </template>

      </Vue3EasyDataTable>
    </div>

    <PopupInfoRapat v-if="isPopupShow"/>
    <PopupTambahPelanggan v-if="onCreate" />
    <!-- <div class="popup-data-pelanggan">
      asdasdas
    </div> -->
  </template>
  
<script>
import { Icon } from '@iconify/vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import PopupInfoRapat from '../meetings/PopupInfoRapat.vue';
import PopupTambahPelanggan from '../popups/master_pelanggan/PopupTambahPelanggan.vue';
import { mapGetters } from 'vuex';

  export default {
    components: {
      Icon,
      Vue3EasyDataTable,
      PopupInfoRapat,
      PopupTambahPelanggan
  },
    computed: {
      ...mapGetters({
          pelanggan: 'pelanggan/getPelanggans',
      }),
    },
    data() {
      return {
        search: '',
        dataClicked: {},
        sidebarActive: true,
        isPopupShow: false,
        onCreate: false,
        dataPelanggan: [],
        headers: [
            { text: "CustomerNo", value: "CustNo" },
            { text: "CustomerName", value: "CustName"},
            { text: "Operasi", value: "operation"}
            ],
        items: [
            { CustomerNo: "024102930", CustomerName: "Stephen Curry"},  
            { CustomerNo: "029421952", CustomerName: "Lebron James"},
            { CustomerNo: "02195102", CustomerName: "Kevin Durant"},
            { CustomerNo: "029015010", CustomerName: "Giannis Antetokounmpo"},
          ]
      };
    },
    async mounted() {
      await this.getPelanggan()
      console.debug('pelanggans',this.pelanggan)
    },
    methods: {
      onCreatePelanggan(){
        this.onCreate = true
      },
      
       async getPelanggan(){
        const res =  await this.$store.dispatch('pelanggan/getPelanggan',{key: 'psb75'})
        this.dataPelanggan = res.data
        console.debug('dataaaa',res)
      },
      handleRowClick(item) {
        this.dataClicked = item
        console.debug('dataaaa',this.dataClicked)
      },
      handleDetailClick(){
        setTimeout(() => {
          console.debug('dataaaa detail jing',this.dataClicked)
          this.isPopupShow = true
        }, 100);
      },
      handleSearchChange() {
        this.search = this.search.toUpperCase();
      },
    },
  };
  </script>
