import { useRouteError } from "react-router-dom";

function Error() {
    
  let error = useRouteError();
    return (
      <div className="centered-message">
        <span>{error?.status === 404 ? "i18n.post.not_found" :"l18n.error"}</span>
      </div>
    )
  }
  
  export default Error
  