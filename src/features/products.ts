import { createSlice } from '@reduxjs/toolkit'

export interface ProductsState {
    data: any[],
    staticData: any[],
    filterOption: string,
}

const initialState: ProductsState = {
    // обычные данные с API
    data: [],
    // статические данные с API, которые нельзя корректировать (кроме добавления новых продуктов)
    staticData: [],
    filterOption: "default",
}

export const productsSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // добавление данных с API
        addingData(state, action) {
            state.data = action.payload
            state.staticData = action.payload

            console.log(state.data)
        },
        // удаление продуктов
        removeProduct(state, action) {
            const choosenProduct = state.staticData.findIndex(elem => elem.id === action.payload)

            if (choosenProduct !== -1) {
                state.data.splice(choosenProduct, 1);
                state.staticData.splice(choosenProduct, 1);
            }
        },
        // поиск продуктов
        searchProducts(state, action) {
            let filteredData;

            // Определяем, какой набор данных фильтруем
            switch (state.filterOption) {
                case "favorite":
                    filteredData = state.staticData.filter(elem => elem.favorite);
                    break;
                case "custom":
                    filteredData = state.staticData.filter(elem => elem.createdByUser);
                    break;
                default:
                    filteredData = state.staticData;
                    break;
            }

            // Применяем поиск
            const searchTerm = action.payload.toLowerCase();
            state.data = filteredData.filter(elem => elem.name.toLowerCase().includes(searchTerm));

            // Если поле поиска пустое, возвращаем данные по текущему фильтру
            if (!searchTerm) {
                state.data = filteredData;
            }
        },
        // фильтрация продуктов
        filterProducts(state, action) {
            state.filterOption = action.payload

            switch (action.payload) {
                case "default":
                    state.data = state.staticData;
                    break;
                case "favorite":
                    state.data = state.staticData.filter(elem => elem.favorite);
                    break;
                case "custom":
                    state.data = state.staticData.filter(elem => elem.createdByUser);
                    break;
                default:
                    state.data = state.staticData;
                    break;
            }
        },
        // добавление или удаление товара из любимых
        addingToFavor(state, action) {
            const productIndex = state.staticData.findIndex(elem => elem.id === action.payload);

            if (productIndex !== -1) {
                // находим продукт в статических данных и меняем значение favorite
                const product = state.staticData[productIndex];
                product.favorite = !product.favorite;

                // Обновление текущего списка отображаемых продуктов
                state.data = state.data.map(item =>
                    item.id === action.payload ? { ...item, favorite: product.favorite } : item
                );
            }
        },
        // создание нового продукта и добавление его в данные
        createProduct(state, action) {
            const newProduct = {
                "id": Date.now(),
                "favorite": false,
                "createdByUser": true,
                "name": action.payload.name,
                "category": action.payload.category,
                "emoji": action.payload.emoji,
            }

            state.data.unshift(newProduct)
            state.staticData.unshift(newProduct)
        },
        changeProduct(state, action) {
            const productIndex = state.staticData.findIndex(elem => elem.id === action.payload.id)

            if (productIndex !== -1) {
                // находим продукт в статических данных и меняем значения
                const product = state.staticData[productIndex];
                product.name = action.payload.name;
                product.emoji = action.payload.emoji;
                product.category = action.payload.category;

                // Обновление текущего списка отображаемых продуктов
                state.data = state.data.map(item =>
                    item.id === action.payload.id ? { ...item, name: product.name, emoji: product.emoji, category: product.category } : item
                );
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { addingData, removeProduct, searchProducts, filterProducts, addingToFavor, createProduct, changeProduct } = productsSlice.actions

export default productsSlice.reducer