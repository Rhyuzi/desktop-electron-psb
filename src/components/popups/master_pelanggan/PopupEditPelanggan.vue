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

                    <div class="display-flex">
                        <div class="fluid-form-input margin-top-10 width-95">
                            <input type="text" v-model="state.accno" id="noacc" placeholder="No Acc" min="0" class="fluid-input" :class="state.accno == '' ? (v$.state.accno.$error ? 'has-error' : '') : (v$.state.accno.$error ? 'has-error' : 'no-error')">
                            <label id="accno" for="accno" class="fluid-label" :class="state.accno == '' ? (v$.state.accno.$error ? 'has-error' : 'no-error') : (v$.state.accno.$error ? 'has-error d-block' : 'no-error d-block')">No Acc</label>
                            <div v-if="v$.state.accno.$error" class="label-error">
                                <Icon icon="ep:warning-filled" height="13" />
                                <p class="error-text">{{ v$.state.accno.$errors[0].$message }}</p>
                            </div>
                        </div>
        
                        <div class="fluid-form-input margin-top-10 width-95">
                            <input type="text" v-model="state.nama" id="nama" placeholder="Nama" min="0" class="fluid-input" :class="state.nama == '' ? (v$.state.nama.$error ? 'has-error' : '') : (v$.state.nama.$error ? 'has-error' : 'no-error')">
                            <label id="nama" for="nama" class="fluid-label" :class="state.nama == '' ? (v$.state.nama.$error ? 'has-error' : 'no-error') : (v$.state.nama.$error ? 'has-error d-block' : 'no-error d-block')">Nama</label>
                            <div v-if="v$.state.nama.$error" class="label-error">
                                <Icon icon="ep:warning-filled" height="13" />
                                <p class="error-text">{{ v$.state.nama.$errors[0].$message }}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="display-flex">
                        <!-- <div class="fluid-form-input margin-top-10 width-95">
                            <input type="text" v-model="state.email" id="email" placeholder="Email" min="0" class="fluid-input" :class="state.email == '' ? (v$.state.email.$error ? 'has-error' : '') : (v$.state.email.$error ? 'has-error' : 'no-error')">
                            <label id="email" for="email" class="fluid-label" :class="state.email == '' ? (v$.state.email.$error ? 'has-error' : 'no-error') : (v$.state.email.$error ? 'has-error d-block' : 'no-error d-block')">Email</label>
                            <div v-if="v$.state.email.$error" class="label-error">
                                <Icon icon="ep:warning-filled" height="13" />
                                <p class="error-text">{{ v$.state.email.$errors[0].$message }}</p>
                            </div>
                        </div> -->
    
                        <div class="fluid-form-input margin-top-10 width-95">
                            <input type="text" v-model="state.nohp" id="nohp" placeholder="No HP" min="0" class="fluid-input" :class="state.nohp == '' ? (v$.state.nohp.$error ? 'has-error' : '') : (v$.state.nohp.$error ? 'has-error' : 'no-error')">
                            <label id="nohp" for="nohp" class="fluid-label" :class="state.nohp == '' ? (v$.state.nohp.$error ? 'has-error' : 'no-error') : (v$.state.nohp.$error ? 'has-error d-block' : 'no-error d-block')">nohp</label>
                            <div v-if="v$.state.nohp.$error" class="label-error">
                                <Icon icon="ep:warning-filled" height="13" />
                                <p class="error-text">{{ v$.state.nohp.$errors[0].$message }}</p>
                            </div>
                        </div>
                    </div>

                    
                    <!-- <div class="form-group">
                        <label for="alamat">Alamat</label>
                        <input v-model="state.alamat" type="text" class="form-control" aria-describedby="alamat" placeholder="Masukan Alamat">
                        <small v-if="v$.state.alamat.$error" class="form-text text-muted text-danger">{{ v$.state.alamat.$errors[0].$message }}</small>
                    </div> -->

                    <div class="fluid-form-input margin-top-10 width-65perc">
                        <input type="text" v-model="state.alamat" id="alamat" placeholder="Alamat" min="0" class="fluid-input" :class="state.alamat == '' ? (v$.state.alamat.$error ? 'has-error' : '') : (v$.state.alamat.$error ? 'has-error' : 'no-error')">
                        <label id="alamat" for="alamat" class="fluid-label" :class="state.alamat == '' ? (v$.state.alamat.$error ? 'has-error' : 'no-error') : (v$.state.alamat.$error ? 'has-error d-block' : 'no-error d-block')">Alamat</label>
                        <div v-if="v$.state.alamat.$error" class="label-error">
                            <Icon icon="ep:warning-filled" height="13" />
                            <p class="error-text">{{ v$.state.alamat.$errors[0].$message }}</p>
                        </div>
                    </div>
                    
                    <div class="fluid-form-input margin-top-10 width-65perc">
                        <select v-model="state.kategori" id="Kategori" placeholder="Kategori" min="0" class="fluid-input" :class="state.kategori == '' ? (v$.state.kategori.$error ? 'has-error' : '') : (v$.state.kategori.$error ? 'has-error' : 'no-error')">
                            <option value="">--Pilih Kategori--</option>
                            <option v-for="s in statList" :value="s.CategoryID">{{ s.CategoryName }}</option>
                        </select>
                        <label id="kategori" for="katebori" class="fluid-label" :class="state.kategori == '' ? (v$.state.kategori.$error ? 'has-error' : 'no-error') : (v$.state.kategori.$error ? 'has-error d-block' : 'no-error d-block')">Kategori</label>
                        <div v-if="v$.state.kategori.$error" class="label-error">
                            <Icon icon="ep:warning-filled" height="13" />
                            <p class="error-text">{{ v$.state.kategori.$errors[0].$message }}</p>
                        </div>
                    </div>
                    <!-- <div class="display-flex">

                        <div class="fluid-form-input margin-top-10 width-95">
                            <input type="text" v-model="state.grup" id="grup" placeholder="Grup" min="0" class="fluid-input" :class="state.grup == '' ? (v$.state.grup.$error ? 'has-error' : '') : (v$.state.grup.$error ? 'has-error' : 'no-error')">
                            <label id="grup" for="grup" class="fluid-label" :class="state.grup == '' ? (v$.state.grup.$error ? 'has-error' : 'no-error') : (v$.state.grup.$error ? 'has-error d-block' : 'no-error d-block')">Grup</label>
                            <div v-if="v$.state.grup.$error" class="label-error">
                                <Icon icon="ep:warning-filled" height="13" />
                                <p class="error-text">{{ v$.state.grup.$errors[0].$message }}</p>
                            </div>
                        </div>
                        
                        <div class="fluid-form-input margin-top-10 width-95">
                            <select v-model="state.oto" id="hitungoto" placeholder="Hitung Oto" min="0" class="fluid-input" :class="state.oto == '' ? (v$.state.oto.$error ? 'has-error' : '') : (v$.state.oto.$error ? 'has-error' : 'no-error')">
                                <option value="default">--Pilih--</option>
                                <option >YES</option>
                                <option >NO</option>
                            </select>
                            <label id="hitungoto" for="hitungoto" class="fluid-label" :class="state.oto == '' ? (v$.state.oto.$error ? 'has-error' : 'no-error') : (v$.state.oto.$error ? 'has-error d-block' : 'no-error d-block')">Hitung Oto</label>
                            <div v-if="v$.state.oto.$error" class="label-error">
                                <Icon icon="ep:warning-filled" height="13" />
                                <p class="error-text">{{ v$.state.oto.$errors[0].$message }}</p>
                            </div>
                        </div>

                    </div> -->


    
                    <!-- <div class="form-group">
                        <label for="bisnis">Jenis Usaha</label>
                        <select v-model="state.bisnis" class="form-control" id="bisnis">
                            <option selected>--Pilih Bisnis--</option>
                            <option v-for="s in bussList" :value="s.id">{{ s.CB_Nama }}</option>
                        </select>
                        <small v-if="v$.state.bisnis.$error" class="form-text text-muted text-danger">{{ v$.state.bisnis.$errors[0].$message }}</small>
                    </div> -->

                    <!-- <div class="fluid-form-input margin-top-10 width-65perc">
                            <select v-model="state.bisnis" id="bisnis" placeholder="Jenis Usaha" min="0" class="fluid-input" :class="state.bisnis == '' ? (v$.state.bisnis.$error ? 'has-error' : '') : (v$.state.bisnis.$error ? 'has-error' : 'no-error')">
                                <option value="">--Pilih Bisnis--</option>
                                <option v-for="s in statList" :value="s.CategoryID">{{ s.CategoryName }}</option>
                            </select>
                            <label id="bisnis" for="bisnis" class="fluid-label" :class="state.bisnis == '' ? (v$.state.bisnis.$error ? 'has-error' : 'no-error') : (v$.state.bisnis.$error ? 'has-error d-block' : 'no-error d-block')">Jenis Usaha</label>
                            <div v-if="v$.state.bisnis.$error" class="label-error">
                                <Icon icon="ep:warning-filled" height="13" />
                                <p class="error-text">{{ v$.state.bisnis.$errors[0].$message }}</p>
                            </div>
                        </div> -->
                    
                    <hr>
                    <div class="fluid-form-input margin-top-10 width-65perc">
                        <input type="text" v-model="state.sales" id="contactperson" placeholder="Contact Person" min="0" class="fluid-input" :class="state.sales == '' ? (v$.state.sales.$error ? 'has-error' : '') : (v$.state.sales.$error ? 'has-error' : 'no-error')">
                        <label id="contactperson" for="contactperson" class="fluid-label" :class="state.sales == '' ? (v$.state.sales.$error ? 'has-error' : 'no-error') : (v$.state.sales.$error ? 'has-error d-block' : 'no-error d-block')">Contact Person</label>
                        <div v-if="v$.state.sales.$error" class="label-error">
                            <Icon icon="ep:warning-filled" height="13" />
                            <p class="error-text">{{ v$.state.sales.$errors[0].$message }}</p>
                        </div>
                    </div>
    
                    <!-- <div class="form-group margin-bottom-20">
                        <label for="lokasi">Lokasi</label>
                        <select v-model="state.lokasi" class="form-control" id="lokasi">
                            <option selected>--Pilih Lokasi--</option>
                            <option v-for="s in locList" :value="s.DefaultCityNo">{{ s.DefaultCityName }}</option>
                        </select>
                        <small v-if="v$.state.lokasi.$error" class="form-text text-muted text-danger">{{ v$.state.lokasi.$errors[0].$message }}</small>
                    </div> -->
                    <div class="fluid-form-input margin-top-10 width-65perc">
                        <input type="text" v-model="state.jabatan" id="jabatan" placeholder="Jabatan" min="0" class="fluid-input" :class="state.jabatan == '' ? (v$.state.jabatan.$error ? 'has-error' : '') : (v$.state.jabatan.$error ? 'has-error' : 'no-error')">
                        <label id="jabatan" for="jabatan" class="fluid-label" :class="state.jabatan == '' ? (v$.state.jabatan.$error ? 'has-error' : 'no-error') : (v$.state.jabatan.$error ? 'has-error d-block' : 'no-error d-block')">Jabatan</label>
                        <div v-if="v$.state.jabatan.$error" class="label-error">
                            <Icon icon="ep:warning-filled" height="13" />
                            <p class="error-text">{{ v$.state.jabatan.$errors[0].$message }}</p>
                        </div>
                    </div>

                    <div class="display-flex">
                    
                        <div class="fluid-form-input margin-top-10 width-95">
                            <input type="text" v-model="state.telpon" id="telpon" placeholder="Telpon" min="0" class="fluid-input" :class="state.telpon == '' ? (v$.state.telpon.$error ? 'has-error' : '') : (v$.state.telpon.$error ? 'has-error' : 'no-error')">
                            <label id="telpon" for="telpon" class="fluid-label" :class="state.telpon == '' ? (v$.state.telpon.$error ? 'has-error' : 'no-error') : (v$.state.telpon.$error ? 'has-error d-block' : 'no-error d-block')">Telpon</label>
                            <div v-if="v$.state.telpon.$error" class="label-error">
                                <Icon icon="ep:warning-filled" height="13" />
                                <p class="error-text">{{ v$.state.telpon.$errors[0].$message }}</p>
                            </div>
                        </div>

                        <div class="fluid-form-input margin-top-10 width-95">
                            <input type="text" v-model="state.komisi" id="komisi" placeholder="Komisi(%)" min="0" class="fluid-input" :class="state.komisi == '' ? (v$.state.komisi.$error ? 'has-error' : '') : (v$.state.komisi.$error ? 'has-error' : 'no-error')">
                            <label id="komisi" for="komisi" class="fluid-label" :class="state.komisi == '' ? (v$.state.komisi.$error ? 'has-error' : 'no-error') : (v$.state.komisi.$error ? 'has-error d-block' : 'no-error d-block')">Komisi (%)</label>
                            <div v-if="v$.state.komisi.$error" class="label-error">
                                <Icon icon="ep:warning-filled" height="13" />
                                <p class="error-text">{{ v$.state.komisi.$errors[0].$message }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="fluid-form-input margin-top-10 width-65perc">
                        <input type="text" v-model="state.catatan" id="catatan" placeholder="Catatan" min="0" class="fluid-input" :class="state.catatan == '' ? (v$.state.catatan.$error ? 'has-error' : '') : (v$.state.catatan.$error ? 'has-error' : 'no-error')">
                        <label id="catatan" for="catatan" class="fluid-label" :class="state.catatan == '' ? (v$.state.catatan.$error ? 'has-error' : 'no-error') : (v$.state.catatan.$error ? 'has-error d-block' : 'no-error d-block')">Catatan</label>
                        <div v-if="v$.state.catatan.$error" class="label-error">
                            <Icon icon="ep:warning-filled" height="13" />
                            <p class="error-text">{{ v$.state.catatan.$errors[0].$message }}</p>
                        </div>
                    </div>

                    <hr>
                    <h5>Jadwal Pick-Up Regular</h5>
                    <div class="display-flex margin-top-10">

                        <div class="fluid-form-input margin-top-10 width-95">
                            <select v-model="state.areadefault" id="areadefault" placeholder="Area Default" min="0" class="fluid-input" :class="state.areadefault == '' ? (v$.state.areadefault.$error ? 'has-error' : '') : (v$.state.areadefault.$error ? 'has-error' : 'no-error')">
                                <option value="default">--Pilih--</option>
                                <option v-for="a in areaDef" :value="a.PickupAreaKode">{{ a.PickupAreaKode }}</option>
                            </select>
                            <label id="areadefault" for="areadefault" class="fluid-label" :class="state.areadefault == '' ? (v$.state.areadefault.$error ? 'has-error' : 'no-error') : (v$.state.areadefault.$error ? 'has-error d-block' : 'no-error d-block')">Area Default</label>
                            <div v-if="v$.state.areadefault.$error" class="label-error">
                                <Icon icon="ep:warning-filled" height="13" />
                                <p class="error-text">{{ v$.state.areadefault.$errors[0].$message }}</p>
                            </div>
                        </div>

                        <!-- <div class="fluid-form-input margin-top-10 width-95">
                            <input type="text" v-model="state.modadefault" id="modadefault" placeholder="Moda Default" min="0" class="fluid-input" :class="state.modadefault == '' ? (v$.state.modadefault.$error ? 'has-error' : '') : (v$.state.modadefault.$error ? 'has-error' : 'no-error')">
                            <label id="modadefault" for="modadefault" class="fluid-label" :class="state.modadefault == '' ? (v$.state.modadefault.$error ? 'has-error' : 'no-error') : (v$.state.modadefault.$error ? 'has-error d-block' : 'no-error d-block')">Moda Default</label>
                            <div v-if="v$.state.modadefault.$error" class="label-error">
                                <Icon icon="ep:warning-filled" height="13" />
                                <p class="error-text">{{ v$.state.modadefault.$errors[0].$message }}</p>
                            </div>
                        </div> -->
                    </div>

                    <!-- <div class="display-flex">
                        <input type="checkbox" name="Senin" id="senin">
                        <label class="label-weekly" for="senin"> Senin</label>
                        <input type="checkbox" name="Selasa" id="selasa">
                        <label class="label-weekly" for="selasa"> Selasa</label>
                        <input type="checkbox" name="Rabu" id="rabu">
                        <label class="label-weekly" for="rabu"> Rabu</label>
                        <input type="checkbox" name="Kamis" id="kamis">
                        <label class="label-weekly" for="kamis"> Kamis</label>
                        <input type="checkbox" name="Jumat" id="jumat">
                        <label class="label-weekly" for="jumat"> Jumat</label>
                    </div>
                    <div class="display-flex">
                        <input type="checkbox" name="Sabtu" id="sabtu">
                        <label class="label-weekly" for="sabtu"> Sabtu</label>
                        <input type="checkbox" name="Minggu" id="minggu">
                        <label class="label-weekly" for="minggu"> Minggu</label>
                    </div> -->

                    
                    
                    <button type="submit" class="btn btn-primary margin-top-10">Submit</button>
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
	props: ['meetingInfo', 'userInfo'],
	components: { Icon },
	data() {
		return {
            locList: [],
            bussList: [],
            statList: [],
            salesList: [],
            areaDef:[],
			beHostForm: false,
            v$: useValidate(),
			hostCode: "",
			clickMenu: 'informasi-umum',
			data: {},
            state: {
                accno: this.$parent.dataClicked.CustomerNo,
                nama: this.$parent.dataClicked.CustomerName,
                email: '',
                nohp: this.$parent.dataClicked.CustomerTelp,
                alamat: this.$parent.dataClicked.CustomerAddr1,
                kategori: this.$parent.dataClicked.CustomerCategory,
                bisnis: this.$parent.dataClicked.CustomerCategory,
                sales: this.$parent.dataClicked.CustomerSales,
                lokasi: '',
                grup:'',
                oto:'',
                conperson: this.$parent.dataClicked.CustomerSales,
                jabatan: this.$parent.dataClicked.CustomerPersonJabat1,
                telpon: this.$parent.dataClicked.CustomerPersonTelp1,
                komisi: this.$parent.dataClicked.CustomerPersonRC1,
                catatan: this.$parent.dataClicked.CustomerMemo,
                areadefault: this.$parent.dataClicked.CustomerAreaDefault,
                modadefault: this.$parent.dataClicked.CustomerPickupModa
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
                // email: {
                //     required: helpers.withMessage("Email harus diisi", required),
                // },
                nohp: {
                    required: helpers.withMessage("No Telpon harus diisi", required),
                    numeric: helpers.withMessage("No Telpon harus berupa angka", numeric),
                },
                alamat: {
                    required: helpers.withMessage("Alamat harus diisi", required),
                },
                kategori: {
                    required: helpers.withMessage("Kategori harus diisi", required),
                },
                // bisnis: {
                //     required: helpers.withMessage("Bisnis harus diisi", required),
                // },
                sales: {
                    required: helpers.withMessage("Sales harus diisi", required),
                },
                // oto: {
                //     required: helpers.withMessage("Hitung Oto harus diisi", required),
                // },
                // conperson: {
                //     required: helpers.withMessage("Contact Person harus diisi", required),
                // },
                jabatan: {
                    required: helpers.withMessage("Jabatan harus diisi", required),
                },
                telpon: {
                    required: helpers.withMessage("Telepon harus diisi", required),
                    numeric: helpers.withMessage("No Telpon harus berupa angka", numeric),
                },
                komisi: {
                    required: helpers.withMessage("Komisi harus diisi", required),
                    numeric: helpers.withMessage("No Telpon harus berupa angka", numeric),
                },
                catatan: {
                    required: helpers.withMessage("Catatan harus diisi", required),
                },
                areadefault: {
                    required: helpers.withMessage("Area harus diisi", required),
                },
                // modadefault: {
                //     required: helpers.withMessage("Moda harus diisi", required),
                // }
                
            }
		}
	},
	async mounted(){
        await this.getStatusList()
        await this.getBussinesList()
        await this.getLocationList()
        await this.getSalesList()
        await this.areaPickup()
		console.debug('dataaaa child',this.$parent.dataClicked)
		this.data = this.$parent.dataClicked
	},
	methods: {
        async areaPickup(){
            const res =  await this.$store.dispatch('pelanggan/areaPickup',{key: 'psb75'})
            this.areaDef = res.data
            console.debug('areaPickup',res)
        },
       async submitData() {
            this.v$.$validate()
            console.error('cons',this.v$.$error)
            if (!this.v$.$error) {
                const res = await this.$store.dispatch('pelanggan/updateCustomer', this.state)
                if (res.error == false) {
                    this.toast(res.message, 'bg-light-green', 3000)
                    this.$parent.onEdit = false
                }else {
                    this.toast(res.message, 'bg-red', 3000)
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