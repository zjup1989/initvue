import { reactive } from "./node_modules/@vue/reactivity/dist/reactivity.esm-browser.js"
import { h } from './core/h.js'

export default {
    setup(){
        const state = reactive({
            count: 0
        })

        window.state = state

        return {
            state
        }
    },
    render(context){
        return h('div', {class: 'odiv'}, [
            h('p',{},context.state.count),
            h('p',{},'hellow!')
        ])
    }
}