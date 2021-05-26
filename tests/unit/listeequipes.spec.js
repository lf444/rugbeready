import ListeEquipes from '@/components/ListeEquipes.vue'
import { shallowMount,createLocalVue,RouterLinkStub } from '@vue/test-utils'
//import VueRouter from 'vue-router'
import Vue from 'vue'
  
describe("ListeEquipes.vue", ()=> {
    Vue.config.silent = true;
    let wrapper;
    beforeEach( () => {
        wrapper = shallowMount(ListeEquipes,{
            methods: {
                getEquipes: ()=> {}
            },
            stubs: { RouterLink: RouterLinkStub, },
        })
        wrapper.setData({ equipes:[{idEquipe:1,nom: 'Soldats' },{idEquipe:2,nom: 'Stade Toulousain'}]
        })
        
    })

    it('regarde si il y a des equipes',()=> {
        //expect(wrapper.vm.$data.equipes).toEqual([{idEquipe:1,nom: 'Soldats' },{idEquipe:2,nom: 'Stade Toulousain'}]);
        expect(wrapper.text()).toBe('Soldats Stade Toulousain  Ajouter une équipe    Ajouter')
    })

    it("regarde si il y a un bouton pour cliquer sur une équipe",()=>{
       expect(wrapper.findAll("span").at(0).props().to.name).toBe("EquipeVue")
        expect(wrapper.findAll("span").at(0).props().to.params.idEquipe).toBe(1)
    })


    it("regarde si il y a une équipe à ajouter",()=>{
        wrapper.setData({ nomEquipe:"AntwiTeam"
        })
        expect(wrapper.vm.$data.nomEquipe).toEqual("AntwiTeam");

    })

})