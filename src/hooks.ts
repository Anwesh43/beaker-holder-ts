import {
    CSSProperties,
    useEffect,
    useState
} from 'react'


const delay : number = 20 
const scGap : number = 0.01

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


export const useStyle = (w : number, h : number, scale : number) => {
    const size : number = Math.min(w, h) / 10
    const lSize : number = Math.min(w, h) / 3
    const position = 'absolute'
    const background : string = "indigo"
    const sf : number = sinify(scale)
    const sf1 : number = divideScale(sf, 0, 3)
    const sf2 : number = divideScale(sf, 1, 3)
    const lineWidth = Math.min(w,  h) / 90
    return {
        parentStyle() : CSSProperties {
            const left : string = `${w / 2}px`
            const top : string = `${h / 2}px`
            const transform = `rotate(${-180 * sf1}deg)`
            return {
                position, 
                left, 
                top, 
                transform 
            }
        },
        lineStyle() : CSSProperties {
            const left = `${-lSize}px`
            const top = `${0}px`
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
            const left = `${-lSize - size}px`
            const top = `${0}px`
            const borderTop = `${lineWidth}px solid ${background}`
            const borderLeft = `${lineWidth}px solid ${background}`
            const borderRight = `${lineWidth}px solid ${background}`
            const borderBottom = `none`
            const width = `${size}px`
            const height = `${size}px`
            return {
                position, 
                left, 
                top, 
                borderTop, 
                borderLeft, 
                borderRight,
                borderBottom,
                width, 
                height 
            }
        },

        ballStyle() : CSSProperties {
            const borderRadius = '50%'
            const left = `${w / 2 + lSize}px`
            const top = `${(h / 2 - size) *sf2}px`
            const width = `${size}px`
            const height = `${size}px`
            return {
                position, 
                left, 
                top, 
                width, 
                height, 
                borderRadius,
                background
            }
        }

    }
}