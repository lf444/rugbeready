import HomeHead from '@/components/HomeHead.vue'
import { text } from '@fortawesome/fontawesome-svg-core';
import { shallowMount } from '@vue/test-utils'

describe("HomeHead.vue",()=> {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(HomeHead,{

        })
    })
    it("regarde si l'onglet equipes existe",()=>{
        expect(wrapper.findAll("v-list-item-title").at(0).text()).toBe("Equipes")
    })
    it("regarde si l'onglet calendrier existe",()=>{
        expect(wrapper.findAll("v-list-item-title").at(1).text()).toBe("Calendrier")
    })
    // it("regarde si l'onglet messagerie existe",()=>{
    //     expect(wrapper.findAll("v-list-item-title").at(2).text()).toBe("Messagerie")
    // })

    it("regarde si lorsqu'on clique sur messagerie, on va la-bas",()=>{
        wrapper.findAll("router-link").at(2).trigger("click")
    })
})