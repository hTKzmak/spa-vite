import { useDispatch } from 'react-redux';
import ProductItem from '../ProductItem';
import style from './ProductList.module.scss';
import { useNavigate } from 'react-router-dom';
import { filterProducts, searchProducts } from '../../features/products';
import PaginationElem from '../PaginationElem';

export default function ProductList({ data, previousPage, nextPage }: any) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div>
            <div className={style.options}>
                <button onClick={() => navigate('/create-product')}>+ Add emoji</button>
                <select onChange={(event) => dispatch(filterProducts(event.target.value))}>
                    <option value="default">All</option>
                    <option value="favorite">Favorite</option>
                    <option value="custom">Created by you</option>
                </select>
                <input className={style.search} type="text" placeholder='Find your emoji' onInput={(event: React.ChangeEvent<HTMLInputElement>) => dispatch(searchProducts(event.target.value))} />
            </div>
            <div className={style.list}>
                {data.length !== 0 ? (
                    data.map((elem: any) => (
                        <ProductItem id={elem.id} key={elem.id} name={elem.name} emoji={elem.emoji} createdByUser={elem.createdByUser} favorite={elem.favorite} category={elem.category} />
                    ))
                )

                    :

                    (
                        <p className={style.noData}>¯\_(ツ)_/¯</p>
                    )
                }
            </div>
            <PaginationElem previousPage={previousPage} nextPage={nextPage} />
        </div>
    )
}