import style from './Header.module.scss'

export default function Header() {

    return (
        <header className={style.header}>
            <h1>Emoji content</h1>
            <a href="https://github.com/hTKzmak" target='_blank'>Made by Melnik</a>
        </header>
    )
}