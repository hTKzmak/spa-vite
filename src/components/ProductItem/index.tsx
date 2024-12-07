import style from './ProductItem.module.scss';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaTrash, FaPencilAlt } from "react-icons/fa";
import { addingToFavor, removeProduct } from '../../features/products';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Form from '../Form';


type Products = {
    id: number;
    name: string;
    emoji: string;
    createdByUser: boolean;
    favorite: boolean;
    category: string;
}

export default function ProductItem({ id, name, emoji, createdByUser, favorite, category }: Products) {

    const dispatch = useDispatch();

    const [changing, setChanging] = useState(false);

    if (changing == true) {
        return (
            <div className={style.itemContainer}>
                <div className={style.item}>
                    <Form id={id} emoji={emoji} name={name} category={category} setChanging={setChanging} type="change"/>
                </div>
            </div>
        )
    }

    return (
        <div className={style.itemContainer}>
            <Link to={`/products/${id}`}>
                <div className={style.item} id={id.toString()} key={id}>
                    <span dangerouslySetInnerHTML={{ __html: emoji }}></span>
                    <div className={style.info}>
                        <p>{name}</p>
                    </div>
                </div>
            </Link>
            <div className={style.options}>
                <button onClick={() => dispatch(addingToFavor(id))}>{!favorite ? <FaRegHeart /> : <FaHeart />}</button>
                {createdByUser ? (<button onClick={() => setChanging(!changing)}><FaPencilAlt /></button>) : ('')}
                {createdByUser ? (<button onClick={() => dispatch(removeProduct(id))}><FaTrash /></button>) : ('')}
            </div>
        </div>
    )
}