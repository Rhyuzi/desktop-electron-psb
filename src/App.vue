<template>
	<dialog-konfirmasi />
	<toast />
	<router-view />
</template>

<script>
import DialogKonfirmasi from './components/popups/DialogKonfirmasi.vue'
import Toast from './components/popups/Toast.vue'
export default {
	components: { DialogKonfirmasi, Toast },
}
</script>