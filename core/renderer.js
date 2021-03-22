export function mountComponent(vnode, container) {
    const { tag, props, children } = vnode
    // 标签
    const el = (vnode.el = document.createElement(tag))
    // 属性
    for (const prop in props) {
        const value = props[prop];
        el.setAttribute(prop, value)   
    }
    // 子节点
    if (typeof children === 'string' || typeof children === 'number') {
        el.textContent = children
    }else if(Array.isArray(children)){
        children.forEach(child => {
            mountComponent(child, el)
        })
    }

    container.appendChild(el)

}

export function diff(n1, n2) {
    // oldVnode:n1
    // newVnode:n2
    const el = n1.el
    if (n1.tag !== n2.tag) {
        el.replaceWith(document.createElement(n2.tag))
    }else{
        const { props: oldProps } = n1
        const { props: newProps } = n2
        for (const prop in newProps) {
            const value = newProps[prop];
            el.setAttribute(prop, value)   
        }

        for (const prop in oldProps) {
            if (!newProps[prop]) {
                el.removeAttribute(prop)
            }
        }

        const { children: oldChildren } = n1
        const { children: newChildren } = n2
        if (typeof newChildren === 'string' || typeof newChildren === 'number') {
            if (typeof oldChildren === 'string' || typeof oldChildren === 'number') {
                el.textContent = newChildren
            }
            if (Array.isArray(oldChildren)) {
                el.textContent = newChildren
            }
        }
        if (Array.isArray(newChildren)) {
            if (typeof oldChildren === 'string' || typeof oldChildren === 'number') {
                el.textContent = ''
                newChildren.forEach(child => {
                    mountComponent(child, el)
                })
            }
            if (Array.isArray(oldChildren)) {
                const min = Math.min(newChildren.length, oldChildren.length)

                for (let i = 0; i < min; i++) {
                    diff(oldChildren[i], newChildren[i])
                }

                if (newChildren.length > min) {
                    for (let i = min; i < newChildren.length; i++) {
                        mountComponent(newChildren[i],el)
                    }
                }
                if (oldChildren.length > min) {
                    for (let i = min; i < oldChildren.length; i++) {
                        el.parent.removeChild(oldChildren[i].el)
                    }
                }
            }
        }

    }
}