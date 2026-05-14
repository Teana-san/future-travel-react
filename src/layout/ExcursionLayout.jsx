import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


export default function ExcursionLayout({ user, onLogout, onLogin }) {


    return (
        <div>

            <div className="absolute top-0 left-0 w-full z-50">
                <Header user={user} onLogout={onLogout} />
            </div>

            <main className="flex-1 w-full max-w-480 mx-auto">
                {/* Важно: прокидываем onLogin в контекст, чтобы страница Login его видела */}
                <Outlet context={{ onLogin, user }} />
            </main>

            <Footer />

        </div>
    )
}