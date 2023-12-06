import React from 'react';
import WithLoader from '../../hoc/withLoader';
import TreatmentHandle from './TreatmentHandle';
import { UseAuth } from '../../../contexts/AuthContext';
import { UseTreatment } from '../../../contexts/TreatmentContext';
import { Treatment } from '../../../contexts/TreatmentContext';

interface TreatmentListProps {
    handleTreatmentClick: (treatment: Treatment) => void
}

function TreatmentList({handleTreatmentClick}: TreatmentListProps) {
    const { authData } = UseAuth();
    const { treatment_state } = UseTreatment();

    const treatmentRequest = {
        url: "getTreatment",
        method: 'POST',
        data: {
            type: authData.type
        },
    }

    const TreatmentLoader = WithLoader(TreatmentHandle, treatmentRequest, 'mini_loading', {handleTreatmentClick: handleTreatmentClick}) ;

    return (
        <>
            {
                treatment_state.treatments.length == 0 ?
                <TreatmentLoader />
                : 
                <TreatmentHandle data={treatment_state.treatments} additional_data={handleTreatmentClick}/>
            }
        </>
    )
}

export default TreatmentList;