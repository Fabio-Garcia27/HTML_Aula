import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react"
import api from "../../services/api"

function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            const { data } = await api.post('/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });

            if (!data || data.error) {
                throw new Error("Token não retornado pelo servidor");
            }

            localStorage.setItem('token', data)

            navigate("/listar-usuarios")

        } catch (err) {
            console.error("Erro no login:", err);
            alert("Email ou senha incorretos!");
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            <form className="flex-col gap-5" onSubmit={handleSubmit}>
                <input
                    ref={emailRef}
                    placeholder="Email"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
                <input
                    ref={passwordRef}
                    placeholder="Senha"
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400">
                    Login
                </button>
            </form>
            <Link to="/" className="text-blue-700 hover:underline mt-4 block text-center">
                Não tem uma conta? Cadastra-se
            </Link>
        </div>
    )
}

export default Login