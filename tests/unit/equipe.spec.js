import Equipe from '@/components/Equipe.vue'
import { shallowMount,createLocalVue,RouterLinkStub } from '@vue/test-utils'
//import VueRouter from 'vue-router'
import Vue from 'vue'
//import Vuetify from 'vuetify'

describe("Equipe.vue",()=> {
    Vue.config.silent = true;

    let wrapper;
   /*let vuetify = new Vuetify();
    const localVue = createLocalVue();
    localVue.use(VueRouter);*/

    beforeEach(() => {
        wrapper = shallowMount(Equipe,{
           /** propsData: { 
                equipes:[],
                nom:"" }*/
              //  methods : {getEquipes: () =>{}}
              /**slots: {
                default: ListeEquipes,

              }*/
              /**localVue,
              vuetify,
                stubs: {
                  //VHover: '<slot></slot>',
                  VTooltip: '<v-tooltip-stub><slot></slot><slot name="activator"></slot></v-tooltip-stub>',
              },*/
            
        })
    })

    it('contains the right information',()=> {
        // columns and items are defined above
        // first cell in the header
        expect(wrapper.exists()).toBe(true);
    })
    it("regarde si il y a un bouton d'ajout d'équipe",()=>{
        //await wrapper.setData({ nom: 10 })
        expect(wrapper.find("v-btn").text()).toBe("Ajouter une équipe");
        
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