import {
    expect
} from 'chai'
import {
    shallowMount
} from '@vue/test-utils'
import welcome from '@/components/welcome.vue'

describe('welcome.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message'
        const wrapper = shallowMount(welcome, {
            propsData: {
                msg
            }
        })
        expect(wrapper.text()).to.include(msg)
    })
})