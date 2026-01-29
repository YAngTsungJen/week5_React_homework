import { useEffect,useState } from "react";
import { useParams ,useNavigate} from "react-router";

import Swal from 'sweetalert2'
import axios from "axios";
import Loading from "../../../utils/loading";
const {VITE_BASE_URL,VITE_API_PATH} = import.meta.env;
function Product(){
    const [product,setProduct] = useState({});
    const params = useParams();
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = params;
    useEffect(()=>{
        (async()=>{
            const res = await axios.get(`${VITE_BASE_URL}/api/${VITE_API_PATH}/product/${id}`)
            setProduct(res.data.product)
        })()
    },[id]);
    const changeToProducts = (e) => {
        e.preventDefault();
        setTimeout(()=> {
            navigate('/products')
        },500)
    }
    const AddCart = async(e,product_id,qty=1)=> {
        e.preventDefault();
        setIsLoading(true);
        const data = {
            product_id,qty
        }
        try {
            const res = await axios.post(`${VITE_BASE_URL}/api/${VITE_API_PATH}/cart`,{data})
            console.log(res);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "已加入購物車",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error.response.data)
            Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "無法加入購物車",
                    showConfirmButton: false,
                    timer: 1500
                });
        }finally{
            setIsLoading(false);
        }

    }
    if (!product || !product.id) {
    return <div>沒有可用的產品資料。</div>};
    return (<>
    <Loading isLoading={isLoading} />
    <div className="container">
        <div className="row mt-5">
            <div className="col-md-4 mb-3">
                <h2>個人產品</h2>
                <div className="card" style={{width:'18rem'}}> 
                    <div style={{height: '250px', overflow: 'hidden'}}>
                        <img src={product.imageUrl || ''} className="card-img-top primary-image" style={{width: '100%', height: '100%', objectFit: 'cover'}} alt={product.title}/>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">
                            {product.title}
                            <span className="badge bg-primary ms-2">{product.category}</span>
                        </h5>
                        <p className="card-text">商品描述：{product.description}</p>
                        <p className="card-text">商品內容：{product.content}</p>
                        <div className="d-flex">
                            <p className="card-text text-secondary">
                                <del>{product.origin_price}</del>
                            </p>
                            &nbsp;元 / {product.price} 元
                        </div>
                        <div className="d-flex justify-content-between gap-2">
                            <button className="btn btn-danger" onClick={(e)=> AddCart(e,product.id,product.num)}>立即購買</button>
                            <button className="btn btn-primary" onClick={(e)=> changeToProducts(e)}>返回產品</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>)
}

export default Product;