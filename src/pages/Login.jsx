import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Checkbox from "../components/ui/Checkbox";

import { API_URL } from "../config"


export default function Login() {

    const navigate = useNavigate();
    const { onLogin } = useOutletContext(); // так как мы вызвали onLogin в фигурках, то понимаем, что внутри объект(ключ/значение)


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false); // это для чекбокса

    const [inputError, setInputError] = useState({}); // {} нужно чтобы выловить error из пропсов для инпута, также помним, что {} это объект типа ключ/значение, 
    // а значит в Инпуте нужно прописать error={inputError.email/password}

    const [errorMain, setErrorMain] = useState(null);


    function handleEmail(e) {
        setEmail(e.target.value); // как только начали вводить что-то в инпуте почты
        setInputError(prev => ({ ...prev, email: "" })); // обнуляется ошибка по почте, но по паролю сохраняется
        setErrorMain(null);
    }

    function handlePassword(e) {
        setPassword(e.target.value); // как только мы начали вводить что-то в инпуте пароля
        setInputError(prev => ({ ...prev, password: "" })); // обнуляется ошибка по паролю, но по почте сохраняется
        setErrorMain(null);
    }

    function handleCheckbox(e) {
        setRemember(e.target.checked);
    }



    function handleSubmit(e) {

        e.preventDefault();

        let newInputErrors = {}; // это нужно, чтобы удобно заполнять setInputError
        // помним, что если есть {}, то это объект типа ключ/значение, а значит нужно указать  newInputErrors.email/password

        if (!email.trim()) {
            newInputErrors.email = "need email";
        }

        if (!password.trim()) {
            newInputErrors.password = "need password";
        }


        if (Object.keys(newInputErrors).length > 0) { // Object.keys(newInputErrors) найдет ключи объекта newInputErrors, а как мы помним ключи у нас это email/password 
            // также убедиться можно посмотрев в Инпуты на эту строку - error={inputError.password/email}
            // .length > 0 говорит, что если ошибки есть, а обнуляются ошибки у нас в функция handlePassword/handleEmail
            setInputError(newInputErrors); // вкладываем в наш эррор по ошибкам инпута созданные ошибки
            return;
        }

        // 2. ЗАПРОС К LARAVEL
        fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    onLogin(data.user, data.access_token);

                    if (data.user.role === "admin") {
                        navigate("/admin");
                    } else {
                        navigate("/");
                    }
                } else {
                    setErrorMain(data.message || "Los datos no coinciden");
                }
            })
            .catch(err => {
                console.error("Auth error:", err);
                setErrorMain("Error de conexión con el servidor");
            });


        newInputErrors = ({});
        setErrorMain(null);
    }


    return (
        <div className="flex items-center justify-center py-10 px-5 lg:px-0">

            <section className="bg-black/50 w-full lg:w-2/3 xl:w-1/2 p-2 sm:p-10 rounded-2xl flex flex-col gap-5 items-center text-white">

                <h1>Bienvenido!</h1>

                <form onSubmit={handleSubmit} action="" className="w-full flex flex-col lg:px-20 gap-5">

                    {errorMain && (<p className="text-center font-bold text-pink-500">{errorMain}</p>)}

                    <Input
                        type="email"
                        variant="white"
                        value={email}
                        onChange={handleEmail}
                        label="Correo"
                        error={inputError.email}
                    />

                    <Input
                        type="password"
                        variant="white"
                        value={password}
                        onChange={handlePassword}
                        label="Contraseña"
                        error={inputError.password}
                    />

                    <div className="flex flex-col sm:flex-row justify-between">
                        <Checkbox label="Recordarme" checked={remember} onChange={handleCheckbox} />
                        <Link className="font-bold" to="/olvidado-contrasena">Ha olvidado su contraseña?</Link>
                    </div>

                    <div className="flex justify-center">
                        <Button type="submit">Entrar</Button>
                    </div>

                    <div className="flex items-center gap-5">
                        <p className="bg-white w-full h-0.5"></p>
                        <span>o</span>
                        <p className="bg-white w-full h-0.5"></p>
                    </div>

                    <div className="flex items-center justify-center gap-5">
                        <FcGoogle />
                        <Link className="font-bold" to="/google-login">Login con Google</Link>
                    </div>

                    <div className="flex flex-col items-center sm:flex-row justify-center gap-5">
                        <p>No tienes cuenta?</p>
                        <Link className="font-bold" to="/crear-cuenta">Crear cuenta</Link>
                    </div>

                </form>
            </section>

        </div>
    )
}