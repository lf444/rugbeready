import Calendrier from '@/components/Calendrier.vue'
import { shallowMount,createLocalVue,RouterLinkStub } from '@vue/test-utils'
//import VueRouter from 'vue-router'
import Vue from 'vue'
  
describe.skip("Calendrier.vue", ()=> {
    Vue.config.silent = true;
    let wrapper;
    beforeEach( () => {
        const refs = {calendar}
        wrapper = shallowMount(Calendrier,{
            methods: {
                getEvenements: ()=> {}
            },
            stubs: { RouterLink: RouterLinkStub, },
            mocks: {
                $refs
            }
        })
        wrapper.setData({ })
        })
        


    it('regarde si bonne initialisation',()=> {
        expect(wrapper.exists()).toBe(true)
    })
})