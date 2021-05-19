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
        const localVue = createLocalVue();
        wrapper = shallowMount(ListeEquipes,{
            localVue,
            methods: {
                getEquipes: ()=> {},
                addEquipe: ()=> {}
            },
        })
        wrapper.setData({ equipes:[{nom: 'Soldats' },{nom: 'Stade Toulousain'},]
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

    it("regarde si il y a une équipe ajouté",()=>{
        wrapper.addData({ equipes:[{nom: 'AntwiTeam' }]})
        //wrapper.vm.addEquipe();

        expect(wrapper.vm.$data.equipes).toEqual([{"nom": "Soldats"}, {"nom": "Stade Toulousain"},{nom: 'AntwiTeam' }]);

    })
})