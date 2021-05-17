import HomeHead from '@/components/HomeHead.vue'
<<<<<<< master
<<<<<<< master
import { text } from '@fortawesome/fontawesome-svg-core';
import { shallowMount,createLocalVue,RouterLinkStub } from '@vue/test-utils'
//import VueRouter from 'vue-router'
import Vue from 'vue'
describe("HomeHead.vue",()=> {
    
    Vue.config.silent = true;

    let wrapper;
 /**const localVue = createLocalVue();
    localVue.use(VueRouter);*/

    beforeEach(() => {
        wrapper = shallowMount(HomeHead,{
            stubs: { RouterLink: RouterLinkStub, },
        })
    })
    it("regarde si l'onglet equipes existe",()=>{
        expect(wrapper.find("#Equipes").exists()).toBe(true);
        expect(wrapper.find('#Equipes').text()).toBe("Equipes")
    })
    it("regarde si l'onglet calendrier existe",()=>{
        expect(wrapper.find("#Calendrier").exists()).toBe(true);
        expect(wrapper.find('#Calendrier').text()).toBe("Calendrier")
    })

    // it("regarde si lorsqu'on clique sur messagerie, on va la-bas",()=>{
    //     wrapper.findAll("router-link").at(2).trigger("click")
    // })
})