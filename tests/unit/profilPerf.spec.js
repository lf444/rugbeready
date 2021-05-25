import ProfilPerf from '@/components/Profil/Profil-Perf.vue'
import { text } from '@fortawesome/fontawesome-svg-core';
import { shallowMount,RouterLinkStub } from '@vue/test-utils'
import Vue from 'vue'
//import axios from 'axios';

jest.mock('axios')

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

describe("Profil-Perf.vue",()=> {
    Vue.config.silent = true; //pour enlever les warning
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(ProfilPerf,{
            //stubs: { RouterLink: RouterLinkStub, },
            methods: {
                getPerfsJoueur: ()=> {}
            },
        })
        wrapper.setData({datePerf:new Date().toISOString().substr(0, 10),
            squat: "",
            dcouche: "",
            tirage: "",
            detenteVerticale: "",
            tempsSprint: ""})
    })

    it("regarde si les données du joueur sont vraies",()=>{
       
        /**expect(wrapper.vm.$data.nom).toEqual("Antwi");
        expect(wrapper.vm.$data.prenom).toEqual("Daniel");
        expect(wrapper.vm.$data.poste).toEqual("Ailier");
        expect(wrapper.vm.$data.age).toEqual("21");
        expect(wrapper.vm.$data.email).toEqual("p@gmail.com");
        expect(wrapper.vm.$data.telephone).toEqual("0000000000");*/
        expect(wrapper.text()).toContain('Performances   Nouveau relevé performances       Ajouter');
        //expect(getIdentiteJoueur).toBeCalledTimes(1);

    })

    /**it("regarde si le telephone et l'age sont des entiers",()=>{
        expect(isNumber(wrapper.vm.$data.telephone)).toBe(true);
        expect(isNumber(wrapper.vm.$data.age)).toBe(true);
    })

    it("regarde si tout sauf le telephone et l'age ne sont pas des entiers",()=>{
        expect(isNumber(wrapper.vm.$data.nom)).toBe(false);
        expect(isNumber(wrapper.vm.$data.prenom)).toBe(false);
        expect(isNumber(wrapper.vm.$data.poste)).toBe(false);
        expect(isNumber(wrapper.vm.$data.mail)).toBe(false);
    })*/
})