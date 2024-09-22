import { useRouteError } from "react-router-dom";
import { i18n } from "../i18n";
import { LanguageProvider } from "../providers/Language";

function Error() {
    
  let error = useRouteError();
  const language = LanguageProvider.getLanguage();
    return (
      <div className="centered-message">
        <span>{error?.status === 404 ? i18n[language].post.not_found :i18n[language].error}</span>
      </div>
    )
  }
  
  export default Error
  