import { useState } from "react";



export const UseSearchHandling = () => {
    const [modalSearch, setModalSearch] = useState(false);

    const handleModalSearch = () => {
        setModalSearch(prev => !prev);
    }

    return { modalSearch, handleModalSearch}
}