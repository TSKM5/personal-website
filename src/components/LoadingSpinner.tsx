import './../css/components/loading-spinner.css';

export default function LoadingSpinner(props:{hasContainer?:boolean, classOverride?:string}) {
    const { hasContainer, classOverride} = props;
    return (
        <div className={'loading-spinner-container ' + classOverride}  style={{position:hasContainer? 'relative' :'absolute'}}>
            <div className="loading-spinner-widget"/>
        </div>
    )
}