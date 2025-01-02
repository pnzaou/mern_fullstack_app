import {create} from "zustand"
import {axiosInstance} from "../libs/axios"


export const postStore = create((set, get) => ({
    allPosts: [],
    isPostsLoading: false,
    isMorePostsLoading: false,
    isError: false,
    isMorePostsError: false,

    getAllPosts: async (token, skip) => {
        set({isPostsLoading: true, isError: false})

        try {
            const rep = await axiosInstance.get(`api/posts?skip=${skip}`, {
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

    getMorePosts: async (token, skip) => {
        const {allPosts} = get()
        set({isMorePostsLoading: true, isMorePostsError: false})

        try {
            const rep = await axiosInstance.get(`api/posts?skip=${skip}`, {
                headers: {
                    Authorization: token
                }
            })
            const {success, data} = rep.data
            if(success) {
                set({allPosts: [...allPosts, ...data]})
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            set({isMorePostsLoading: false})
        }
    }
}))