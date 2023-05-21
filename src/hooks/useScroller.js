import { useState, useEffect } from 'react'


export const useScroller = (id) => {
    const [displayNav,setDisplayNav] = useState(true)

    useEffect(() => {
        const container = document.getElementById(id)
        if (!container) return undefined
        let lastScrollTop = container.scrollTop
    
        const handleScroll = () => {
            if(container.scrollTop > lastScrollTop) setDisplayNav(false)
            if(container.scrollTop < lastScrollTop) setDisplayNav(true)
            lastScrollTop = Math.max(container.scrollTop, 0) // for mobile or negative scrolling
        }

        container.addEventListener('scroll', handleScroll)
        handleScroll()
    
        return () => container.removeEventListener('scroll', handleScroll)
    
    }, [id])

    return displayNav
}