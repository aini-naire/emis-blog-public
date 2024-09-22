import { i18n } from "../i18n";
import { LanguageProvider } from "../providers/Language";

function Loading() {
    const language = LanguageProvider.getLanguage();
    return (
        <div className="centered-message">
            <span>{i18n[language].loading}</span>
        </div>
    )
}

export default Loading
