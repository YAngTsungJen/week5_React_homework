import { useEffect,useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import {thousandsStamp} from '../../utils/filter'
import Loading from "../../utils/loading";
const {VITE_BASE_URL,VITE_API_PATH} = import.meta.env;
function Carts(){
    const [carts,setCarts] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const getCart = async() => {
        try {
            const res = await axios.get(`${VITE_BASE_URL}/api/${VITE_API_PATH}/cart`)
            console.log(res.data.data);
            setCarts(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const updateCart = async(cartId,product_id,qty=1) => {
        if(!qty || qty < 1 || !Number(qty)){
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "請輸入正確的數量",
                showConfirmButton: false,
                timer: 1500
            });
            return
        }
        try {
            const data = {product_id,qty: Number(qty)}
            const res = await axios.put(`${VITE_BASE_URL}/api/${VITE_API_PATH}/cart/${cartId}`,{data})
            console.log(res.data);
            await getCart();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "成功修改訂單",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error)
            Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "修改失敗",
                    showConfirmButton: false,
                    timer: 1500
                });
        }
    }
    const deleteSingleCart = async (cartId)=> {
        setIsLoading(true);
        try {
            const res = await axios.delete(`${VITE_BASE_URL}/api/${VITE_API_PATH}/cart/${cartId}`)
            console.log(res.data);
            await getCart();
            Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "已刪除這項訂單",
                    showConfirmButton: false,
                    timer: 1500
                });
        } catch (error) {
            console.log(error)
            Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "刪除單筆訂單發生錯誤",
                    showConfirmButton: false,
                    timer: 1500
                });
        }finally{
            setIsLoading(false);
        }
    }
    const deleteAllCart = async() => {
        setIsLoading(true);
        try {
            const res = await axios.delete(`${VITE_BASE_URL}/api/${VITE_API_PATH}/carts`)
            console.log(res.data);
            await getCart();
            Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "已全部刪除",
                    showConfirmButton: false,
                    timer: 1500
                });
        } catch (error) {
            console.log(error)
            Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "全部刪除發生錯誤",
                    showConfirmButton: false,
                    timer: 1500
                });
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        (async()=>{
            try {
                await getCart();
            } catch (error) {
                console.log(error);
            }
        })();
    },[])
    return (<>
    <Loading isLoading={isLoading} />
    <div className="container">
        <h2 className="text-center">購物車列表</h2>
        <div className="text-end mt-4">
            <button onClick={()=> deleteAllCart()} type="button" className="btn btn-outline-danger">
            清空購物車
            </button>
        </div>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">品名</th>
                    <th scope="col">數量/單位</th>
                    <th scope="col">小計</th>
                </tr>
            </thead>
            <tbody>
                { carts.carts && carts.carts.length > 0 ?  (
                    carts.carts.map(cart => {
                        return(
                            <tr key={cart.id}>
                                <td>
                                    <button onClick={()=> deleteSingleCart(cart.id)} type="button" className="btn btn-outline-danger btn-sm">
                                        刪除
                                    </button>
                                </td>
                                <th scope="row">{cart.product.title}</th>
                                <td>
                                    <div className="input-group input-group-sm mb-3">
                                        <input  min="1" max="999" onChange={(e)=> updateCart(cart.id,cart.product.id,Number(e.target.value))} type="number" defaultValue={cart.qty}  className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
                                        <span className="input-group-text" id="inputGroup-sizing-sm">{cart.product.unit}</span>
                                    </div>
                                </td>
                                <td className="text-end">{thousandsStamp(cart.final_total)}</td>
                            </tr>
                        )
                    })
                ):(
                    <tr>
                        <td colSpan="4" className="text-center">購物車沒有東西唷</td>
                    </tr>
                )}
            </tbody>
            <tfoot>
                {
                    carts.carts && carts.carts.length > 0 ?(
                        <tr>
                            <td className="text-end" colSpan="3">
                            總計
                            </td>
                            <td className="text-end">{thousandsStamp(carts.final_total)}</td>
                        </tr>
                    ) : ( 
                    <tr>
                    </tr>)
                }
            </tfoot>
        </table>
    </div>
    </>)
}

export default Carts;