import Equipe from '@/components/Equipe.vue'
import { text } from '@fortawesome/fontawesome-svg-core';
import { shallowMount,createLocalVue,RouterLinkStub } from '@vue/test-utils'
//import VueRouter from 'vue-router'
import Vue from 'vue'

describe("Equipe.vue",()=> {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Equipe,{

        })
    })

})