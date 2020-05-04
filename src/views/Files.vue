<template>
    <b-container class="mt-5">

        

         <b-button variant="primary" class="float-right mt-3 mb-5" v-b-modal.modal-1 @click="showModal"><i class="fas fa-upload"></i>   Add File</b-button>




<div class="table">
  <table class="table table-striped">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Date d'ajout</th>
      <th scope="col">Nom du fichier</th>
      <th scope="col">Telecharger</th>
      <th scope="col">Supprimer</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="file in files" :key="file.id">
      <!-- <td>{{getDate(file.Ajout.date)}}</td> -->
      <td>{{getDate(file.Ajout.date)}}</td>
      <td>{{file.name}}</td>
      <td><b-link variant="light" @click="downloadFile(file.upload_name)"><i class="fas fa-download"></i></b-link></td>
      <td><b-link variant="light" @click="deleteFile(file.id,file.upload_name)" ><i class="far fa-trash-alt text-danger"></i></b-link></td>
    </tr>
  </tbody>
</table>
</div>

<br>
<b-link variant="light" @click="download()"><i class="fas fa-download"></i></b-link>



        <div>
        <b-modal id="modal-1" ref="add-character-modal" title="Add a File" v-if="AddModal">
          
         <FilesForm></FilesForm>
          
        <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="dark"
            size="sm"
            class="float-right"
            @click="hideModal"
          >
            close
          </b-button>
        </div>
          </template>
        </b-modal>
      </div>
    </b-container>
</template>

<script>
import FilesForm from "@/components/FilesForm.vue";
import store from "../store/file_store";
import moment from "moment";
import axios from "axios";

export default {
    store,
    data(){
        return{
            AddModal:false,
        }
    },
    components:{
        FilesForm,
    },
    methods:{
        showModal(){
            this.AddModal=true
            console.log(this.AddModal)
        },
        hideModal(){
            this.AddModal=false
            console.log(this.AddModal)
        },
        getDate(date){
          return moment(date).format('DD-MM-YYYY')
        },
        downloadFile(value){
          console.log(value)
          this.$store.dispatch('downloadFile',value)
        },
        deleteFile(index,value){
          if(confirm("Etes-vous sur de vouloir supprimer ce fichier ?")){
            
           let payload = {'index':index,'value':value}
            
          this.$store.dispatch('deleteFile',payload)
          window.setTimeout(function(){

        // Move to a new location or you can do something else
        window.location.href = "Files";

    }, 2000);

          }
          else{
            console.log("Supression annulée")
          }
        },
        download(){
          axios.get('http://localhost:8000/pdf',{responseType:'blob'})
          .then(r =>{
                console.log(r.status)
                let file = new File([r.data],"pdfFile")
                const url=window.URL.createObjectURL(file)
                const link = document.createElement('a')

                link.href =url
                link.setAttribute('download',"pdfFile")
                document.body.appendChild(link)
                console.log(file)
                link.click()
                // window.open(window.URL.createObjectURL(file))

            })
            .catch(e => {
                console.log(e.response)
            })
        }
    },
    mounted(){
      this.$store.dispatch('loadFiles');
    }
    ,
    computed:{
    files(){
      return this.$store.state.files;
    }
    }
}
</script>