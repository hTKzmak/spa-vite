import style from './PaginationElem.module.scss';

export default function PaginationElem({ previousPage, nextPage }: any) {

    // просто знаки
    const left_sign = '<';
    const right_sign = '>';

    return (
        <div className={style.paginationContainer}>
            <button onClick={() => previousPage()}>{left_sign}</button>
            <button onClick={() => nextPage()}>{right_sign}</button>
        </div>
    )
}