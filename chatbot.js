const API_KEY = "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";

function toggleChat() {

    const chat = document.getElementById("chatContainer");

    chat.style.display =
        chat.style.display === "flex"
        ? "none"
        : "flex";
}

function getTime() {

    const now = new Date();

    return now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function addMessage(text, sender) {

    const messages =
        document.getElementById("chatMessages");

    const div =
        document.createElement("div");

    div.classList.add("message");
    div.classList.add(sender);

    div.innerHTML = `
        ${text}
        <div class="time">${getTime()}</div>
    `;

    messages.appendChild(div);

    messages.scrollTop =
        messages.scrollHeight;
}

async function sendMessage() {

    const input =
        document.getElementById("userInput");

    const question =
        input.value.trim();

    if (!question) return;

    addMessage(question, "user");

    input.value = "";

    const pergunta =
        question.toLowerCase();

    // ===== RESPOSTAS LOCAIS =====

    if (
        pergunta.includes("teclado") ||
        pergunta.includes("preço do teclado")
    ) {
        addMessage(
            "⌨️ O Teclado Mecânico RGB custa R$299,90.",
            "bot"
        );
        return;
    }

    if (
        pergunta.includes("mouse")
    ) {
        addMessage(
            "🖱️ O Mouse Gamer RGB custa R$149,90.",
            "bot"
        );
        return;
    }

    if (
        pergunta.includes("headset")
    ) {
        addMessage(
            "🎧 O Headset Gamer Pro custa R$199,90.",
            "bot"
        );
        return;
    }

    if (
        pergunta.includes("cadeira")
    ) {
        addMessage(
            "🪑 A Cadeira Gamer Elite custa R$999,90.",
            "bot"
        );
        return;
    }

    if (
        pergunta.includes("entrega")
    ) {
        addMessage(
            "🚚 Entregamos para todo o Brasil.",
            "bot"
        );
        return;
    }

    if (
        pergunta.includes("pagamento") ||
        pergunta.includes("pix") ||
        pergunta.includes("cartão") ||
        pergunta.includes("boleto")
    ) {
        addMessage(
            "💳 Aceitamos PIX, cartão de crédito e boleto.",
            "bot"
        );
        if (pergunta.includes("garantia")) {
    addMessage(
        "🛡️ Todos os produtos possuem garantia de 12 meses contra defeitos de fabricação.",
        "bot"
    );
    if (
    pergunta.includes("contato") ||
    pergunta.includes("telefone") ||
    pergunta.includes("whatsapp")
) {
    addMessage(
        "📞 Contato: (86) 99999-9999 | WhatsApp: (86) 99999-9999",
        "bot"
    );
    return;
}
    return;
}
        return;
    }

    // ===== IA =====

    const messages =
        document.getElementById("chatMessages");

    const typing =
        document.createElement("div");

    typing.classList.add("typing");
    typing.id = "typing";

    typing.innerText =
        "Assistente está digitando...";

    messages.appendChild(typing);

    messages.scrollTop =
        messages.scrollHeight;

    try {

        const response =
            await fetch(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        "Authorization":
                            `Bearer ${API_KEY}`,
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({

                        model:
                        "openai/gpt-oss-20b:free",

                        messages: [

                            {
                                role: "system",
                                content:
                                "Você é um atendente gamer simpático da GameZone Store. Responda de forma curta e educada."
                            },

                            {
                                role: "user",
                                content: question
                            }

                        ]

                    })
                }
            );

        const data =
            await response.json();

        console.log("STATUS:", response.status);
        console.log("DATA:", data);

        document
            .getElementById("typing")
            ?.remove();

        if (!response.ok) {

            throw new Error(
                data?.error?.message ||
                `Erro HTTP ${response.status}`
            );
        }

        const answer =
            data?.choices?.[0]?.message?.content ||
            "Desculpe, não consegui responder.";

        addMessage(answer, "bot");

    } catch (error) {

    document
        .getElementById("typing")
        ?.remove();

    console.error(error);

    addMessage(
        "Olá! Sou o assistente da GameZone. Posso ajudar com produtos, preços, entregas e formas de pagamento.",
        "bot"
    );
}
}

window.addEventListener(
    "DOMContentLoaded",
    () => {

        const input =
            document.getElementById("userInput");

        if (input) {

            input.addEventListener(
                "keydown",
                e => {

                    if (e.key === "Enter") {

                        e.preventDefault();

                        sendMessage();
                    }

                }
            );

        }

    }
);