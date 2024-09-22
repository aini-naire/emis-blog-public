import { useEffect, useState } from "react";
import fetcher from "../helpers/SuspenseFetcher";
import { PostsAPI } from "../providers/PostsAPI";
import { Link, useLocation, useParams } from "react-router-dom";
import { PostBase } from "../interfaces/Post";
import Markdown from "markdown-to-jsx";
import Loading from "../components/Loading";

function PostView() {
    const [post, setPost] = useState<PostBase | null>(null);
    let location = useLocation();
    const { urlorid } = useParams();

    useEffect(() => {
        const getPost = async () => {
            setPost(fetcher(PostsAPI.get(urlorid)));
        };

        setPost(null);
        getPost();
    }, [location]);

    if (post) {
        return (
            <main>
                <h2 className={post.page ? "page-title" : "post-title"}>{!post?.page && "post"} {post?.title}</h2>
                {!post.page && <div className="post-info">i18n.post.created {new Date(post.created).toLocaleDateString()}</div>}
                <article>
                    <Markdown>{post?.content}</Markdown>
                </article>
            </main>
        );
    }
    return <Loading />
}

export { PostView }