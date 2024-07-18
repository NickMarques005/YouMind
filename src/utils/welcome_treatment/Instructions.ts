import { WelcomeInstruction } from "types/welcome/Welcome_Types";

export const instructionsData: Record<'Tratamento' | 'Paciente' | 'Doutor', WelcomeInstruction[]> = {
    Tratamento: [
    ],
    Paciente: [
        {
            title: 'Página Inicial',
            content: 'Explore a página inicial para visualizar informações gerais sobre o seu tratamento e desempenho.',
            image: undefined
        },
        {
            title: 'Iniciar Tratamento',
            content: 'Acesse a seção de tratamento para pesquisar médicos e enviar solicitações para iniciar o tratamento.',
            image: undefined
        },
        {
            title: 'Perfil',
            content: 'Confira e atualize suas informações pessoais e ajuste as configurações do aplicativo.',
            image: undefined
        },
        {
            title: 'Saúde - Medicamentos: Visualização',
            content: 'Veja os medicamentos que foram tomados e os que ainda precisam ser tomados. Escolha o dia para visualizar a programação de medicação.',
            image: undefined
        },
        {
            title: 'Saúde - Medicamentos: Gerenciamento',
            content: 'Visualize e gerencie suas medicações diárias, incluindo agendamentos, atualizações e exclusões.',
            image: undefined
        },
        {
            title: 'Questionários',
            content: 'Responda aos questionários diários dentro do prazo para acompanhar seu progresso e estado de saúde.',
            image: undefined
        },
        {
            title: 'Chamada de Emergência',
            content: 'Use a opção de chamada para entrar em contato com o CVV para suporte emocional quando necessário.',
            image: undefined
        },
        {
            title: 'Conectar ao Dispositivo',
            content: 'Conecte-se ao dispositivo T-Watch 2020 v3 para obter suporte adicional e acompanhamento do tratamento.',
            image: undefined
        }
    ],
    Doutor: [
        { title: '', content: "Passo 1", image: undefined },
        { title: '', content: "Passo 2", image: undefined },
        { title: '', content: "Passo 3", image: undefined },
        { title: '', content: "Passo 4", image: undefined },
        { title: '', content: "Passo 5", image: undefined },
    ],
};