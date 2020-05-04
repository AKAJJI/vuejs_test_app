import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
// import { info } from "node-sass";


Vue.use(Vuex);

Vue.use(VueAxios, axios);




// const characters_mutation = {
//   ADD_CHARACTER:(characters_state,char_item) => {
//       characters_state.items.push({
//         items: char_item
//       })
//   }
// }

// const characters_getters = {
//   show_characters: characters_state => characters_state.items,
// }



// [
//   { index: 0,first_name: 'Bruce', last_name: 'Wayne', named:"Batman" },
//   { index: 1,first_name: 'Clark', last_name: 'Kent', named:"Superman" },
//   { index: 2,first_name: 'Barry', last_name: 'Allen',named:"Flash" },
//   { index: 3,first_name: 'Oliver', last_name: 'Queen',named:"Green Arrow"}
// ]


const store= new Vuex.Store({
  state: {items:[],
          file:null          
  },
  mutations: { // always synchronous
    ADD_CHAR(state,characters_info){
    state.items.push({      
      first_name: characters_info.first_name,
      last_name : characters_info.last_name,
      hero_name : characters_info.hero_name,
    })},
    SET_ITEMS(state,items){
      state.items = items
    },
    DELETE_ITEM(state,index){
      state.items.splice(index,1)
    },
    ADD_FILE(state,file){
      state.file=file
    }

  },
  actions: {//can be asynchronous and synchronous
    async add_char(state,characters_info){    // add state if u want to try the commit method bellow
      state.commit('ADD_CHAR',characters_info)
      console.log("azerty")
      let charactersForm= new FormData();
      charactersForm.set('first_name',characters_info.first_name);
      charactersForm.set('last_name',characters_info.last_name);
      charactersForm.set('hero_name',characters_info.hero_name);
      const config ={ 
        headers: {
            'Content-Type': `multipart/form-data;
            boundary=${charactersForm._boundary}`
        }};
      await axios.post('http://localhost:8000/add-user',charactersForm,config)
            .then(data =>{
              console.log(data.data)
            })
            .catch(error =>{
              console.log(error.response)
            })
      }
    ,
    async updateItem(state,item,items){
      state.commit('SET_ITEMS',items)
      console.log("im here")
      let updateForm = new FormData();
      updateForm.set('first_name',item.first_name);
      updateForm.set('last_name',item.last_name);
      updateForm.set('hero_name',item.hero_name);
      const config ={ 
        headers: {
            'Content-Type': `multipart/form-data;
            boundary=${updateForm._boundary}`
        }};

        await axios.post('http://localhost:8000/update-hero/'+item.id,updateForm,config)
            .then(r=>{
              console.log(r.data)
            })
            .catch(e =>{
              console.log(e.response)
            });

    }
    ,
    async loadItems({commit}){
     await axios.get('http://localhost:8000/show')
      .then(response => {
        // JSON responses are automatically parsed.
        commit('SET_ITEMS',response.data)
        console.log("im here")
      })
      .catch(e => {
      this.errors.push(e)
    });
    },
    async deleteItem(state,index){
      
      console.log(index)
      await axios.delete("http://localhost:8000/delete-hero/"+index)
      .then(r => {
        state.commit("DELETE_ITEM",index)
        console.log(r.data)
        console.log("ligne supprimée")
      })
      .catch(e => {
        this.errors.push(e)
      });
    },
    async addFile(state,file){
      console.log(file)
      state.commit("ADD_FILE",file)
      let fileForm = new FormData()
      fileForm.append('file',file)
      const config={
        headers: {
          'Content-Type':`multipart/form-data;`
        }
      }
      await axios.post('http://localhost:8000/add-csv',fileForm,config)
        .then(data =>{
          console.log(data.data)
        })
        .catch(error =>{
          console.log(error.response)
        })

    }
  },
  modules: {},
  getters:{
     ITEMS: state =>{ state.items}
  },
  // strict:true
});





export default store;