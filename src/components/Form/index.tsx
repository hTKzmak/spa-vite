import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { changeProduct, createProduct } from '../../features/products';
import style from './Form.module.scss';
import { useState } from 'react';

type ChoosenProduct = {
    id?: number,
    emoji?: string,
    name?: string, 
    category?: string,
    setChanging?: any,
    type: string
}

export default function Form({id, emoji, name, category, setChanging, type}: ChoosenProduct) {

    // значения данных
    const [values, setValues] = useState({
        emoji: !emoji ? "🎈" : emoji,
        name: !name ? "Example" : name,
        category: !category ? "Custom emoji" : category
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // отслеживание изменений значений input'ов
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const { name, value } = event.target;
        setValues((values) => ({
            ...values,
            [name]: value,
        }));
    };

    // подтвержление формы
    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();

        if(type == "create"){
            dispatch(createProduct(values))
            navigate('/products')
        }
        else{
            const new_data = {
                id: id,
                ...values
            }
            dispatch(changeProduct(new_data))
            setChanging(false)
        }
    }


    return (
        <div className={style.formContent}>
            <form className={style.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="emoji"
                    placeholder="🎈 (Only emojies)"
                    value={values.emoji}
                    onChange={handleInputChange}
                    pattern="[^a-zA-Z0-9]+"
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder='Emoji Name'
                    value={values.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder='Category name'
                    value={values.category}
                    onChange={handleInputChange}
                    required
                />
                <input type='submit' value={type == "create" ? 'Create' : 'Change'} />
            </form>
            {type == "create" ? (<button onClick={() => navigate(-1)}>Go back</button>) : <button onClick={() => setChanging(false)}>Cancel</button>}
        </div>
    )
}