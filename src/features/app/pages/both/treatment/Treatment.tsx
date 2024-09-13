
import React, { useCallback, useState } from 'react'
import TreatmentStack from '@navigation/stacks/app/both/treatment/TreatmentStack'
import { UseRedirectTreatmentRoute } from './hooks/UseRedirectTreatmentRoute'

const Treatment = () => {
    const { initialRoute } = UseRedirectTreatmentRoute();

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