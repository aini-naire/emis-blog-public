import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavResponse } from "../interfaces/Nav";
import { LanguageProvider } from "../providers/Language";
import { NavAPI } from "../providers/NavAPI";
import fetcher from "../helpers/SuspenseFetcher";

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
                {loading && <a>i18n.loading</a>}
                {error && <a>i18n.error</a>}
                {nav.map((navItem) => <Link to={navItem.url}>{navItem.text}</Link>)}
            </nav>
            <hr />
        </header>
    );
}

export default Navigation;
