import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/logoFuture.svg"
import Button from "../components/ui/Button"


export default function HeaderAdmin({ user, onLogout }) {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();   
        navigate("/"); 
    };

    return (
        <header className="py-3 px-2 md:px-14 bg-black/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-10 border-b-2 border-white pb-3">
                
                <Link to="/">
                    <img src={logo} alt="Future Travel" />
                </Link>

                <div className="flex items-center md:gap-8">
                    {/* Ссылка на обычный сайт, чтобы админ не "застрял" в панели */}
                    <Link to="/" className="text-center text-sm md:text-base font-bold text-white hover:underline">
                        Volver al sitio
                    </Link>

                    <div className="flex items-center gap-5 relative styleBefore pl-5">
                        <p className="text-center text-sm md:text-base text-white font-bold underline decoration-white">
                            Mode: {user?.name || "Admin"}
                        </p>
                        
                        {/* Привязываем функцию к кнопке */}
                        <Button onClick={handleLogoutClick}>
                            logout
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}