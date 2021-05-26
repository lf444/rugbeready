import ProfilInfo from '@/components/Profil/Profil-Info.vue'
import { text } from '@fortawesome/fontawesome-svg-core';
import { shallowMount,RouterLinkStub } from '@vue/test-utils'
import Vue from 'vue'
//import axios from 'axios';

jest.mock('axios', () => ({
    get: Promise.resolve()
  }))

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

describe("Profil-Info.vue",()=> {
    Vue.config.silent = true; //pour enlever les warning
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(ProfilInfo,{
            //stubs: { RouterLink: RouterLinkStub, },
            methods: {
                getIdentiteJoueur: ()=> {}
            },
        })
        wrapper.setData({ nom:"Antwi",
        prenom:"Daniel",
        poste:"Ailier",
        age:"21",
        email:"p@gmail.com",
        telephone:"0000000000",})
    })

    it("regarde si les données du joueur sont vraies",()=>{
       

        expect(wrapper.text()).toContain('Informations générales Prénom : Daniel Nom : Antwi Age : 21 ans Poste : Ailier');

    })

    it("regarde si le telephone et l'age sont des entiers",()=>{
        expect(isNumber(wrapper.vm.$data.telephone)).toBe(true);
        expect(isNumber(wrapper.vm.$data.age)).toBe(true);
    })

    it("regarde si tout sauf le telephone et l'age ne sont pas des entiers",()=>{
        expect(isNumber(wrapper.vm.$data.nom)).toBe(false);
        expect(isNumber(wrapper.vm.$data.prenom)).toBe(false);
        expect(isNumber(wrapper.vm.$data.poste)).toBe(false);
        expect(isNumber(wrapper.vm.$data.mail)).toBe(false);
    })
})