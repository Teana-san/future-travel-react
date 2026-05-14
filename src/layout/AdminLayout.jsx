import { Outlet } from "react-router-dom"
import HeaderAdmin from "./HeaderAdmin"
import AdminMenu from "./AdminMenu"
import Footer from "./Footer"

export default function AdminLayout({ user, onLogout }) {

    return (
        <div className="min-h-screen flex flex-col">

            <HeaderAdmin user={user} onLogout={onLogout} />

            <main className="flex-1 grid grid-cols-1 lg:grid-cols-6 py-5 lg:py-10 gap-5">
                <div className="lg:col-span-1">
                <AdminMenu />
                </div>

                <div className="lg:col-span-5 px-4 md:pr-14 overflow-hidden">
                    <Outlet />
                </div>
            </main>

            <Footer />

        </div>
    )
}