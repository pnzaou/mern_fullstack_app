import { useEffect } from "react"
import { debounce } from "lodash"
import BottomNavBar from "./components/Bottom-nav-bar"
import Navbar from "./components/Navbar"
import PostCard from "./components/Post-card"
import { postStore } from "./stores/postStore"
import {authStore} from "./stores/authStore"
import PostSkeleton from "./components/skeletons/Post-skeleton"

function App() {
  const {token} = authStore()
  const {allPosts, getAllPosts, isPostsLoading, isError, isMorePostsLoading, getMorePosts} = postStore()


  useEffect(() => {
    getAllPosts(token, allPosts.length)
  }, [getAllPosts, token])

  useEffect(() => {
    const handleScroll = debounce(() => {
      const currentScrollPosition = window.scrollY
      const windowHeight = document.documentElement.clientHeight
      const pagelTotalHeight = document.documentElement.scrollHeight

      if(!isPostsLoading && currentScrollPosition + windowHeight >= pagelTotalHeight - 10) {
         getMorePosts(token, allPosts.length)
      }
    }, 200)

    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [isPostsLoading, getMorePosts, token, allPosts])

  const refetch = () => getAllPosts(token, 0)

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
            {isMorePostsLoading && (
              <div className="mt-10 flex justify-center">
                <div>
                  <span className="loading loading-dots loading-lg"></span>
                </div>
              </div>
            )}
          </div>
        )
      }
      <BottomNavBar/>
    </div>
  )
}

export default App
