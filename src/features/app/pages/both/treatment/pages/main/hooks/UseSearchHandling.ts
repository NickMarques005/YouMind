import { useState } from "react";



export const UseSearchHandling = () => {
    const [modalSearch, setModalSearch] = useState(false);
    const [treatmentMenu, setTreatmentMenu] = useState(false);

    const handleModalSearch = () => {
        setModalSearch(prev => !prev);
    }

    const handleModalTreatmentMenu = () => {
        setTreatmentMenu(prev => !prev);
    }

    return { modalSearch, handleModalSearch, treatmentMenu, handleModalTreatmentMenu}
}