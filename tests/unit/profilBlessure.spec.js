import ProfilBlessure from '@/components/Profil/Profil-Blessure.vue'
import { text } from '@fortawesome/fontawesome-svg-core';
import { shallowMount,RouterLinkStub } from '@vue/test-utils'
import Vue from 'vue'
import axios from 'axios';

jest.mock('axios');

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

describe("Profil-Blessure.vue",()=> {
    Vue.config.silent = true; //pour enlever les warning
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(ProfilBlessure,{
            //stubs: { RouterLink: RouterLinkStub, },
            methods: {
                getBlessuresJoueur: ()=> {}
            },
        })
        wrapper.setData({ blessures:[{tempsRepos: "200",
        dateBlessure:  "24/05/2021",
        typeBlessure: "Ligaments croisés",
        contextBlessure: "Match",}] })
    })

    it("regarde si les données d'une blessure sont vraies",()=>{
        expect(wrapper.text()).toContain('24/05/2021 200 Ligaments croisés Match');
        //expect(getIdentiteJoueur).toBeCalledTimes(1);

    })

})