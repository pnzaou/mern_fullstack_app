import BottomNavBar from "./components/Bottom-nav-bar"
import Navbar from "./components/Navbar"
import PostCard from "./components/Post-card"
import { postStore } from "./stores/postStore"
import {authStore} from "./stores/authStore"
import { useEffect } from "react"
import PostSkeleton from "./components/skeletons/Post-skeleton"

function App() {
  const {token} = authStore()
  const {allPosts, getAllPosts, isPostsLoading, isError} = postStore()

  useEffect(() => {
    getAllPosts(token)
  }, [getAllPosts, token])

  const refetch = () => getAllPosts(token)

  return (
    <div>
      <Navbar page="pour vous"/>
      {isPostsLoading 
        ? (
          <PostSkeleton/>
        ) 
        : isError 
        ? (
          <div className="flex h-screen items-center justify-center">
              <button className="btn btn-wide" onClick={refetch}>Réessayer</button>
          </div>
        ) 
        : (
          <div className="mt-[129px] mb-24 px-5">
            {allPosts?.map(post => (
              <PostCard key={post._id} post={post}/>
            ))}
          </div>
        )
      }
      <BottomNavBar/>
    </div>
  )
}

export default App
