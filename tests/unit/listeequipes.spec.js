import ListeEquipes from '@/components/ListeEquipes.vue'
import { shallowMount,createLocalVue,RouterLinkStub } from '@vue/test-utils'
//import VueRouter from 'vue-router'
import Vue from 'vue'
//import Vuetify from 'vuetify'
import axios from 'axios';

jest.mock('axios', () => ({
    get: Promise.resolve('value')
  }))
  
describe("ListeEquipes.vue", ()=> {
    Vue.config.silent = true;
    let wrapper;
   /*let vuetify = new Vuetify();
    const localVue = createLocalVue();
    localVue.use(VueRouter);*/

    beforeEach( () => {
        wrapper = shallowMount(ListeEquipes,{
            methods: {
                getEquipes: ()=> {}
            },
        })
        wrapper.setData({ nomEquipe:"AntwiTeam",
        })
    })

    it('contains the right information',()=> {
        // columns and items are defined above
        // first cell in the header
    })
    it("regarde si il y a un bouton d'ajout d'équipe",()=>{
        //await wrapper.setData({ nom: 10 })
        //expect(wrapper.find("v-btn").text());
        
    })

    test("regarde si il y a une d'équipe",()=>{
        expect(wrapper.vm.$data.nom).toEqual("AntwiTeam");

    })
})