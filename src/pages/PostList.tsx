import { useEffect, useState } from "react";
import fetcher from "../helpers/SuspenseFetcher";
import { PostsAPI } from "../providers/PostsAPI";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { PostListResponse, Tag } from "../interfaces/Post";
import { LanguageProvider } from "../providers/Language";
import { i18n } from "../i18n";
import { TagsAPI } from "../providers/TagsAPI";

function PostList() {
    const lang = LanguageProvider.getLanguage();
    const [posts, setPosts] = useState<PostListResponse | null>(null);
    const [tag, setTag] = useState<Tag | null>(null);
    const [language, setLanguage] = useState<string>(lang);
    let [params, setParams] = useSearchParams({ page: 1 });
    const location = useLocation();
    const { tagURL } = useParams();
    const page: number = params.get("page") ? Number(params.get("page")) : 1;

    if (page > posts?.pages) setParams({ page: posts?.pages })

    useEffect(() => {
        const getPosts = async () => {
            setPosts(fetcher(tagURL ? PostsAPI.listByTag(tagURL, page) : PostsAPI.list(lang, page)));
        };
        const getTag = async () => {
            setTag(fetcher(TagsAPI.get(tagURL)));
        };
        
        // page guardrails
        if (Number.isNaN(page) || page < 1) {
            setParams({ page: 1 })
            return;
        }

        // tag getter/reset
        if (tagURL) {
            getTag();
        } else {
            setTag(null);
        }

        setLanguage(lang);
        getPosts();
    }, [location]);

    const handleNext = () => {
        setParams({ page: page + 1 });
    }

    const handlePrevious = () => {
        setParams({ page: page - 1 });
    }

    if (posts !== null) {
        return (
            <main>
                <h2 className="page-title">{tag ? i18n[language].list.tag : i18n[language].list.posts} {tag && <i>{tag.title}</i>}</h2>
                {(posts.posts.length === 0) && <p className="centered-message">{i18n[language].list.empty}</p>}
                {posts?.posts.map(function (post, i) {
                    return (
                        <Link key={post.url} className="summary" to={"/post/" + post.url}>
                            <h3>{post.title}</h3>
                            <p>{post.tagline}</p>
                            {post.showAuthor && <p>{i18n[language].list.by} {post.author.fullName}</p>}
                            {(post.tags.length > 0) && <p>tags: {post.tags.map((tag) => {
                                return (<Link key={tag.url} to={"/tag/" + tag.url}><span>#{tag.title}</span></Link>)
                            })}
                            </p>}
                            <hr />
                        </Link>);
                })}

                <div className="pagination">
                    {page !== 1 && <span onClick={handlePrevious}> {i18n[language].list.previous} </span>}
                    <span className="pages"> {i18n[language].list.page} {posts?.page} {i18n[language].list.of} {posts?.pages} </span>
                    {(page !== posts?.pages) && <span onClick={handleNext}> {i18n[language].list.next} </span>}
                </div>

            </main>);
    }
}

export { PostList }
