import { useEffect, useState } from "react";
import fetcher from "../helpers/SuspenseFetcher";
import { PostsAPI } from "../providers/PostsAPI";
import { Link, useLocation } from "react-router-dom";
import { PostListResponse } from "../interfaces/Post";
import { LanguageProvider } from "../providers/Language";
import { i18n } from "../i18n";

function PostList() {
    const language = LanguageProvider.getLanguage()
    const [posts, setPosts] = useState<PostListResponse | null>(null);
    let location = useLocation();

    useEffect(() => {
        const getPosts = async () => {
            setPosts(fetcher(PostsAPI.list(language)));
        };

        getPosts();
    }, [location]);

    return (
        <main>
            <h2>{i18n[language].list.posts}</h2>
            {posts?.posts.map(function (post, i) {
                return (
                <Link className="summary" to={"/post/" + post.url}>
                    <h3>{post.title}</h3>
                    <p>{post.tagline}</p>
                    <p>posted by {post.author.fullName}</p>
                    <hr/>
                </Link>);
            })}
        </main>);
}

export { PostList }