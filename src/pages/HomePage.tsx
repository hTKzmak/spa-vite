import { useSelector } from "react-redux";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import { RootState } from "../app/store";
import { useEffect, useState } from "react";

export default function HomePage() {

    // получение всех данных
    const productsData = useSelector((state: RootState) => state.products.data)


    // Работа с пагинацией

    // текущая страница
    let [currentPage, setCurrentPage] = useState(1);

    // обновление currentPage при изменении productsData
    useEffect(() => {
        setCurrentPage(1);
    }, [productsData]);

    // кол-во нужных рецептов
    let itemsPerPage = 6;

    // длина всех данных
    let productsDataLength = productsData.length

    // Итоговое кол-во страниц
    let [paginationArr, setPaginationArr] = useState<number[]>([]);

    // итоговое кол-во страниц
    let totalPages = Math.ceil(productsDataLength / itemsPerPage);

    // добавление страниц в массив paginationArr
    useEffect(() => {
        const newPaginationArr = [];
        const totalPages = Math.ceil(productsData.length / itemsPerPage);
    
        for (let i = 1; i <= totalPages; i++) {
            newPaginationArr.push(i);
        }
    
        setPaginationArr(newPaginationArr);
    }, [productsData, itemsPerPage]);

    // перемещаемся на следующую страницу
    function nextPage() {
        if ((currentPage < totalPages) && getVisibleRecipes().length > 0) {
            setCurrentPage((prev) => {
                const nextPage = prev + 1;
                goToPage(nextPage);
                return nextPage;
            });
        }
    }

    // перемещаемя на предыдущую страницу
    function previousPage() {
        if (paginationArr[0] != currentPage) {
            setCurrentPage(currentPage - 1)
            goToPage(currentPage - 1)
        }
    }

    // ф-ия для изменения значение curretnPage в виде номера страницы
    function goToPage(pageNumber: number) {
        setCurrentPage(pageNumber);
    }

    // отображает данные в зависимости от: startIndex (сколько продуктов должно быть на странице, умножая на текущий номер страницы - 1) 
    // и от endIndex (прибавляем значение startIndex на кол-во нужных объектов на странице)
    function getVisibleRecipes() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return productsData.slice(startIndex, endIndex);
    }

    return (
        <div>
            <Header />
            <ProductList data={getVisibleRecipes()} nextPage={nextPage} previousPage={previousPage} />
        </div>
    )
}