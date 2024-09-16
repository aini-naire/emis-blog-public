import { useEffect, useState } from "react";
import fetcher from "../helpers/SuspenseFetcher";
import { PostsAPI } from "../providers/PostsAPI";
import { Link, useLocation, useParams } from "react-router-dom";
import { PostBase } from "../interfaces/Post";
import Markdown from "markdown-to-jsx";

function PostView() {
    const [post, setPosts] = useState<PostBase | null>(null);
    let location = useLocation();
    const { urlorid } = useParams();

    useEffect(() => {
        const getPosts = async () => {
            setPosts(fetcher(PostsAPI.get(urlorid)));
        };

        getPosts();
    }, []);

    return (
        <main>
            <h2>post {post?.title}</h2>
            <article>
                <Markdown>{post?.content}</Markdown>
            </article>
        </main>
    );
}

export { PostView }