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