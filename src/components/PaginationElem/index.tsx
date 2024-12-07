import style from './PaginationElem.module.scss';

export default function PaginationElem({ currentPage, itemsPerPage, productsDataLength, paginationArr, previousPage, nextPage, totalPages, goToPage }: any) {

    console.log(paginationArr)

    // просто знаки
    const left_sign = '<';
    const right_sign = '>';

    return (
        <div className={style.paginationContainer}>
            <button onClick={() => previousPage()}>{left_sign}</button>
            <div className="list">
                {paginationArr.map((page: number) => {
                    <button onClick={() => goToPage(page)}>{page}</button>
                })}
            </div>
            <button onClick={() => nextPage()}>{right_sign}</button>
        </div>
    )
}