<template>
      <nav id="sidebar" :class="{ 'active': sidebarActive }">
        
        <ul class="list-unstyled components">
            <li class="text-white margin-top-10"><center><a id="font-size-10"><i class="fa fa-home windowed-sidebar" ></i><br> Home</a></center>
                <ul class="nav child_menu" style="display: none;">
                    <li><a href="index.html">Dashboard</a></li>
                    <li><a href="index2.html">Dashboard2</a></li>
                    <li><a href="index3.html">Dashboard3</a></li>
                </ul>
            </li>
            <li @click="showMasterList" class="text-white margin-top-10 pointer-cursor"><center><a id="font-size-10"><Icon icon="fluent-mdl2:master-database" class="windowed-sidebar" />  <br> Master</a></center>
                <ul v-if="showListMaster" class="list-unstyled components margin-top-24 list-master windowed-select-accounting ">
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-user"></i><a> Pelanggan</a></li>
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-credit-card"></i><a> Harga Umum</a></li>
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-building"></i><a> Daftar Kota</a></li>
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-map-pin"></i><a> Daftar Data Tujuan</a></li>
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-user-secret"></i><a> Daftar Pegawai</a></li>
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="mdi:chart-line" /><a> Chart of Account</a></li>
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="ri:admin-fill" /><a> Adminstrator</a></li>
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Admin Gerai Bandung</a></li>
                </ul>
            </li>
            <li @click="showAccountingList" class="text-white margin-top-10 pointer-cursor"><center><a id="font-size-10"><Icon icon="map:accounting" class="windowed-sidebar"/><br> Accounting </a></center>
                <ul v-if="showListAccounting" class="list-unstyled components margin-top-24 list-master windowed-select-accounting">
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-user"></i><a> Validasi POD Outbound</a></li>
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-credit-card"></i><a> Invoice Penjualan</a></li>
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-building"></i><a> Collector Sheet dan Pencairan</a></li>
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-map-pin"></i><a> Jurnal Penjualan PSS Bandung</a></li>
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-user-secret"></i><a> Catat Pembayaran Ke Jurnal</a></li>
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="mdi:chart-line" /><a> Entry Jurnal Memorial</a></li>
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="ri:admin-fill" /><a> Entry Biaya ke Jurnal</a></li>
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Edit Jurnal/Koreksi Jurnal</a></li>
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Ending Periode/Closing Jurnal</a></li>
                    <li class="text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Hapus Invoice Collect</a></li>
                </ul>
            </li>
        </ul>
      </nav>
  </template>
  
  <script>
  import { Icon } from '@iconify/vue';
  export default {
    components: {
		Icon,
	},
    data() {
      return {
        sidebarActive: true,
        showListMaster: false,
        showListAccounting: false
      };
    },
    methods: {
      toggleSidebar() {
        this.sidebarActive = !this.sidebarActive;
      },
      showMasterList() {
        if (this.showListAccounting) this.showListAccounting = false
        this.showListMaster = !this.showListMaster;
      },
      showAccountingList() {
        if (this.showListMaster) this.showListMaster = false
        this.showListAccounting = !this.showListAccounting;
      },
    },
  };
  </script>
