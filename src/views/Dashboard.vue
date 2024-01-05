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
          <Pelanggan />
        </div>
      </div>
    </div>
  </template>
  
<script>
import { Icon } from '@iconify/vue';
import SideBarFull from '../components/sidebar/SideBarFull.vue'
import SideBarHalf from '../components/sidebar/SideBarHalf.vue'
import Pelanggan from '../components/master/Pelanggan.vue';

  export default {
    components: {
      Icon,
      SideBarFull,
      SideBarHalf,
      Pelanggan,
	},
    data() {
      return {
        sidebarActive: true,
        
      };
    },
    methods: {
      toggleSidebar() {
        if (this.sidebarActive) {
          // sidebar
            var element = document.getElementById("sidebarCollapse")
            var elementContent = document.getElementById("content")
            var sidebar = document.getElementById("sidebar")
            element.classList.remove("toggle-bar")
            element.classList.add('toggle-bar-minimize')

            elementContent.classList.remove("margin-content")
            elementContent.classList.add('margin-content-minimize')
            sidebar.classList.remove("width-235")
        }else {
            var element = document.getElementById("sidebarCollapse")
            var elementContent = document.getElementById("content")
            element.classList.remove("toggle-bar-minimize")
            element.classList.add('toggle-bar')

            elementContent.classList.remove("margin-content-minimize")
            elementContent.classList.add('margin-content')
            
        }
        this.sidebarActive = !this.sidebarActive;
      },
    },
  };
  </script>
