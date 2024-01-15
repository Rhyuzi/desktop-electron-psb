<template>
     <div class="data-pelanggan">
      <div>
        <h3>Data Kota</h3>

        <div class="display-flex search-pelanggan">
         <button class="btn btn-primary height-38">
            <i class="fas fa-search"></i>
         </button>
          <input v-model="search" @input="handleSearchChange" type="search" id="form1" class="form-control height-38" placeholder="Search Kota ..."/>
          <!-- <input type="search" v-model="search"> -->
            <!-- <i class="fas fa-search"></i> -->
          <button @click="onCreatePelanggan" class="btn btn-success height-38">
            <i class="fas fa-plus"></i>
            Tambah Data
          </button>
        </div>
        
      </div>
        <Vue3EasyDataTable :headers="headers" :items="dataCity" @click-row="handleRowClick"
        border-cell
        buttons-pagination
        alternating
        show-index
        :search-value="search"
        search-field="CustomerName"
        >
        <template #item-operation="{ item }">
            <div>
                <button @click="handleEditClick" class="btn btn-primary font-size-13 margin-4"><Icon icon="tabler:edit" />Edit</button>
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
    <PopupTambahKota v-if="onCreate" />
    <PopupEditKota v-if="onEdit"/>
    
    <!-- <div class="popup-data-pelanggan">
      asdasdas
    </div> -->
  </template>
  
<script>
import { Icon } from '@iconify/vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import PopupTambahKota from '../popups/master_kota/PopupTambahKota.vue';
import PopupEditKota from '../popups/master_kota/PopupEditKota.vue';
import { mapGetters } from 'vuex';

  export default {
    components: {
      Icon,
      Vue3EasyDataTable,
      PopupTambahKota,
      PopupEditKota
  },
    computed: {
      ...mapGetters({
          city: 'kota/getCitys',
      }),
      // filterOption() {
      //   const dataFilter = this.dataCity
      //   dataFilter.push({
      //     field: 'age',
      //   comparison: 'between',
      //   criteria: ageCriteria.value,
      //   })
      // }
    },
    data() {
      return {
        onEdit: false,
        search: '',
        dataClicked: {},
        sidebarActive: true,
        isPopupShow: false,
        onCreate: false,
        dataCity: [],
        headers: [
            { text: "CityID", value: "CityId", sortable: true },
            { text: "CityCode", value: "CityCode", sortable: true},                                 
            { text: "CityForward", value: "CityForward"},
            { text: "CityName", value: "CityName"},
            { text: "CityCountry", value: "CityCountry"},
            { text: "CityTransit", value: "CityTransit"},
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
      await this.getCity()
      console.debug('getCity',this.city)
    },
    methods: {
      onCreatePelanggan(){
        this.onCreate = true
      },
      
      async getCity(){
        const res =  await this.$store.dispatch('kota/getCity',{key: 'psb75'})
        this.dataCity = res.data
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
