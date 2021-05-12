import ListeEquipes from '@/components/ListeEquipes.vue'
import { text } from '@fortawesome/fontawesome-svg-core';
import { shallowMount,createLocalVue,RouterLinkStub } from '@vue/test-utils'
//import VueRouter from 'vue-router'
import Vue from 'vue'

describe("ListeEquipes.vue",()=> {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(ListeEquipes,{
            data() {
                return {
                    equipes:[],
                    nom:"",
                }
              }
            
        })
    })

    it("regarde si il y a un bouton d'ajout d'équipe",()=>{
        expect(wrapper.find("#Equipes").exists()).toBe(true);
        
    })

    /**it("regarde si il y a une d'équipe",()=>{
            // n'accepte pas un `username` de moins de 7 caractères, exclut les espaces
        wrapper.setData({ username: " ".repeat(7) });

        // vérifie que `error` est restituée
        expect(wrapper.find(".error").exists()).toBe(true);

        // met à jour `username` afin qu'il soit suffisamment long
        wrapper.setData({ username: 'Lachlan' })

        // vérifie que `error` n'est plus restituée
        expect(wrapper.find(".error").exists()).toBe(false);
    })*/
})