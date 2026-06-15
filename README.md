🎮 GameZone Premium
O GameZone Premium é uma aplicação web responsiva de e-commerce voltada para a venda de periféricos e equipamentos gamer. O projeto conta com uma interface moderna em modo escuro (dark mode), carrinho de compras dinâmico, histórico de pedidos local, formulário de contato integrado e um assistente virtual (chatbot) inteligente que combina respostas automatizadas locais com inteligência artificial via API.

🚀 Funcionalidades
Catálogo de Produtos: Exibição de periféricos gamers com imagens, descrições e preços atualizados.

Barra de Pesquisa Inteligente: Filtra os produtos em tempo real na tela conforme o usuário digita. Caso nenhum produto seja encontrado, um aviso visual é exibido.

Carrinho de Compras Interativo: Permite adicionar produtos, remover itens individualmente e calcula o valor total da compra automaticamente.

Checkout via WhatsApp: Coleta dados de envio (Nome, CEP, Endereço) e condições de pagamento, gerando um resumo formatado que é enviado diretamente para o WhatsApp da loja para a finalização do pedido.

Histórico de Pedidos: Armazena e exibe as compras finalizadas no próprio navegador utilizando localStorage, simulando uma área de cliente.

Formulário de Contato: Integração direta com o WhatsApp para envio de mensagens rápidas de suporte.

Chatbot Gamer Integrado: * Respostas Locais: Responde instantaneamente sobre produtos específicos (teclado, mouse, headset, cadeira), formas de pagamento, garantia e entrega.

Integração com IA: Caso a dúvida não seja local, ele faz uma requisição assíncrona para a API do OpenRouter (utilizando o modelo openai/gpt-oss-20b:free) para responder como um atendente gamer simpático da loja.

🛠️ Tecnologias Utilizadas
O projeto foi construído utilizando tecnologias web fundamentais (Vanilla Architecture), sem a necessidade de frameworks complexos:

HTML5: Estruturação semântica da página, modais e seções.

CSS3: Estilização moderna baseada em CSS Grid e Flexbox, design responsivo para dispositivos móveis e paleta de cores gamer (neon/dark code).

JavaScript (ES6+): Manipulação assíncrona do DOM, persistência de dados local, lógica do carrinho e consumo de API REST.

FontAwesome: Ícones interativos do carrinho, chat e redes sociais.

OpenRouter API: Engine de inteligência artificial para o assistente virtual.

📂 Estrutura do Projeto
Plaintext
gamezone.loja-main/
│
├── index.html       # Estrutura principal da página, modais e seções
├── style.css        # Estilização completa, layouts responsivos e animações
├── loja.js          # Lógica do carrinho, checkout, pesquisa e localStorage
└── chatbot.js       # Controle do chat, respostas rápidas e integração com IA
📦 Como Executar o Projeto
Como o projeto foi desenvolvido em JavaScript puro, não é necessário instalar dependências ou compiladores.

Baixe ou clone os arquivos do projeto para o seu computador.

Abra a pasta do projeto.

Dê um duplo clique no arquivo index.html para abri-lo diretamente no seu navegador de preferência.

(Opcional) Se preferir simular um ambiente de servidor, utilize a extensão Live Server no VS Code.
