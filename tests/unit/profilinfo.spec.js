import ProfilInfo from '@/components/Profil/Profil-Info.vue'
import { text } from '@fortawesome/fontawesome-svg-core';
import { shallowMount,RouterLinkStub } from '@vue/test-utils'
import Vue from 'vue'
//import axios from 'axios';

jest.mock('axios', () => ({
    get: Promise.resolve()
  }))

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
      
        expect(wrapper.vm.$data.nom).toEqual("Antwi");
        expect(wrapper.vm.$data.prenom).toEqual("Daniel");
        expect(wrapper.vm.$data.poste).toEqual("Ailier");
        expect(wrapper.vm.$data.age).toEqual("21");
        expect(wrapper.vm.$data.email).toEqual("p@gmail.com");
        expect(wrapper.vm.$data.telephone).toEqual("0000000000");


    })
})