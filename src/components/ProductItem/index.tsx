import style from './ProductItem.module.scss';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { addingToFavor, removeProduct } from '../../features/products';
import { useDispatch } from 'react-redux';


type Products = {
    id: string;
    name: string;
    emoji: string;
    createdByUser: boolean;
    favorite: boolean;
}

export default function ProductItem({ id, name, emoji, createdByUser, favorite }: Products) {

    const dispatch = useDispatch();

    return (
        <div className={style.itemContainer}>
            <Link to={`/products/${id}`}>
                <div className={style.item} id={id} key={id}>
                    <span dangerouslySetInnerHTML={{ __html: emoji }}></span>
                    <div className={style.info}>
                        <p>{name}</p>
                    </div>
                </div>
            </Link>
            <div className={style.options}>
                <button onClick={() => dispatch(addingToFavor(id))}>{!favorite ? <FaRegHeart /> : <FaHeart />}</button>
                {createdByUser ? (
                    <button onClick={() => dispatch(removeProduct(id))}><FaTrash /></button>
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}