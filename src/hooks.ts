import {
    CSSProperties,
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


const useStyle = (w : number, h : number, scale : number) => {
    const size : number = Math.min(w, h) / 10
    const lSize : number = Math.min(w, h) / 3
    const position = 'absolute'
    const background : string = "indigo"
    const sf : number = sinify(scale)
    const sf1 : number = divideScale(sf, 0, 2)
    const sf2 : number = divideScale(sf, 1, 2)
    return {
        parentStyle() {
            const left : string = `${w / 2}px`
            const top : string = `${h / 2}px`
            const transform = `rotate(${180 * sf1}deg)`
            return {
                position, 
                left, 
                top, 
                transform 
            }
        },
        lineStyle() {
            const left = `${-lSize}px`
            const top = `${-Math.min(w, h) / 180}px`
            const width = `${lSize}px`
            const height = `${Math.min(w,  h) / 90}px` 
            return {
                position, 
                left, 
                top, 
                width, 
                height, 
                background
            }
        },  

        containerStyle() : CSSProperties {
            const left = `${-lSize}px`
            const top = `${-size}px`
            const borderTop = `${size}px solid ${background}`
            const borderLeft = `${size}px solid ${background}`
            const borderRight = `${size}px solid ${background}`
            const borderBottom = `none`
            return {
                left, 
                top, 
                borderTop, 
                borderLeft, 
                borderRight,
                borderBottom
            }
        },

        ballStyle() : CSSProperties {
            const borderRadius = '50%'
            const left = `${lSize}px`
            const top = `${-(h / 2) * (1 - sf2)}px`
            const width = `${size}px`
            const height = `${size}px`
            return {
                position, 
                left, 
                top, 
                width, 
                height, 
                borderRadius
            }
        }

    }
}