export const LanguageProvider = {
    getLanguage: function() {
        const language = localStorage.getItem("language");
        return language ? language : "EN";
    },
    setLanguage: function(language) {
        localStorage.setItem("language", language)
    }
}