import ListeEquipes from '@/components/ListeEquipes.vue'
import { shallowMount } from '@vue/test-utils'

describe("ListeEquipes.vue",()=> {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(ListeEquipes,{
            methods: {
                AllRecords : ()=>{}
            }

        })
    })
    it("renders",()=>{
        expect(wrapper.exists()).toBe(true);
    })
})