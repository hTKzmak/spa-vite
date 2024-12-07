import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../features/products';
import style from './Form.module.scss';
import { useState } from 'react';

export default function Form() {

    // значения данных
    const [values, setValues] = useState({
        emoji: "🎈",
        name: "Example",
        category: "Custom emoji"
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

        dispatch(createProduct(values))
        navigate('/products')
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
                <input type='submit' value="Create" />
            </form>
            <button onClick={() => navigate(-1)}>Go back</button>
        </div>
    )
}