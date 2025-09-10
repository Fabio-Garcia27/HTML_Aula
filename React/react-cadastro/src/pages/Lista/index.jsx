import api from "../../services/api"
import { useEffect, useState } from "react"

function ListarUsuarios() {
    const [allUsers, setAllUsers] = useState()
    const [erro, setErro] = useState("")
    //É chamado toda vez que a tela carrega
    useEffect(() => {
        async function loadUsers() {

            const token = localStorage.getItem("token");

            if (!token) {
                setErro("Token não encontrado! Faça login novamente.");
                return;
            }

            //const { data: { users } } = await api.get("/listar-usuarios", {
            const { data } = await api.get("/listar-usuarios", {
                headers: { Authorization: token },
            })

            setAllUsers(data.users || []);
        }
        loadUsers()
    }, [])

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Listar Usuários</h2>
            <ul className="space-y-2">
                {allUsers && allUsers.length > 0 && allUsers.map(user => (
                    <li key={user.id} className="bg-gray-100 p-4 rounded-md">
                        <p className="font-semibold">Id: {user.id}</p>
                        <p className="font-semibold">Nome: {user.name}</p>
                        <p className="font-semibold">Email: {user.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListarUsuarios