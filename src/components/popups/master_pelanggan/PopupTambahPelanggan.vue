<template>
	<div class="overlay" id="popupOverlay">
        <div class="popup-tambah-pelanggan">
			<div class="popup-header">
				<h3 class="title-popup-detail">Tambah Pelanggan</h3>
				<div class="cursor-pointer" @click="this.$parent.onCreate = false">
					<i class="fa fa-times" aria-hidden="true"></i>
				</div>
			</div>
            <div class="overflow-auto">
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Masukan Acc No">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
    
                    <div class="form-group">
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Masukan Nama">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
    
                    <div class="form-group">
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Masukan Email">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
    
                    <div class="form-group">
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Masukan No Telpon">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    
                    <div class="form-group">
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Masukan Alamat">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                   
                    <div class="form-group">
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Masukan Acc No">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
    
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Kategori</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </select>
                    </div>
    
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Bussines</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Sales</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </select>
                    </div>
    
                    <div class="form-group margin-bottom-20">
                        <label for="exampleFormControlSelect1">Lokasi</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </select>
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