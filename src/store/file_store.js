import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);

Vue.use(VueAxios, axios);

const FileStore = new Vuex.Store({
    state :{
        files:[],
        filename:null
    },
    mutations:{
        ADD_FILES(state,files){
            state.files.push(files)
        },
        LOAD_FILES(state,files){
            state.files=files
        },
        DOWNLOAD_FILE(state,value){
            state.filename=value
        },
        DELETE_FILE(state,payload){
            state.items.splice(payload.index,1)
            state.filename=payload.value
        }
    },
    actions:{
        async add_files(state,files){
            state.commit('ADD_FILES',files)
            console.log(files)
            let filesForm = new FormData();
            for(var i=0;i < files.length; i++){
                let file= files[i];
                filesForm.append('files['+ i +']',file);
            }
            
            
            const config ={ 
                headers: {
                    'Content-Type': `multipart/form-data;`
                    // boundary=${filesForm._boundary}`
                }};
            await axios.post('http://localhost:8000/add-files',filesForm,config)
                .then(data =>{
                    console.log(data.data)
                })
                .catch(error=>{
                    console.log(error.response);
                    
                })
        },
        async loadFiles({commit}){
            await axios.get('http://localhost:8000/load-files')
            .then(r =>{
                commit('LOAD_FILES',r.data)
            })
            .catch(e => {
                console.log(e.response)
            })
        },
        async downloadFile(state,filename){
            state.commit('DOWNLOAD_FILE',filename)
            let val = filename.split('.')
            await axios.get('http://localhost:8000/download-file/'+val[0]+'-'+val[1],{responseType:'blob'})
            .then(r =>{
                console.log(r.status)
                let file = new File([r.data],filename)
                const url=window.URL.createObjectURL(file)
                const link = document.createElement('a')

                link.href =url
                link.setAttribute('download',filename)
                document.body.appendChild(link)
                console.log(file)
                link.click()
                // window.open(window.URL.createObjectURL(file))

            })
            .catch(e => {
                console.log(e.response)
            })
        },
        async deleteFile(state,payload){

            console.log(payload.index+'////'+payload.value)
            
            
            console.log("azerty")
            let val = payload.value.split('.')
            await axios.delete('http://localhost:8000/delete-file/'+payload.index+'-'+val[0]+'-'+val[1])
            .then( r =>{
                state.commit('DELETE_FILE',payload)
                console.log(r.data)
                console.log("ligne supprimé")
            })
            .catch(e => {
                console.log(e.response)
            })
       },
    }
});

export default FileStore;