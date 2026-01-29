import { useNavigate} from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../../utils/Pagination";

const {VITE_BASE_URL,VITE_API_PATH} = import.meta.env;

function Products(){
    const [products,setProducts] = useState([]);
    const [pages,setPages] = useState({});
    const [isLoading,setIsLoading] = useState({});
    const navigate = useNavigate();
    const getProducts = async(page = 1) => {
        const res = await axios.get(`${VITE_BASE_URL}/api/${VITE_API_PATH}/products?page=${page}`)
        setProducts(res.data.products);
        setPages(res.data.pagination)
    };
    useEffect(()=>{
        (async()=>{
            try {
                getProducts();
            } catch (error) {
                console.log(error);
            }
        })();
    },[]);
    const handlePageChange = (e,page) =>{
        e.preventDefault();
        getProducts(page);
    }
    const changeWebsite = (e,product) => {
        setIsLoading({
            ...isLoading,
            [product.id]: true
        });
        e.preventDefault();
        setTimeout(()=> {
            navigate(`/product/${product.id}`)
        },500)
    }
    return (<>
    <div className="container">
        <h1 className="text-center">產品列表</h1>
        <div className="row mt-5">
            {
                products && products.length > 0 ? (
                    products.map(product => {
                        return (
                            <div className="col-md-4 mb-3" key={product.id}>
                                <div className="card" style={{width: '24rem'}}>
                                    <figure className="figure" style={{height: '250px', overflow: 'hidden'}}>
                                        <img src={product.imageUrl} className="card-img-top img-fluid" style={{width: '100%', height: '100%', objectFit: 'cover'}} alt={product.title}/>
                                    </figure>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}
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
                                        <button type="button" className="btn btn-primary mt-2" onClick={(e)=> changeWebsite(e,product)}>查看更多
                                            {
                                                isLoading[product.id] && (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>)
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (<div>查無資料</div>)
            }
            <div className="d-flex justify-content-center">
                <Pagination pages={pages} handlePageChange = {handlePageChange}/>
            </div>
        </div>
    </div>
    </>)
}

export default Products;