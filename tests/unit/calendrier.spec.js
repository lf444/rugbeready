import Calendrier from '@/components/Calendrier.vue'
import { shallowMount,createLocalVue,RouterLinkStub } from '@vue/test-utils'
//import VueRouter from 'vue-router'
import Vue from 'vue'
  
describe("Calendrier.vue", ()=> {
    Vue.config.silent = true;
    let wrapper;
    beforeEach( () => {
        wrapper = shallowMount(Calendrier,{
            methods: {
                getEvenements: ()=> {}
            },
            stubs: { RouterLink: RouterLinkStub, },
        })
        wrapper.setData({ })
        })
        


    it('regarde si il y a des equipes',()=> {
        //expect(wrapper.vm.$data.equipes).toEqual([{"nom": "Soldats"}, {"nom": "Stade Toulousain"}]);
        expect(wrapper.text()).toBe('Soldats Stade Toulousain  Ajouter une équipe    Ajouter')
    })
})