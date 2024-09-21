import { useEffect, useState } from "react";
import fetcher from "../helpers/SuspenseFetcher";
import { PostsAPI } from "../providers/PostsAPI";
import { Link, useLocation, useParams } from "react-router-dom";
import { PostBase } from "../interfaces/Post";
import Markdown from "markdown-to-jsx";

function PostView() {
    const [post, setPost] = useState<PostBase | null>(null);
    let location = useLocation();
    const { urlorid } = useParams();

    useEffect(() => {
        const getPost = async () => {
            setPost(fetcher(PostsAPI.get(urlorid)));
        };

        getPost();
    }, []);

    return (
        <main>
            <h2>{!post?.page && "post"} {post?.title}</h2>
            <article>
                <Markdown>{post?.content}</Markdown>
            </article>
        </main>
    );
}

export { PostView }