import PropTypes from "prop-types";
import {timeAgo} from "../utils/"
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import PostImages from "./Post-images";
import { Link } from "react-router-dom";

const PostCard = ({post}) => {

    return (
        <div className="mt-10">
            <div className="flex items-center">
                <div className="w-1/6 avatar">
                    <div className="w-11 rounded-full">
                        <img src={post.author.profilPicture || "images/avatar.png"} />
                    </div>
                </div>
                <div className="w-1/2 text-sm">
                    <div>{post.author.userName}</div>
                    <div className="text-zinc-500">@{post.author.pseudo}</div>
                </div>
                <div className="relative w-1/4 text-sm">
                    <div className="absolute -top-4 right-0 text-zinc-500">
                        {timeAgo(post.createdAt)}
                    </div>
                </div>
            </div>
            <div className="mt-4 break-words">
                <h1 className="text-xl font-bold">{post.titre}</h1>
            </div>
            <PostImages images={post.images}/>
            <div className="mt-2 break-words text-justify">
            {post.contenu.length > 200 ? (
                <>
                    {`${post.contenu.substring(0, 200)}...`}
                    <Link className="link text-primary" to={`/post/${post._id}`}> Voir plus</Link>
                </>
            ) : (
                post.contenu
            )}
            </div>
            <div className="flex gap-4 mt-4">
                <div className="flex gap-1">
                    <Heart/> {post.likes}
                </div>
                <div className="flex gap-1">
                    <MessageCircle/> {post.comments}
                </div>
                <div className="flex gap-1">
                    <Bookmark/> {post.favs}
                </div>
            </div>
        </div>
    );
}

PostCard.propTypes = {
    post: PropTypes.shape({
        author: PropTypes.shape({
            profilPicture: PropTypes.string,
            userName: PropTypes.string,
            pseudo: PropTypes.string,
        }),
        _id: PropTypes.string,
        titre: PropTypes.string,
        contenu: PropTypes.string,
        images: PropTypes.array,
        likes: PropTypes.number,
        comments: PropTypes.number,
        favs: PropTypes.number,
        createdAt: PropTypes.string,
    })
}

export default PostCard;
