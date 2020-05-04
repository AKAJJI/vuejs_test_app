<template>
  <b-overlay :show="show" rounded="sm">
    <b-container class="mt-5" :aria-hidden="show ? 'true' : null">
  
    <div >
        <div class="row ">
        <b-button variant="primary" class="float-right ml-3 mt-3 mb-5 mr-2" v-b-modal.modal-1 @click="showmodal"><i class="fas fa-plus"></i>  New Character</b-button>
        <b-button variant="success" class="float-right mt-3 mb-5" v-b-modal.modal-2 @click="showmodal2"><i class="fas fa-file-csv"></i>   Remplir a partir d'un CSV</b-button>
        </div>
        <!-- <div class="">
        <b-table striped hover :items="items" head-variant="dark" ></b-table>
        </div> -->
        <br>
        <div class="md-form mt-0 row">
          <div class="col-9">
          <input class="form-control" type="text" placeholder="Search in" aria-label="Search" v-model="search">
          </div>
          <div class="col-3">
            <select class="custom-select" v-model="column" >
              <option value="All" >All the table</option>
              <option value="id">Index</option>
              <option value="first_name">First Name</option>
              <option value="last_name">Last Name</option>
              <option value="hero_name">Hero Name</option>
            </select>
          </div>

        </div>  
        <div class="table mt-5">
          <table class="table table-striped">
  <thead class="thead-dark">
    <tr>
      <th scope="col" @click="sortBy('id')"><i class="fas fa-sort" v-if="sortKey != 'id'"></i><i class="fas fa-sort-up" v-if="sortKey == 'id' && click%2==0" ></i> <i class="fas fa-sort-down" v-if="sortKey == 'id' && click%2==1" ></i> Index</th>
      <th scope="col" @click="sortBy('first_name')"><i class="fas fa-sort" v-if="sortKey !='first_name'"></i><i class="fas fa-sort-up" v-if="sortKey == 'first_name' && click%2==0" ></i> <i class="fas fa-sort-down" v-if="sortKey == 'first_name' && click%2==1" ></i> First Name</th>
      <th scope="col" @click="sortBy('last_name')"><i class="fas fa-sort" v-if="sortKey != 'last_name'"></i><i class="fas fa-sort-up" v-if="sortKey == 'last_name' && click%2==0" ></i> <i class="fas fa-sort-down" v-if="sortKey == 'last_name' && click%2==1" ></i> Last Name</th>
      <th scope="col" @click="sortBy('hero_name')"><i class="fas fa-sort" v-if="sortKey != 'hero_name'"></i><i class="fas fa-sort-up" v-if="sortKey == 'hero_name' && click%2==0" ></i> <i class="fas fa-sort-down" v-if="sortKey == 'hero_name' && click%2==1" ></i> Hero Name</th>
      <th scope="col">update</th>
      <th scope="col">delete</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in orderedUsers " :key="item.id">
      <td>{{item.id}}</td>
      <td>
        <span v-show="!item.edit">{{item.first_name}}</span>
        <input type="text" v-model="item.first_name" v-show="item.edit">
      </td>
      <td>
        <span v-show="!item.edit">{{item.last_name}}</span>
        <input type="text" v-model="item.last_name" v-show="item.edit">
      </td>
      <td>
        <span v-show="!item.edit">{{item.hero_name}}</span>
        <input type="text" v-model="item.hero_name" v-show="item.edit">
      </td>
      <td>
        <b-link variant="light" @click="updateRow(item)" v-show="!item.edit"><i class="far fa-edit text-success"></i></b-link>
        <b-link variant="light" @click="confirmRow(item)" v-show="item.edit"><i class="fas fa-check text-success"></i></b-link>
      </td>
      <td><b-link variant="light" @click="removeRow(item.index,item.id)"><i class="far fa-trash-alt text-danger"></i></b-link></td>
    </tr>
  </tbody>
</table>

<b-pagination class="mt-4"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      align="center"
    ></b-pagination>

        </div>
        
      <div>
        <b-modal id="modal-1" ref="add-character-modal" title="New Character" v-if="AddModal">
          <!-- <p class="my-4">Hello from modal!</p> -->
          <CharactersForm></CharactersForm>
          
        <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="dark"
            size="sm"
            class="float-right"
            @click="hidemodal"
          >
            close
          </b-button>
        </div>
          </template>
        </b-modal>
      </div>

      <div>
        <b-modal id="modal-2" ref="add-csv-modal" title="Remplir a partir d'un CSV" v-if="AddModal2">
          <!-- <p class="my-4">Hello from modal!</p> -->
          <FileForm></FileForm>
          
        <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="dark"
            size="sm"
            class="float-right"
            @click="hidemodal2"
          >
            close
          </b-button>
        </div>
          </template>
        </b-modal>
      </div>
      </div>
      
    </b-container>
    </b-overlay>
</template>

<script>
import CharactersForm from "@/components/CharactersForm.vue";
import   store    from "../store/store";
import Vue from "vue";
import FileForm from "@/components/FileForm.vue";
import _ from 'lodash';
// import Vuex from "vuex";
// import { mapState } from 'vuex';
// import { mapGetters } from 'vuex';
// import axios from 'axios';
// Vue.forceUpdate();
      


export default {
    store,
     data() {
      return {
        click:1,
        AddModal: false,
        AddModal2: false,
        sortKey:'id',
        reverse:'asc',
        search:'',
        column:"All",
        show: false,
        currentPage:1,
        perPage:10,
      }
    },
    components:{
      CharactersForm,
      FileForm
    },
    methods:{
      updateRow(item){
        // item.edit=true
        Vue.set(item, 'edit',true)
        console.log("update")
      },
      confirmRow(item){
        this.show=true
        Vue.set(item, 'edit',false)
        this.$store.dispatch('updateItem',item,this.items)
        // this.$store.dispatch('loadItems');
        window.setTimeout(function(){

        // Move to a new location or you can do something else
        window.location.href = "Infos";

    }, 1000);
        // this.$forceUpdate()
        // document.location.reload(true);
        console.log("confirmed")
      },
      hidemodal(){
           
          this.AddModal = false
          
          // this.$refs["add-characters-modal"].hide()
          // console.log(store.getters.items)
      },
      showmodal(){
        this.AddModal= true
      },
      hidemodal2(){
        this.AddModal2 =false
      },
      showmodal2(){
        this.AddModal2=true
        console.log("zedfgn,")
      },
      removeRow(index,id){
        if(confirm("etes-vous sur de vouloir supprimer cette ligne")){
          //  this.$store.commit("DELETE_ITEM",index)
          this.show=true
         console.log(index)
         this.$store.dispatch('deleteItem',id)
         window.setTimeout(function(){

            // Move to a new location or you can do something else
            window.location.href = "Infos";

            }, 1000);


        }
        else{
          console.log("Supression annulée")
        }
      },
      sortBy(sortKey){
       if(this.sortKey==sortKey && this.click%2==1){
         this.reverse='desc'
         this.click++

       }else if(this.sortKey==sortKey && this.click%2==0){
          this.reverse='asc'
         this.click++
       }else{
         this.sortKey = sortKey;
         this.reverse = 'asc';
         this.click = 1
       }

      
     },
    
    },
    mounted(){
      this.$store.dispatch('loadItems');
      
    },
    created(){
      // this.$store.dispatch('loadItems');
      // this.items1=this.items
      // console.log(this.items)
    },
    computed:{
     items(){
       return this.$store.state.items;
     },
     orderedUsers: function () {
       
       if (this.search != ''&& this.column=="All"){
         return this.items.filter(item =>{
        //    let props =  Object.values(item)
        return item.first_name.toLowerCase().match(this.search.toLowerCase())||item.last_name.toLowerCase().match(this.search.toLowerCase())||item.hero_name.toLowerCase().match(this.search.toLowerCase())||item.id.toString().match(this.search.toString())
        
        // return props.some(prop => !this.search || ((typeof prop === 'string') ? prop.includes(this.search) : prop.toString(10).includes(this.search)))
         })
       }else if(this.search!="" && this.column=="first_name"){
         return this.items.filter(item =>{
          return item.first_name.toLowerCase().match(this.search.toLowerCase())
          }).slice(this.currentPage*this.perPage - this.perPage, this.perPage*this.currentPage)
       }else if(this.search!="" && this.column=="last_name"){
         return this.items.filter(item =>{
          return item.last_name.toLowerCase().match(this.search.toLowerCase())
          }).slice(this.currentPage*this.perPage - this.perPage, this.perPage*this.currentPage)
       }else if(this.search!="" && this.column=="first_name"){
         return this.items.filter(item =>{
          return item.first_name.toLowerCase().match(this.search.toLowerCase())
          }).slice(this.currentPage*this.perPage - this.perPage, this.perPage*this.currentPage)
       }else if(this.search!="" && this.column=="id"){
         return this.items.filter(item =>{
          return item.id.toString().match(this.search.toString())
         }).slice(this.currentPage*this.perPage - this.perPage, this.perPage*this.currentPage)
       }
       else{
          return _.orderBy(this.items, this.sortKey,this.reverse).slice(this.currentPage*this.perPage - this.perPage, this.perPage*this.currentPage)
       }
    },
    rows(){
      return this.items.length
    },
    // filtered(){
    //   return this.items.slice(this.currentPage*this.perPage - this.perPage, this.perPage*this.currentPage)
    // }
    
      
     }
     
}

</script>