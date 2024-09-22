import { useEffect, useState } from "react";
import fetcher from "../helpers/SuspenseFetcher";
import { PostsAPI } from "../providers/PostsAPI";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { PostListResponse } from "../interfaces/Post";
import { LanguageProvider } from "../providers/Language";
import { i18n } from "../i18n";

function PostList() {
    const language = LanguageProvider.getLanguage()
    const [posts, setPosts] = useState<PostListResponse | null>(null);
    let [params, setParams] = useSearchParams({ page: 1 });
    let location = useLocation();
    const { tagURL } = useParams();
    const page: number = params.get("page") ? Number(params.get("page")) : 1;

    if (page > posts?.pages) setParams({ page: posts?.pages })

    useEffect(() => {
        const getPosts = async () => {
            setPosts(fetcher(tagURL ? PostsAPI.listByTag(tagURL, page) : PostsAPI.list(language, page)));
        };
        if (Number.isNaN(page)) {
            setParams({ page: 1 })
            return;
        }
        getPosts();
    }, [location]);

    const handleNext = () => {
        setParams({ page: page + 1 });
    }

    const handlePrevious = () => {
        setParams({ page: page - 1 });
    }

    return (
        <main>
            <h2>{tagURL ? i18n[language].list.tag : i18n[language].list.posts} {tagURL && <i>{tagURL}</i>}</h2>
            {posts?.posts.map(function (post, i) {
                return (
                    <Link key={post.id} className="summary" to={"/post/" + post.url}>
                        <h3>{post.title}</h3>
                        <p>{post.tagline}</p>
                        <p>{i18n[language].list.by} {post.author.fullName}</p>
                        <hr />
                    </Link>);
            })}
            <div className="pagination">
                {page !== 1 && <span onClick={handlePrevious}> {i18n[language].list.previous} </span>}
                <span className="pages"> {i18n[language].list.page} {posts?.page} {i18n[language].list.of} {posts?.pages} </span>
                {(page !== posts?.pages) && <span onClick={handleNext}> {i18n[language].list.next} </span>}</div>

        </main>);
}

export { PostList }