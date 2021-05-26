import Equipe from '@/components/Equipe.vue'
import { shallowMount,createLocalVue,RouterLinkStub } from '@vue/test-utils'
import Vue from 'vue'

describe("Equipe.vue",()=> {
    Vue.config.silent = true;
    let wrapper;
    beforeEach(() => {
        const $route = { path: 'http://rugbeready.fr/#/Equipe/', params :{ idEquipe: 2 } }

        wrapper = shallowMount(Equipe,{
            stubs: { RouterLink: RouterLinkStub, },

            methods : {
                getJoueursFromEquipes: () =>{}
            },
            mocks: {
                $route
            }
        })
        
    })

    it('contains the right information',()=> {

        expect(wrapper.exists()).toBe(true);
    })
    it.skip("regarde si il y a un bouton d'ajout d'équipe",()=>{
        wrapper.setData({ joueurs:[{nom: "Antwi",
        dateFinBlessure:  "24/05/2021",
        prenom: "Ligaments croisés",
        poste: "Ailier"}] })
        expect(wrapper.text()).toContain("Antwi");    
    })
})