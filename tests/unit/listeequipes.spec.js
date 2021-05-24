import ListeEquipes from '@/components/ListeEquipes.vue'
import { shallowMount,createLocalVue,RouterLinkStub } from '@vue/test-utils'
//import VueRouter from 'vue-router'
import Vue from 'vue'
//import Vuetify from 'vuetify'
import axios from 'axios';
jest.mock('axios');
  
describe("ListeEquipes.vue", ()=> {
    Vue.config.silent = true;
    let wrapper;
   /*let vuetify = new Vuetify();
    const localVue = createLocalVue();
    localVue.use(VueRouter);*/

    beforeEach( () => {
        const localVue = createLocalVue();
        wrapper = shallowMount(ListeEquipes,{
            localVue,
            methods: {
                getEquipes: ()=> {},
                addEquipe: ()=> {}
            },
        })
        wrapper.setData({ equipes:[{nom: 'Soldats' },{nom: 'Stade Toulousain'}]
        })
        
    })

    it('regarde si il y a des equipes',()=> {
        expect(wrapper.vm.$data.equipes).toEqual([{"nom": "Soldats"}, {"nom": "Stade Toulousain"}]);
    })
    it("regarde si il y a un bouton d'ajout d'équipe",()=>{
        //await wrapper.setData({ nom: 10 })
        //expect(wrapper.find("v-btn").text());
        
    })

    it("regarde si il y a une équipe à ajouter",()=>{
        wrapper.setData({ nomEquipe:"AntwiTeam"
        })
        expect(wrapper.vm.$data.nomEquipe).toEqual("AntwiTeam");

    })

    it("regarde si il y a une équipe ajouté",async()=>{
        //wrapper.setData({ equipes:[{nom: 'AntwiTeam' }]})
        wrapper.setData({ nomEquipe:"AntwiTeam"
        })
        const btn = wrapper.find("v-btn")
        await btn.trigger('click')
        await wrapper.vm.$nextTick(() => {
           expect(wrapper.text()).toBe('value');
           done()
        })
    })
})