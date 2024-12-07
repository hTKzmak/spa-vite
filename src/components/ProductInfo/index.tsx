import { useNavigate } from 'react-router-dom';
import style from './ProductInfo.module.scss'

export default function ProductInfo({ productData }: any) {

    const navigate = useNavigate();

    return (
        <div className={style.infoContent}>
            <button onClick={() => navigate(-1)}>go back</button>
            <span className={style.icon} dangerouslySetInnerHTML={{ __html: productData.emoji }}></span>
            <ul>
                <li><span>Name:</span> {productData.name}</li>
                <li><span>Category:</span> {productData.category}</li>
            </ul>
        </div>
    )
}