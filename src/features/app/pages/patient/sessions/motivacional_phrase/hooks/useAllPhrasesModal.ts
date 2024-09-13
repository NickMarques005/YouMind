import { useState } from "react"


export const useAllPhrasesModal = () => {

    const [isAllPhrasesModalVisible, setIsAllPhrasesModalVisible] = useState(false);

    const handleAllPhrasesModal = () => {
        setIsAllPhrasesModalVisible(value => !value);
    }

    return { isAllPhrasesModalVisible, handleAllPhrasesModal }
}