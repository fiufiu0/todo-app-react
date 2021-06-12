import { Redirect } from "react-router-dom";
import * as React from "react";

function PublicPage(props) {
    if (props.isLogged) {
        return (
            <Redirect to={{ pathname: "/todo" }} />
        )
    }

    return (
        <>
            <h3>Zaloguj, aby zobaczyć!</h3>
            <button onClick={() => { props.setIsLogged(true) }}>LOGIN</button>
        </>
    )
}

export default PublicPage;
