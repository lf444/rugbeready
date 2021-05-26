import HomeHead from '@/components/HomeHead.vue'
import { text } from '@fortawesome/fontawesome-svg-core';
import { shallowMount,RouterLinkStub } from '@vue/test-utils'
import Vue from 'vue'

describe("HomeHead.vue",()=> {
    Vue.config.silent = true; //pour enlever les warning
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(HomeHead,{
            stubs: { RouterLink: RouterLinkStub, },
        })
    })
    it("regarde si l'onglet equipes existe",()=>{
        expect(wrapper.findAll("v-list-item-title").at(0).text()).toBe("Equipes")
    })
    it("regarde si l'onglet calendrier existe",()=>{
        expect(wrapper.findAll("v-list-item-title").at(1).text()).toBe("Calendrier")
    })
    it("regarde si le lien de redirection pour les equipes est bon",()=>{
       expect(wrapper.findAll("span").at(0).props().to).toBe("/")
     })
    it("regarde si le lien de redirection pour le calendrier est bon",()=>{
       expect(wrapper.findAll("span").at(1).props().to).toBe("/CalendrierVue")
     })

})