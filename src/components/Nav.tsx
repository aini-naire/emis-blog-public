import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavResponse } from "../interfaces/Nav";
import { LanguageProvider } from "../providers/Language";
import { NavAPI } from "../providers/NavAPI";
import fetcher from "../helpers/SuspenseFetcher";
import { i18n } from "../i18n";

function Navigation() {
    const [nav, setNav] = useState<NavResponse>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const language = LanguageProvider.getLanguage();
    const location = useLocation();

    useEffect(() => {
        const getNav = async () => {
            NavAPI.get(language).then((response) => {
                setLoading(false)
                setNav(response.data)
            }).catch(() => {
                setError(true)
                setLoading(false)
            });
        };

        //setLoading(true)
        getNav();
    }, [language]);

    return (
        <header>
            <div className="languages">
                <Link to="/EN">en</Link>
                <Link to="/PT">pt</Link>
            </div>
            <Link to="/"><h1>emi's blog</h1></Link>
            <nav>
                {loading && <a>{i18n[language].loading}</a>}
                {error && <a>{i18n[language].error}</a>}
                {nav.map((navItem) => !navItem.external ? <Link to={navItem.url} key={navItem.url}>{navItem.text}</Link> : <a href={navItem.url} target="_blank" key={navItem.url}>{navItem.text}</a>)}
            </nav>
            <hr />
        </header>
    );
}

export default Navigation;
