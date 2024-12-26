import {create} from "zustand"
import { axiosInstance } from "../libs/axios"
import toast from "react-hot-toast";
import {jwtDecode} from "jwt-decode"

export const authStore = create((set) => ({
    authUser: localStorage.getItem('auth_token') ? jwtDecode(localStorage.getItem('auth_token')) : null,
    token: localStorage.getItem('auth_token') || null,
    isLogging: false,
    login: async (data) => {
        console.log(data);
        set({isLogging: true})
        try {
            const rep = await axiosInstance.post("/api/users/signIn", data)
            set({token: rep.data.token})
            set({authUser: jwtDecode(rep.data.token)})
            localStorage.setItem('auth_token', rep.data.token)
            toast.success(rep.data.message)

            return true

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Erreur")

            return false
        } finally {
            set({isLogging: false})
        }
    },
    logout: () => {
        set({authUser: null})
        set({token: null})
        localStorage.removeItem('auth_token')
    }
}))