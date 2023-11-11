import { useRouteError } from "react-router-dom";

export default function ErrorPage(){
    let error = useRouteError();
    return <>
    <main>
        <h1>An error occured !</h1>
        <p>{error.data.message}</p>
    </main>
    </>
}