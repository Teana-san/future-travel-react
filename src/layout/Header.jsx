import { useState } from "react"; 
import { NavLink, Link, useNavigate } from "react-router-dom";

import { HiMenu, HiX } from "react-icons/hi"; 
import logo from "../assets/logoFuture.svg";

import Button from "../components/ui/Button";

const linkState = ({ isActive }) => 
    isActive ? "styleAfterNav text-xl text-white" : "text-xl text-white hover:text-gray-300";


export default function Header({ user, onLogout }) {

    const [isOpen, setIsOpen] = useState(false); 
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();
        setIsOpen(false);
        navigate("/");
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="py-3 px-4 md:px-14 bg-black/50 relative z-50">
            <div className="flex justify-between items-center border-b-2 border-white pb-3">
                
                {/* Логотип */}
                <NavLink to="/" end onClick={() => setIsOpen(false)}>
                    <img src={logo} alt="Future Travel" className="h-8 md:h-auto" />
                </NavLink>

                {/* Кнопка бургера (только для мобилок) */}
                <button 
                    className="text-white lg:hidden p-2" 
                    onClick={toggleMenu}
                >
                    {isOpen ? <HiX size={32} /> : <HiMenu size={32} />}
                </button>

                {/* Навигация */}
                <nav className={`
                    ${isOpen ? "flex" : "hidden"} 
                    lg:flex flex-col lg:flex-row absolute lg:relative top-full left-0 w-full lg:w-auto 
                    bg-black/90 lg:bg-transparent p-5 lg:p-0 gap-5 items-center text-white
                `}>
                    <NavLink to="/valoraciones" className={linkState} onClick={() => setIsOpen(false)}>
                        valoraciones
                    </NavLink>
                    <NavLink to="/sobre-nosotros" className={linkState} onClick={() => setIsOpen(false)}>
                        sobre nosotros
                    </NavLink>
                    <NavLink to="/contacto" className={linkState} onClick={() => setIsOpen(false)}>
                        contacto
                    </NavLink>

                    {user ? (
                        <div className="flex flex-col md:flex-row items-center gap-5">
                            {user.role === "admin" && (
                                <NavLink to="/admin" className={linkState} onClick={() => setIsOpen(false)}>
                                    Admin Panel
                                </NavLink>
                            )}
                            {user.role !== "admin" && (
                                <NavLink to="/user-config" onClick={() => setIsOpen(false)}>
                                    <span className="relative styleBefore pl-5">{user.name}</span>
                                </NavLink>
                            )}
                            <Button onClick={handleLogoutClick}>
                                logout
                            </Button>
                        </div>
                    ) : (
                        <NavLink to="/login" className={linkState} onClick={() => setIsOpen(false)}>
                            login
                        </NavLink>
                    )}
                </nav>
            </div>
        </header>
    );
}