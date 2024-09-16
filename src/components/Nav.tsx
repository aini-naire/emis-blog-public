import { Link } from "react-router-dom";

function Navigation() {
    return (
      <header>
        <Link to="/"><h1>emi's blog</h1></Link>
        <nav>
        <Link to="/PT">pt link</Link>
        <Link to="/EN">en link</Link>
          <a>example link</a>
        </nav>
        <hr/>
      </header>
    );
}

export default Navigation;
