<template>
    <div class="display-flex">

      
      <SideBarFull v-if="sidebarActive"/>
      <SideBarHalf v-else/>
     
      <div class="content-dashboard margin-content" id="content">
        <div>
            <button @click="toggleSidebar" type="button" id="sidebarCollapse" class="btn btn-dark toggle-bar">
            <i class="fas fa-bars"></i> </button>
        </div>

        <h1>INI KONTENNNNN</h1>
      </div>

      <!-- <div class="content">
        <h1>Ini KONTEN</h1>
      </div> -->
    </div>
  </template>
  
  <script>
  import { Icon } from '@iconify/vue';
  import SideBarFull from '../components/sidebar/SideBarFull.vue'
  import SideBarHalf from '../components/sidebar/SideBarHalf.vue'
  export default {
    components: {
		Icon,
        SideBarFull,
        SideBarHalf
	},
    data() {
      return {
        sidebarActive: true,
      };
    },
    methods: {
      toggleSidebar() {
        if (this.sidebarActive) {
            var element = document.getElementById("sidebarCollapse")
            var elementContent = document.getElementById("content")
            element.classList.remove("toggle-bar")
            element.classList.add('toggle-bar-minimize')

            elementContent.classList.remove("margin-content")
            elementContent.classList.add('margin-content-minimize')
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
