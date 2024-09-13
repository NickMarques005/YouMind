import { useSearch } from "@features/app/providers/sub/SearchProvider";
import { useState } from "react";



export const UseSearchHandling = () => {
    const { modalSearch, handleModalSearch } = useSearch();
    const [treatmentMenu, setTreatmentMenu] = useState(false);

    const handleModalTreatmentMenu = () => {
        setTreatmentMenu(prev => !prev);
    }

    return { modalSearch, handleModalSearch, treatmentMenu, handleModalTreatmentMenu}
}