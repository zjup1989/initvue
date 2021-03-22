export function mountComponent(vnode, container) {
    const { tag, props, children } = vnode
    // 标签
    const el = document.createElement(tag)
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
    console.log(n1, n2);
}