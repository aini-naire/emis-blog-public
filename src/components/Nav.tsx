import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavResponse } from "../interfaces/Nav";
import { LanguageProvider } from "../providers/Language";
import { NavAPI } from "../providers/NavAPI";
import fetcher from "../helpers/SuspenseFetcher";

function Navigation() {
  const [nav, setNav] = useState<NavResponse>([]);
  const language = LanguageProvider.getLanguage();
  const location = useLocation();

    useEffect(() => {
        const getPosts = async () => {
            setNav(fetcher(NavAPI.get(language)));
        };

        getPosts();
    }, [language]);

    return (
      <header>
        <Link to="/"><h1>emi's blog</h1></Link>
        <nav>
        {nav.map((navItem) => <Link to={navItem.url}>{navItem.text}</Link>)}
          <a>example link</a>
        </nav>
        <hr/>
      </header>
    );
}

export default Navigation;
