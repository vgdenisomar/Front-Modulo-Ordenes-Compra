import React from "react";
import { useParams } from "react-router-dom";

function UserDetail() {
    const { id } = useParams();
    return (
        <div>
            <h2>Detalle {id}</h2>
            
        </div>
    )
}

export default UserDetail;