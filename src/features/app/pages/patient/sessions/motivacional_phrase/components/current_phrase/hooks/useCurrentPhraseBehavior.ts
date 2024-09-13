

export const useCurrentPhraseBehavior = () => {
    
    const formatUserGreetings = (userName: string): string => {
        const currentHour = new Date().getHours();
        const firstName = userName.split(' ')[0];

        let greeting = '';

        if (currentHour < 12) {
            greeting = `Bom dia, ${firstName}`;
        } else if (currentHour < 18) {
            greeting = `Boa tarde, ${firstName}`;
        } else {
            greeting = `Boa noite, ${firstName}`;
        }

        return greeting;
    }

    return { formatUserGreetings };
}