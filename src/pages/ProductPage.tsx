import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { RootState } from "../app/store";
import ProductInfo from "../components/ProductInfo";

type Product = {
    category: string,
    group: string,
    htmlCode: string[],
    id: number,
    name: string,
    unicode: string[]
}

export default function ProductPage() {

    const [productData, setProductData] = useState<Product | undefined>();
    // находим с помощью useParams значение id
    const { id } = useParams()

    const productsData = useSelector((state: RootState) => state.products.data);

    useEffect(() => {
        const foundProduct = productsData.find((elem) => elem.id === Number(id));
        if (foundProduct) {
            // искусственно растягиваю время на получение данных
            setTimeout(() => {
                setProductData(foundProduct);
            }, 1000) 
        }
    }, [id, productsData]);

    // если данных пока нет, то отображаем Loading...
    if (!productData) {
        return <div className="loading">Loading...</div>;
    }
    
    return (
        <div>
            <ProductInfo productData={productData}/>
        </div>
    )
}