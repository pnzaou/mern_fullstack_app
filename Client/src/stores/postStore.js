import {create} from "zustand"
import {axiosInstance} from "../libs/axios"


export const postStore = create((set) => ({
    allPosts: [],
    isPostsLoading: false,
    isError: false,

    getAllPosts: async (token) => {
        set({isPostsLoading: true, isError: false})

        try {
            const rep = await axiosInstance.get("api/posts", {
                headers: {
                    Authorization: token
                }
            })
            const {success, data} = rep.data
            if(success) {
                set({allPosts: data})
            }
        } catch (error) {
            console.log(error.message)
            set({isError: true})
        } finally {
            set({isPostsLoading: false})
        }
    },
}))