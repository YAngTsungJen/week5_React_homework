import { RingLoader } from "react-spinners";
function Loading({isLoading}){
    return (<>{
        isLoading && (
        <div className="sweet-loading" style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(255,255,255,.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(3px)'
        }}>
            <RingLoader
                color={'red'}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>)}
    </>)
}
export default Loading;