<template>
      <nav id="sidebar" class="width-235 overflow-auto" :class="{ 'active': sidebarActive }">
        <div class="sidebar-header">
          <h3 class="text-white">Your Sidebar Title</h3>
        </div>
        <ul class="list-unstyled components">
            <li class="text-white margin-top-10"><a id="font-size-13"><i class="fa fa-home"></i> Home <span class="fa fa-chevron-down float-right"></span></a>
                <ul class="nav child_menu" style="display: none;">
                    <li><a href="index.html">Dashboard</a></li>
                    <li><a href="index2.html">Dashboard2</a></li>
                    <li><a href="index3.html">Dashboard3</a></li>
                </ul>
            </li>
            <li @click.stop="showMasterList" class="text-white margin-top-10 pointer-cursor"><a id="font-size-13"><Icon icon="fluent-mdl2:master-database" /> Master <span class="fa fa-chevron-down float-right"></span></a>
                <ul v-if="showListMaster" class="list-unstyled components margin-top-24 list-master margin-left-21">
                    <li @click.stop="toPelanggan" class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-user"></i><a> Pelanggan</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-credit-card"></i><a> Harga Umum</a></li>
                    <li @click.stop="toKota" class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-building"></i><a> Daftar Kota</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-map-pin"></i><a> Daftar Data Tujuan</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-user-secret"></i><a> Daftar Pegawai</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="mdi:chart-line" /><a> Chart of Account</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="ri:admin-fill" /><a> Adminstrator</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Admin Gerai Bandung</a></li>
                </ul> 
            </li>
            <li @click.stop="showTransaksiList" class="text-white margin-top-10 pointer-cursor"><a id="font-size-13"><Icon icon="fluent-mdl2:master-database" /> Transaksi <span class="fa fa-chevron-down float-right"></span></a>
                <ul v-if="showListTransaksi" class="list-unstyled components margin-top-24 list-master margin-left-21">
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-user"></i><a> PickUp Order</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-credit-card"></i><a> Catat Complain Pelanggan</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-building"></i><a> Monitoring Barang</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-map-pin"></i><a> SMS Balasan</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-user-secret"></i><a> Daftar Pelanggan Baru</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="mdi:chart-line" /><a> Biaya Pengirimin</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="ri:admin-fill" /><a> Kunjungan Sales</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Penjualan CASH Counter</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Entry dan Edit POD</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Entry Data Inbound</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Entry Data Inbound & Status</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Status Pengiriman</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Manifest Retur POD</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Manifest Retur Fisik</a></li>
                </ul> 
            </li>
            <li @click.stop="showAccountingList" class="text-white margin-top-10 pointer-cursor"><a id="font-size-13"><Icon icon="map:accounting" /> Accounting <span class="fa fa-chevron-down float-right"></span></a>
                <ul v-if="showListAccounting" class="list-unstyled components margin-top-24 list-master margin-left-21">
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-user"></i><a> Validasi POD Outbound</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-credit-card"></i><a> Invoice Penjualan</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-building"></i><a> Collector Sheet dan Pencairan</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-map-pin"></i><a> Jurnal Penjualan PSS Bandung</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-user-secret"></i><a> Catat Pembayaran Ke Jurnal</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="mdi:chart-line" /><a> Entry Jurnal Memorial</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="ri:admin-fill" /><a> Entry Biaya ke Jurnal</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Edit Jurnal/Koreksi Jurnal</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Ending Periode/Closing Jurnal</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Hapus Invoice Collect</a></li>
                </ul>
            </li>
            <li @click.stop="showLaporanList" class="text-white margin-top-10 pointer-cursor"><a id="font-size-13"><Icon icon="fluent-mdl2:master-database" /> Laporan <span class="fa fa-chevron-down float-right"></span></a>
                <ul v-if="showListLaporan" class="list-unstyled components margin-top-24 list-master margin-left-21">
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-user"></i><a> Lacak POD</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-credit-card"></i><a> non-Fisik/non-Manifest</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-building"></i><a> Status Pengiriman</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-map-pin"></i><a> Customer Service Officer</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-user-secret"></i><a> Outbound Shipment</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="mdi:chart-line" /><a> Inbound Shipment</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="ri:admin-fill" /><a> Outstanding/Posisi Saldo Akhir</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Outbound Sales Shipment</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Komisi dan Insentif Marketing</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> POD belum dibuat invoice</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Outbound / SMU fee</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Forward fee</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Penjualan Cash Harian</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Rekapitulasi Pembayaran Gerai</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Collecting Monitoring</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Jadwal CAIR Kontrabon/Giro</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Monitoring Invoice</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Monitoring Invoice by Periode</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Prediksi R/L</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Rekapitulasi Invoice</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> General Ledger</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Kartu Piutang</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><Icon icon="clarity:building-solid" /><a> Absensi Karyawan</a></li>
                </ul> 
            </li>
            <li @click.stop="showLainnyaList" class="text-white margin-top-10 pointer-cursor"><a id="font-size-13"><Icon icon="fluent-mdl2:master-database" /> Lainnya <span class="fa fa-chevron-down float-right"></span></a>
                <ul v-if="showListLainnya" class="list-unstyled components margin-top-24 list-master margin-left-21">
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-user"></i><a> Registrasi dan Distribusi POD</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-credit-card"></i><a> Download/Sinkronasi Data</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-building"></i><a> Rubah Password</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-map-pin"></i><a> Edit Status Pengiriman</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-user-secret"></i><a> Refresh ZERO_DATE</a></li>
                </ul> 
            </li>
            <li @click.stop="showWindowsList" class="text-white margin-top-10 pointer-cursor"><a id="font-size-13"><Icon icon="fluent-mdl2:master-database" /> Windows <span class="fa fa-chevron-down float-right"></span></a>
                <ul v-if="showListWindows" class="list-unstyled components margin-top-24 list-master margin-left-21">
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-user"></i><a> Informasi Umum</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-credit-card"></i><a> Cascade</a></li>
                    <li class="li-sidebar text-white margin-top-10 margin-left-12 font-size-10"><i class="fa fa-building"></i><a> Tile Horizontal</a></li>
                </ul> 
            </li>
        </ul>

        <div class="menu-bottom display-flex">
          <!-- <div>
            <a><i class="fa fa-cog"></i></a>
          </div>
          <div>
            <a><i class="fa fa-power-off"></i></a>
          </div> -->
        </div>
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
        showListAccounting: false,
        showListWindows: false,
        showListLainnya: false,
        showListLaporan: false,
        showListTransaksi: false
      };
    },
    mounted() {
      this.layoutActive()
    },
    methods: {
      layoutActive() {
        switch (location.search) {
          case '?master=pelanggan':
              this.showListMaster = true
              console.error(location.search)
            break;
          case '?master=kota':
              this.showListMaster = true
              console.error(location.search)
            break;
          default:
            break;
        }
      },
      toggleSidebar() {
        this.sidebarActive = !this.sidebarActive;
      },
      showMasterList() {
        if (this.showListTransaksi) this.showListTransaksi = false
        if (this.showListAccounting) this.showListAccounting = false
        if (this.showListLaporan) this.showListLaporan = false
        if (this.showListLainnya) this.showListLainnya = false
        if (this.showListWindows) this.showListWindows = false

        this.showListMaster = !this.showListMaster;
      },
      showAccountingList() {
        if (this.showListMaster) this.showListMaster = false
        if (this.showListTransaksi) this.showListTransaksi = false
        if (this.showListLaporan) this.showListLaporan = false
        if (this.showListLainnya) this.showListLainnya = false
        if (this.showListWindows) this.showListWindows = false

        this.showListAccounting = !this.showListAccounting;
      },
      showWindowsList() {
        if (this.showListMaster) this.showListMaster = false
        if (this.showListAccounting) this.showListAccounting = false
        if (this.showListLaporan) this.showListLaporan = false
        if (this.showListLainnya) this.showListLainnya = false
        if (this.showListTransaksi) this.showListTransaksi = false

        this.showListWindows = !this.showListWindows;
      },
      showLainnyaList() {
        if (this.showListMaster) this.showListMaster = false
        if (this.showListAccounting) this.showListAccounting = false
        if (this.showListLaporan) this.showListLaporan = false
        if (this.showListTransaksi) this.showListTransaksi = false
        if (this.showListWindows) this.showListWindows = false

        this.showListLainnya = !this.showListLainnya;
      },
      showLaporanList() {
        if (this.showListMaster) this.showListMaster = false
        if (this.showListAccounting) this.showListAccounting = false
        if (this.showListTransaksi) this.showListTransaksi = false
        if (this.showListLainnya) this.showListLainnya = false
        if (this.showListWindows) this.showListWindows = false
        
        this.showListLaporan = !this.showListLaporan;
      },
      showTransaksiList() {
        if (this.showListMaster) this.showListMaster = false
        if (this.showListAccounting) this.showListAccounting = false
        if (this.showListLaporan) this.showListLaporan = false
        if (this.showListLainnya) this.showListLainnya = false
        if (this.showListWindows) this.showListWindows = false

        this.showListTransaksi = !this.showListTransaksi;
      },
      toPelanggan() {
        const currentQuery = this.$route.query;
        this.$router.push({ query: { ...currentQuery, master: 'pelanggan' } });
        this.$parent.toPelanggan = true
        this.$parent.toKota = false
      },
      toKota(){
        const currentQuery = this.$route.query;
        this.$router.push({ query: { ...currentQuery, master: 'kota' } });
        this.$parent.toPelanggan = false
        this.$parent.toKota = true
      }
    },
  };
  </script>
