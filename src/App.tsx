import {
    createBrowserRouter,
    LoaderFunctionArgs,
    Outlet,
    redirect,
    RouterProvider,
} from "react-router-dom";
import Loading from "./components/Loading";
import Navigation from "./components/Nav";
import { Suspense } from "react";
import { PostList } from "./pages/PostList";
import { PostView } from "./pages/PostView";
import { LanguageProvider } from "./providers/Language";

const setLanguageHandler = function (language: string) {
    LanguageProvider.setLanguage(language);
    return redirect("/")

}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <div className="container">
                    <Navigation />
                <Suspense fallback={<div className="text-center"><Loading /></div>}>
                    <Outlet />
                </Suspense>
                </div>
            </>
        ),
        children: [
            {
                index: true,
                Component: PostList,
            },
            {
                path: "/post/:urlorid",
                Component: PostView
            },
            {
                path: "/EN",
                loader: () => {
                    return setLanguageHandler("EN");
                }
            },
            {
                path: "/PT",
                loader: () => {
                    return setLanguageHandler("PT");
                }
            }
        ],
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} fallbackElement={<Loading />}/>
        </>
    );
}

export default App;
