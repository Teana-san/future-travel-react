import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


export default function MainLayout({ user, onLogout, onLogin }) {


    return (
        <div className="min-h-screen flex flex-col">
            {/* Передаем данные пользователя и функцию выхода */}
            <Header user={user} onLogout={onLogout} />

            <main className="flex-1 w-full max-w-480 mx-auto">
                {/* Важно: прокидываем handleLogin в контекст, чтобы страница Login его видела */}
                <Outlet context={{ onLogin, user }} />
                { /* Когда пишут {{ }} это значит, что внутри находится объект js, а как мы помним объект - это пара ключ/значение - {{ color: "red" }}*/}
            </main>

            <Footer />
        </div>
    )
}