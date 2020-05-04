<template>
    <div>
    <b-form @submit.prevent="onSubmit" >
    <b-form-file
      v-model="files"
      :state="Boolean(files)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      multiple
      ></b-form-file>
      <!-- <VueDocPreview value="newteach.pbworks.com%2Ff%2Fele%2Bnewsletter.docx" type="office" /> -->
      <!-- <p v-for="file in files" :key="file">{{file}}</p> -->
      
    <b-button type="submit" variant="primary" class="mt-3">Submit</b-button>
    
    </b-form>
    </div>
</template>

<script>

import store from '../store/file_store'



export default {
    store,
    data(){
        return{
            files:[],
        }
    },
    methods:{
        onSubmit(){
            console.log("submitted")
            //console.log(this.files)
            store.dispatch('add_files',this.files)
            // window.location.href="Files"
            window.setTimeout(function(){

        // Move to a new location or you can do something else
        window.location.href = "Files";

    }, 2000);
        },
       
    }
}
</script>