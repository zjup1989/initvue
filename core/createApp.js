import { effect } from '../node_modules/@vue/reactivity/dist/reactivity.esm-browser.js'
import { mountComponent, diff } from './renderer.js'
export function createApp(rootComponent) {
    return {
        mount(rootContainer){
            const container = document.querySelector(rootContainer)
            let { setup, render} = rootComponent
            setup = setup()
            let isMounted = false
            let preSubtree = null
            effect(() => {
                if (!isMounted) {
                    isMounted = true
                    const subtree = render(setup)
                    mountComponent(subtree, container)
                    preSubtree = subtree
                }else{
                    const subtree = render(setup)
                    diff(preSubtree, subtree)
                }
            })
            
        }
    }
}