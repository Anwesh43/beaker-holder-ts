import {
    useEffect,
    useState
} from 'react'


const delay : number = 20 
const scGap : number = 0.02 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev + scGap > 1) {
                            setScale(0)
                            clearInterval(interval)
                            setAnimated(false)      
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w, 
        h
    }
}

const maxScale = (
    scale : number,
    i : number,
    n : number
) : number => Math.max(0, scale - i / n)


const divideScale = (
    scale : number,
    i : number,
    n : number
) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 

const sinify = (
    scale : number
    ) : number => Math.sin(scale * Math.PI)
