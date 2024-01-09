<template>
	<div class="overlay" id="popupOverlay">
        <div class="popup">
			<div class="popup-header">
				<h3 class="title-popup-detail">Detail Pelanggan</h3>
				<div class="cursor-pointer" @click="this.$parent.isPopupShow = false">
					<i class="fa fa-times" aria-hidden="true"></i>
				</div>
			</div>
            <div class="menu-bar-detpelanggan display-flex">
				<div @click="onClickMenu('informasi-umum')" class="margin-menu-pelanggan cursor-pointer" :class="{ 'font-bold': clickMenu === 'informasi-umum' }">
					Informasi Umum
					<div v-if="clickMenu == 'informasi-umum'" class="menu-bar-active"></div>
				</div>
				<div @click="onClickMenu('informasi-harga')" class="margin-menu-pelanggan cursor-pointer" :class="{ 'font-bold': clickMenu === 'informasi-harga' }">
					Informasi Harga
					<div v-if="clickMenu == 'informasi-harga'" class="menu-bar-active"></div>
				</div>
				<div @click="onClickMenu('eksport-data')" class="margin-menu-pelanggan cursor-pointer" :class="{ 'font-bold': clickMenu === 'eksport-data' }">
					Eksport Data
					<div v-if="clickMenu == 'eksport-data'" class="menu-bar-active"></div>
				</div>
			</div>
			<div class="content-detpelanggan">
				<div v-if="clickMenu == 'informasi-umum'" class="informasi-umum">
					<table class="table-detail-pelanggan">
						<tr>
							<td class="font-bold">Nomor</td>
							<td>{{ data.CustNo }}</td>
						</tr>
						<tr>
							<td class="font-bold">Nama</td>
							<td>{{ data.CustName }}</td>
						</tr>
						<tr>
							<td class="font-bold">Alamat</td>
							<td>{{ data.CustAddr !== null ? data.CustAddr : '-' }}</td>
						</tr>
						<tr>
							<td class="font-bold">Telpon/Fax</td>
							<td>{{ data.CustTelp !== null ? data.CustTelp : '-' }}</td>
						</tr>
						<tr>
							<td class="font-bold">Kategori</td>
							<td>{{ data.CC_Nama !== null ? data.CC_Nama : '-' }}</td>
						</tr>
						<tr>
							<td class="font-bold">Jenis Usaha</td>
							<td>{{ data.CB_Nama !== null ? data.CB_Nama : '-' }}</td>
						</tr>
						<tr>
							<td class="font-bold">Contact person</td>
							<td>{{ data.PegawaiNama !== null ? data.PegawaiNama : '-' }}</td>
						</tr>
						<tr>
							<td class="font-bold">Jabatan</td>
							<!-- <td>{{ data.PegawaiNama !== null ? data.PegawaiNama : '-' }}</td> -->
							<td>{{  jabatan(data.PegawaiType) }}</td>
						</tr>
						<tr>
							<td class="font-bold">Telpon</td>
							<td>{{ data.PegawaiNoTelp !== null ? data.PegawaiNoTelp : '-' }}</td>
						</tr>
						<!-- <tr>
							<td class="font-bold">Komisi(%)</td>
							<td>0893269393</td>
						</tr> -->
						<tr>
							<td class="font-bold">Catatan</td>
							<td>{{ data.CustMemo !== null ? data.CustMemo : '-' }}</td>
						</tr>
						<!-- <tr>
							<td class="font-bold">Area Default</td>
							<td>0893269393</td>
						</tr> -->
						<!-- <tr>
							<td>
								<input type="checkbox" name="Senin" id="senin">
								<label class="label-weekly" for="senin"> Senin</label>
								<input type="checkbox" name="Selasa" id="selasa">
								<label class="label-weekly" for="selasa"> Selasa</label>
								<input type="checkbox" name="Rabu" id="rabu">
								<label class="label-weekly" for="rabu"> Rabu</label>
							</td>
							<td>
								<input type="checkbox" name="Kamis" id="kamis">
								<label class="label-weekly" for="kamis"> Kamis</label>
								<input type="checkbox" name="Jumat" id="jumat">
								<label class="label-weekly" for="jumat"> Jumat</label>
							</td>
						</tr>
						<tr>
							<td>
								<input type="checkbox" name="Sabtu" id="sabtu">
								<label class="label-weekly" for="sabtu"> Sabtu</label>
								<input type="checkbox" name="Minggu" id="minggu">
								<label class="label-weekly" for="minggu"> Minggu</label>
							</td>
						</tr> -->
						<div>
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
							<input type="checkbox" name="Sabtu" id="sabtu">
							<label class="label-weekly" for="sabtu"> Sabtu</label>
							<input type="checkbox" name="Minggu" id="minggu">
							<label class="label-weekly" for="minggu"> Minggu</label>
						</div>
					</table>
				</div>
			</div>
        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue'
import useValidate from '@vuelidate/core'
import { numeric, helpers } from '@vuelidate/validators'
export default {
	props: ['meetingInfo', 'userInfo'],
	components: { Icon },
	data() {
		return {
			beHostForm: false,
            v$: useValidate(),
			hostCode: "",
			clickMenu: 'informasi-umum',
			data: {}
		}
	},
	validation() {
		return {
			hostCode: {
				numeric: helpers.withMessage("Kode host harus berupa angka", numeric)
			},
		}
	},
	mounted(){
		console.debug('dataaaa child',this.$parent.dataClicked)
		this.data = this.$parent.dataClicked
	},
	methods: {
		onClickMenu(data){
			if (data == 'informasi-umum') {
				this.clickMenu = "informasi-umum"
				console.debug(this.clickMenu)
			} else if (data == 'informasi-harga'){
				this.clickMenu = 'informasi-harga'
				console.debug(this.clickMenu)
			} else if (data == 'eksport-data'){
				this.clickMenu = 'eksport-data'
				console.debug(this.clickMenu)
			}
		},
		jabatan(type){
			switch (type) {
				case '0':
					return 'Karyawan'
					break;
				case '1':
					return 'Vendor'
					break;
				case '2':
					return 'Pelanggan'
					break;
				default:
					break;
			}
		}
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