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
            squat: 150,
            dcouche: 120,
            tirage: 80,
            detenteVerticale: 60,
            tempsSprint: 5})
    })

    it("regarde si les données du joueur sont vraies",()=>{
        expect(wrapper.text()).toContain('Performances   Nouveau relevé performances       Ajouter');
    })

})