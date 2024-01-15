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
        search-field="CustomerName"
        :loading="isLoading"
        >
        <template #item-operation="{ item }">
            <div>
                <button @click="handleDetailClick" class="btn btn-primary font-size-13 margin-4"><Icon icon="bx:detail" />Detail</button>
                <button @click="handleEditClick" class="btn btn-primary font-size-13 margin-4"><Icon icon="tabler:edit" />Edit</button>
            </div>
        </template>
        <template #loading>
          <div class="loading-spinner">
            <!-- Customize the spinner style here -->
            <div class="spinner"></div>
          </div>
        </template>
      </Vue3EasyDataTable>
    </div>

    <PopupDetailPelanggan v-if="isPopupShow"/>
    <PopupTambahPelanggan v-if="onCreate" />
    <PopupEditPelanggan v-if="onEdit"/>
    
    <!-- <div class="popup-data-pelanggan">
      asdasdas
    </div> -->
  </template>
  
<script>
import { Icon } from '@iconify/vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import PopupDetailPelanggan from '../popups/master_pelanggan/PopupDetailPelanggan.vue';
import PopupTambahPelanggan from '../popups/master_pelanggan/PopupTambahPelanggan.vue';
import PopupEditPelanggan from '../popups/master_pelanggan/PopupEditPelanggan.vue';
import { mapGetters } from 'vuex';

  export default {
    components: {
      Icon,
      PopupDetailPelanggan,
      PopupEditPelanggan,
      Vue3EasyDataTable,
      PopupTambahPelanggan
  },
    computed: {
      ...mapGetters({
          pelanggan: 'pelanggan/getPelanggan',
      }),
    },
    data() {
      return {
        isLoading: true,
        onEdit: false,
        search: '',
        dataClicked: {},
        sidebarActive: true,
        isPopupShow: false,
        onCreate: false,
        dataPelanggan: [],
        headers: [
            { text: "CustomerNo", value: "CustomerNo" },
            { text: "CustomerName", value: "CustomerName"},
            { text: "Operasi", value: "operation"}
            ],
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

        if (res.error == false) {
          this.dataPelanggan = res.data
          this.isLoading = false
          // this.toast(res.message, 'bg-light-green', 3000)
        }else {
          this.isLoading = false
          this.toast(res.message, 'bg-red', 3000)
        }
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
      handleEditClick(){
        setTimeout(() => {
          this.onEdit = true
        }, 100);
      },
      handleSearchChange() {
        this.search = this.search.toUpperCase();
      },
    },
  };
  </script>
<style>
.loading-spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db; /* Change color as needed */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>