import { FormattedAnswer } from "types/app/patient/health/Question_Types";

export const calculateCurrentQuestionnairePerformance = (answers: FormattedAnswer[], userType?: string) => {
    const performanceValues = {
        precisa_melhorar: 1,
        ruim: 2,
        bom: 3,
        ótimo: 4,
        excelente: 5
    };

    let totalValue = 0;
    let answerCount = 0;

    answers.forEach(answer => {
        if (answer.type) {
            totalValue += performanceValues[answer.type];
            answerCount += 1;
        }

        if (answer.subAnswers && answer.subAnswers.length > 0) {
            answer.subAnswers.forEach(subAnswer => {
                if (subAnswer.type) {
                    totalValue += performanceValues[subAnswer.type];
                    answerCount += 1;
                }
            });
        }
    });

    const averageValue = totalValue / answerCount;

    let performance: string;
    let motivationMessage: string;

    if (averageValue <= 1.5) {
        performance = "precisa melhorar";
        motivationMessage = userType === 'doctor' ?
            "O paciente precisa de mais atenção e suporte. Vamos trabalhar juntos para melhorar esses resultados." :
            "Não desanime! Cada passo é importante. Continue buscando o seu melhor.";
    } else if (averageValue <= 2.5) {
        performance = "nada mal";
        motivationMessage = userType === 'doctor' ?
            "Há espaço para melhorias, mas o paciente está no caminho certo. Continue monitorando e incentivando." :
            "Você está no caminho. Não se preocupe com os contratempos, continue firme!";
    } else if (averageValue <= 3.5) {
        performance = "bom";
        motivationMessage = userType === 'doctor' ?
            "O desempenho do paciente é bom. Continue com o bom trabalho e incentive-os a alcançar ainda mais." :
            "Bom trabalho! Continue se esforçando, você está indo bem.";
    } else if (averageValue <= 4.5) {
        performance = "ótimo";
        motivationMessage = userType === 'doctor' ?
            "Ótimo desempenho! O paciente está respondendo bem ao tratamento. Continue com as boas práticas." :
            "Ótimo! Seu esforço está valendo a pena. Continue assim!";
    } else {
        performance = "excelente";
        motivationMessage = userType === 'doctor' ?
            "Excelente desempenho! O paciente está excelentemente bem. Parabéns pelo trabalho árduo e dedicação." :
            "Excelente! Seu desempenho é fantástico. Continue com esse ótimo trabalho!";
    }
    return { performance, motivationMessage };
};

export const calculateQuestionnairePerformanceForDoctor = (answers: FormattedAnswer[]) => {
    const performanceValues = {
        precisa_melhorar: 1,
        ruim: 2,
        bom: 3,
        ótimo: 4,
        excelente: 5
    };

    let totalValue = 0;
    let answerCount = 0;

    answers.forEach(answer => {
        if (answer.type) {
            totalValue += performanceValues[answer.type];
            answerCount += 1;
        }

        if (answer.subAnswers && answer.subAnswers.length > 0) {
            answer.subAnswers.forEach(subAnswer => {
                if (subAnswer.type) {
                    totalValue += performanceValues[subAnswer.type];
                    answerCount += 1;
                }
            });
        }
    });

    const averageValue = totalValue / answerCount;
    const performance = Math.round((averageValue / 5) * 100);

    let result: string;

    if (averageValue <= 1.5) {
        result = "O desempenho precisa melhorar.";
    } else if (averageValue <= 2.5) {
        result = "O desempenho está abaixo da média.";
    } else if (averageValue <= 3.5) {
        result = "O desempenho está na média.";
    } else if (averageValue <= 4.5) {
        result = "O desempenho está acima da média.";
    } else {
        result = "O desempenho está excelente.";
    }

    return { performance, result };
};