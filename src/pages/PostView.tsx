import { useEffect, useState } from "react";
import fetcher from "../helpers/SuspenseFetcher";
import { PostsAPI } from "../providers/PostsAPI";
import { Link, useLocation, useParams } from "react-router-dom";
import { PostBase } from "../interfaces/Post";
import Markdown from "markdown-to-jsx";
import Loading from "../components/Loading";
import { LanguageProvider } from "../providers/Language";
import { i18n } from "../i18n";

function PostView() {
    const language = LanguageProvider.getLanguage();
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
                <h2 className={post.page ? "page-title" : "post-title"}>{post?.title}</h2>
                {!post.page && <div className="post-info">{i18n[language].post.created} {new Date(post.created).toLocaleDateString()} {i18n[language].list.by} {post.author.fullName}</div>}
                <article>
                    <Markdown>{post?.content}</Markdown>
                </article>
                {(post.tags.length > 0) && <i className="post-tags">tags: {post.tags.map((tag) => {
                    return (<Link key={tag.url} to={"/tag/" + tag.url}><span>#{tag.title}</span></Link>)
                })}
                </i>}
            </main>
        );
    }
    return <Loading />
}

export { PostView }