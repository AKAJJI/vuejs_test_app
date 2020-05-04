<template>
    <div>
    <b-form @submit.prevent="onSubmit" >
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      accept=".csv"
      ></b-form-file>
    <b-button type="submit" variant="primary" class="mt-3">Submit</b-button>
    
    </b-form>
    </div>
</template>

<script>

import store from '../store/store'



export default {
    store,
    data(){
        return{
            file:null,
        }
    },
    methods:{
        onSubmit(){
            console.log("submitted")
            //console.log(this.files)
            store.dispatch('addFile',this.file)
            // window.location.href="Files"
            window.setTimeout(function(){

            // Move to a new location or you can do something else
            window.location.href = "Infos";

            }, 3000);
        },
       
    }
}
</script>