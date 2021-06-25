import React from 'react'
import withContext from './withContext'
import {
    useStyle
} from './hooks'
interface BHProps {
    w : number, 
    h : number, 
    onClick : Function, 
    scale : number 
}

const BeakerHolder : React.FC<BHProps> = (props : BHProps) => {
    const {w, h, onClick, scale} = props 
    const {parentStyle, lineStyle, containerStyle, ballStyle} = useStyle(w, h, scale) 
    return (
        <React.Fragment>
            <div style = {parentStyle()}>
                <div style = {lineStyle()}></div>
                <div style = {containerStyle()}></div> 
            </div>
            <div onClick = {() => onClick()}style = {ballStyle()}></div>
        </React.Fragment>
    )
}

export default withContext(BeakerHolder)