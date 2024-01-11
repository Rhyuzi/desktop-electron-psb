<template>
	<div class="overlay" id="popupOverlay">
        <div class="popup-tambah-pelanggan">
			<div class="popup-header">
				<h3 class="title-popup-detail">Edit Pelanggan</h3>
				<div class="cursor-pointer" @click="this.$parent.onEdit = false">
					<i class="fa fa-times" aria-hidden="true"></i>
				</div>
			</div>
            <div class="overflow-auto">
                <form @submit.prevent="submitData">
                    <div class="form-group">
                        <label for="accno">Acc No</label>
                        <input v-model="state.accno" type="text" class="form-control" aria-describedby="accno" placeholder="Masukan Acc No">
                        <small v-if="v$.state.accno.$error" class="form-text text-muted text-danger">{{ v$.state.accno.$errors[0].$message }}</small>
                    </div>
    
                    <div class="form-group">
                        <label for="nama">Nama</label>
                        <input v-model="state.nama" type="text" class="form-control" aria-describedby="nama" placeholder="Masukan Nama">
                        <small v-if="v$.state.nama.$error" class="form-text text-muted text-danger">{{ v$.state.nama.$errors[0].$message }}</small>
                    </div>
    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input v-model="state.email" type="text" class="form-control" aria-describedby="email" placeholder="Masukan Email">
                        <small v-if="v$.state.email.$error" class="form-text text-muted text-danger">{{ v$.state.email.$errors[0].$message }}</small>
                    </div>
    
                    <div class="form-group">
                        <label for="nohp">No HP</label>
                        <input v-model="state.nohp" type="text" class="form-control" aria-describedby="nohp" placeholder="Masukan No HP">
                        <small v-if="v$.state.nohp.$error" class="form-text text-muted text-danger">{{ v$.state.nohp.$errors[0].$message }}</small>
                    </div>
                    
                    <div class="form-group">
                        <label for="alamat">Alamat</label>
                        <input v-model="state.alamat" type="text" class="form-control" aria-describedby="alamat" placeholder="Masukan Alamat">
                        <small v-if="v$.state.alamat.$error" class="form-text text-muted text-danger">{{ v$.state.alamat.$errors[0].$message }}</small>
                    </div>
    
                    <div class="form-group">
                        <label for="kategori">Kategori</label>
                        <select v-model="state.kategori" class="form-control" id="kategori">
                            <option selected>--Pilih Kategori--</option>
                            <option v-for="s in statList" :value="s.id">{{ s.CC_Nama }}</option>
                        </select>
                        <small v-if="v$.state.kategori.$error" class="form-text text-muted text-danger">{{ v$.state.kategori.$errors[0].$message }}</small>
                    </div>
    
                    <div class="form-group">
                        <label for="bisnis">Bussines</label>
                        <select v-model="state.bisnis" class="form-control" id="bisnis">
                            <option selected>--Pilih Bisnis--</option>
                            <option v-for="s in bussList" :value="s.id">{{ s.CB_Nama }}</option>
                        </select>
                        <small v-if="v$.state.bisnis.$error" class="form-text text-muted text-danger">{{ v$.state.bisnis.$errors[0].$message }}</small>
                    </div>
                    
                    <div class="form-group">
                        <label for="sales">Sales</label>
                        <select v-model="state.sales" class="form-control" id="sales">
                            <option selected>--Pilih Sales--</option>
                            <option v-for="s in salesList" :value="s.id">{{ s.PegawaiNama }}</option>
                        </select>
                        <small v-if="v$.state.sales.$error" class="form-text text-muted text-danger">{{ v$.state.sales.$errors[0].$message }}</small>
                    </div>
    
                    <div class="form-group margin-bottom-20">
                        <label for="lokasi">Lokasi</label>
                        <select v-model="state.lokasi" class="form-control" id="lokasi">
                            <option selected>--Pilih Lokasi--</option>
                            <option v-for="s in locList" :value="s.DefaultCityNo">{{ s.DefaultCityName }}</option>
                        </select>
                        <small v-if="v$.state.lokasi.$error" class="form-text text-muted text-danger">{{ v$.state.lokasi.$errors[0].$message }}</small>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue'
import useValidate from '@vuelidate/core'
import { required, numeric, maxLength, helpers, email } from '@vuelidate/validators'
export default {
	components: { Icon },
	data() {
		return {
            locList: [],
            bussList: [],
            statList: [],
            salesList: [],
			beHostForm: false,
            v$: useValidate(),
			hostCode: "",
			clickMenu: 'informasi-umum',
			data: {},
            state: {
                accno: this.$parent.dataClicked.CustNo,
                nama: this.$parent.dataClicked.CustName,
                email: this.$parent.dataClicked.CustEmail,
                nohp: this.$parent.dataClicked.CustTelp,
                alamat: this.$parent.dataClicked.CustAddr,
                kategori: this.$parent.dataClicked.CustCategory,
                bisnis: this.$parent.dataClicked.CustBussType,
                sales: this.$parent.dataClicked.CustSales,
                lokasi: this.$parent.dataClicked.CustLocation
            }
		}
	},
	validations() {
		return {
            state: {
                accno: {
                    required: helpers.withMessage("Harus diisi", required),
                },
                nama: {
                    required: helpers.withMessage("Nama harus diisi", required),
                },
                email: {
                    required: helpers.withMessage("Email harus diisi", required),
                },
                nohp: {
                    required: helpers.withMessage("No Telpon harus diisi", required),
                },
                alamat: {
                    required: helpers.withMessage("Alamat harus diisi", required),
                },
                kategori: {
                    required: helpers.withMessage("Kategori harus diisi", required),
                },
                bisnis: {
                    required: helpers.withMessage("Bisnis harus diisi", required),
                },
                sales: {
                    required: helpers.withMessage("Sales harus diisi", required),
                },
                lokasi: {
                    required: helpers.withMessage("Lokasi harus diisi", required),
                }
            }
		}
	},
	async mounted(){
        await this.getStatusList()
        await this.getBussinesList()
        await this.getLocationList()
        await this.getSalesList()
		console.debug('dataaaa child',this.$parent.dataClicked)
		this.data = this.$parent.dataClicked
	},
	methods: {
       async submitData() {
            this.v$.$validate()
            console.error('cons',this.v$.$error)
            if (!this.v$.$error) {
                const param = {
                    accno: this.state.accno,
                    nama: this.state.nama,
                    email: this.state.email,
                    nohp: this.state.nohp,
                    alamat: this.state.alamat,
                    kategori: this.state.kategori,
                    bisnis: this.state.bisnis,
                    sales: this.state.sales,
                    lokasi: this.state.lokasi,
                    user: "AMIR SYAH",
                    cloc: "7669"
                }
                const res = await this.$store.dispatch('pelanggan/updateCustomer', param)
                if (res.error == false) {
                    this.toast(res.message, 'bg-more-black', 3000)
                    this.$parent.onEdit = false
                }else {
                    this.toast(res.message, 'bg-more-black', 3000)
                }
                console.debug('res',res)
            }
        },
		async getBussinesList(){
        const res =  await this.$store.dispatch('pelanggan/getBussinesList',{key: 'psb75'})
        this.bussList = res.data
        console.debug('dataaaa',res)
      },
      async getLocationList(){
        const res =  await this.$store.dispatch('pelanggan/getLocation',{key: 'psb75'})
        this.locList = res.data
        console.debug('dataaaa',res)
      },
      async getStatusList(){
        const res =  await this.$store.dispatch('pelanggan/getStatusList',{key: 'psb75'})
        this.statList = res.data
        console.debug('statList',res)
      },
      async getSalesList(){
        const res =  await this.$store.dispatch('pelanggan/getSalesList',{key: 'psb75'})
        this.salesList = res.data
        console.debug('dataaaa',res)
      },
		
	}
}
</script>

<style lang="scss">
.meeting-popup {
	position: absolute;
	left: 74px;
	top: 72px;
	background-color: #202020;
	padding: 25px 30px 35px;
	border-radius: 5px;
	width: 518px;
	z-index: 1;
	.close-button {
		position: absolute;
		top: 15px;
		right: 15px;
		color: #9B9999;
		cursor: pointer;
	}
}
</style>