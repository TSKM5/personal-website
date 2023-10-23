import './../../css/components/action-components/icon-button.css'

export default function IconButton(props:{classOverride?:string, asset: { default: string },  callback:() => void}) {
    const { asset, classOverride, callback } = props; 
    
    return (
        <img draggable='false' className={'icon-button-base ' + classOverride} src={asset.default} alt={asset.default} onClick={callback}/> 
    )
}