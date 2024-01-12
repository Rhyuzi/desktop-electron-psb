<template>
    <div class="display-flex">

      
      <SideBarFull v-if="sidebarActive"/>
      <SideBarHalf v-else/>

      
     
      <div class="content-dashboard margin-content" id="content">
        <div class="menu-bar-top">
          <div class="display-flex justify-content-end"><div class="user-menu-top"><Icon icon="fluent:person-12-filled" />Adminstrator</div> </div>
        </div>
        <div>
            <button @click="toggleSidebar" type="button" id="sidebarCollapse" class="btn btn-dark toggle-bar">
            <i class="fas fa-bars"></i> </button>
        </div>
        <div class="fixed-content">
          <Pelanggan v-if="toPelanggan"/>
          <Kota v-if="toKota"/>
        </div>
      </div>
    </div>
  </template>
  
<script>
import { Icon } from '@iconify/vue';
import SideBarFull from '../components/sidebar/SideBarFull.vue'
import SideBarHalf from '../components/sidebar/SideBarHalf.vue'
import Pelanggan from '../components/master/Pelanggan.vue';
import Kota from '../components/master/Kota.vue';

  export default {
    components: {
      Icon,
      SideBarFull,
      SideBarHalf,
      Pelanggan,
      Kota
	},
    data() {
      return {
        sidebarActive: true,
        toPelanggan: false,
        toKota: true
      };
    },
    methods: {
      toggleSidebar() {
        if (this.sidebarActive) {
          // sidebar
            const element = document.getElementById("sidebarCollapse")
            const elementContent = document.getElementById("content")
            const sidebar = document.getElementById("sidebar")
            element.classList.remove("toggle-bar")
            element.classList.add('toggle-bar-minimize')

            elementContent.classList.remove("margin-content")
            elementContent.classList.add('margin-content-minimize')
            sidebar.classList.remove("width-235")
            sidebar.classList.remove("overflow-auto")
        }else {
            const element = document.getElementById("sidebarCollapse")
            const elementContent = document.getElementById("content")
            const sidebar = document.getElementById("sidebar")
            element.classList.remove("toggle-bar-minimize")
            element.classList.add('toggle-bar')

            sidebar.classList.add("overflow-auto")
            elementContent.classList.remove("margin-content-minimize")
            elementContent.classList.add('margin-content')
            
        }
        this.sidebarActive = !this.sidebarActive;
      },
    },
  };
  </script>
