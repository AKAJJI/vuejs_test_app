<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
            id="input-group-1"
            label="First Name:"
            label-for="input-1"
            >
            <b-form-input
            id="input-1"
            v-model="form.first_name"
            type="text"
            required
            placeholder="Enter the First Name"
            ></b-form-input>
      </b-form-group>

      <b-form-group
            id="input-group-2"
            label="Last Name:"
            label-for="input-2"
            >
            <b-form-input
            id="input-2"
            v-model="form.last_name"
            type="text"
            required
            placeholder="Enter the Last Name"
            ></b-form-input>
      </b-form-group>

      <b-form-group
            id="input-group-3"
            label="Secret Identity:"
            label-for="input-3"
            description="We'll never share this info."
            >
            <b-form-input
            id="input-3"
            v-model="form.hero_name"
            type="text"
            required
            placeholder="Enter the Secret Identity"
            ></b-form-input>
      </b-form-group>
      <p class="text-danger" v-if="err_msg"> This hero name is already taken !! try another one</p>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
        <p>{{ this.form }}</p>
        </b-form>
    </div>
</template>

<script>
import store from '../store/store'
export default {
    store,
    data(){
        return{
            form:{
            first_name:'',
            last_name:'',
            hero_name:''
            },
            err_msg: false,
        }
    },
    created(){
      this.$store.dispatch('loadItems');
      
    },
    computed:{
     items(){
       return this.$store.state.items;
     }
    },
    methods:{
        onReset(){
            this.form.first_name='';
            this.form.last_name='';
            this.form.hero_name='';
            this.err_msg=false;
        },
        onSubmit(){
            this.err_msg=false;
            for(var item in this.items){
                // console.log(this.items[item].hero_name)
                if(this.form.hero_name===this.items[item].hero_name){
                    console.log(this.form.hero_name+"== " +this.items[item].hero_name)
                        this.err_msg=true;
                }else{
                    console.log(this.form.hero_name+" != " +this.items[item].hero_name)
                }
            }
            if(!this.err_msg){
            store.dispatch('add_char',this.form);
            }
            
        }
    }
    

    
}
</script>