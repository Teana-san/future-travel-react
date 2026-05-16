import { Link } from "react-router-dom"
import logo from "../assets/logoFuture.svg"

import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiTiktokLine } from "react-icons/ri";



export default function Footer() {

    return (
        <footer className="py-3 px-4 md:px-14 bg-black/50">

            <div className="grid grid-col-1 md:grid-cols-4 gap-5 md:gap-0 lg:gap-5 justify-items-center border-t-2 border-white pt-3">

                <img className="md:col-span-2 lg:col-span-1" src={logo} alt="Future Travel" />

                <div className="md:col-span-2 lg:col-span-2 text-sm flex flex-col items-center text-white gap-5">
                    <p className="text-center">© 2025 FutureTravel — Todos los derechos reservados</p>
                    <nav className="text-center flex flex-col sm:flex-row gap-5">
                        <Link to="/politica-privacidad">Política de privacidad</Link>
                        <span className="hidden sm:flex md:hidden lg:flex">|</span>
                        <Link to="/condiciones">Términos y condiciones</Link>
                    </nav>
                </div>

                <nav className="md:col-span-2 lg:col-span-1 md:order-2 flex gap-10 text-white">
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer nofollow"><RiTiktokLine className="size-6" /></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer nofollow"><FaInstagram className="size-6" /></a>
                    <a href="https://x.com" target="_blank" rel="noopener noreferrer nofollow"><FaXTwitter className="size-6" /></a>           
                </nav>

            </div>

        </footer>
    )
}