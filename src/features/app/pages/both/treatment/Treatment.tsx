
import React, { useCallback, useState } from 'react'
import TreatmentStack from '@navigation/stacks/app/both/treatment/TreatmentStack'
import { UseRedirectRoute } from './hooks/UseRedirectRoute'


const Treatment = () => {

    const { initialRoute } = UseRedirectRoute();

    return (
        <>
            {
                initialRoute &&
                <TreatmentStack initialRoute={initialRoute} />
            }
        </>
    )
}

export default Treatment;