import ProfilPT from '@/components/Profil/Profil-PoidsTaille.vue'
import { text } from '@fortawesome/fontawesome-svg-core';
import { shallowMount,RouterLinkStub } from '@vue/test-utils'
import Vue from 'vue'
import axios from 'axios';

jest.mock('axios');

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

describe("Profil-Taille.vue",()=> {
    Vue.config.silent = true; //pour enlever les warning
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(ProfilPT,{
            //stubs: { RouterLink: RouterLinkStub, },
            methods: {
                getTaillePoidsJoueur: ()=> {}
            },
        })
        wrapper.setData({taille:185,dateTaillePoids:"25/05/2021",poids:95 })
    })

    it("regarde si c'est bien initialisé",()=>{
       
        /**expect(wrapper.vm.$data.nom).toEqual("Antwi");
        expect(wrapper.vm.$data.prenom).toEqual("Daniel");
        expect(wrapper.vm.$data.poste).toEqual("Ailier");
        expect(wrapper.vm.$data.age).toEqual("21");
        expect(wrapper.vm.$data.email).toEqual("p@gmail.com");
        expect(wrapper.vm.$data.telephone).toEqual("0000000000");*/
        //axios.get
        expect(wrapper.text()).toContain('Taille & Poids   Nouveau relevé taille & poids    Ajouter');
        //expect(getIdentiteJoueur).toBeCalledTimes(1);

    })

    /*it("regarde si le telephone et l'age sont des entiers",()=>{
        expect(isNumber(wrapper.vm.$data.telephone)).toBe(true);
        expect(isNumber(wrapper.vm.$data.age)).toBe(true);
    })*/

})