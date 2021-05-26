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
       

        expect(wrapper.text()).toContain('Taille & Poids   Nouveau relevé taille & poids    Ajouter');


    })


})