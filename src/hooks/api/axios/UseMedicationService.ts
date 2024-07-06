import axios from 'axios';
import { SetLoading } from 'types/loading/Loading_Types';

const useFetchMedication = (setLoading: SetLoading) => {

    const fetchMedicationData = async (query: string) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.fda.gov/drug/drugsfda.json`, {
                params: {
                    search: `products.brand_name:${query}*`,
                    limit: 35
                }
            });
            const medicationNames = new Set();
            response.data.results.forEach((item: any) => {
                item.products.forEach((product: any) => {
                    medicationNames.add(product.brand_name);
                });
            });
            return { success: true, data: Array.from(medicationNames) };
        } catch (err) {
            return { success: false, error: err };
        } finally {
            setLoading(false);
        }
    };

    return { fetchMedicationData }
};

export default useFetchMedication;