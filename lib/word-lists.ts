export type Locale = 'pt' | 'en';

export const wordLists = {
  pt: {
    common: [
      'que', 'de', 'nao', 'para', 'com', 'uma', 'por', 'mais', 'como', 'mas',
      'foi', 'ele', 'ser', 'tem', 'seu', 'sua', 'isso', 'quando', 'muito', 'nos',
      'ja', 'eu', 'tambem', 'so', 'pelo', 'pela', 'ate', 'isso', 'ela', 'entre',
      'era', 'depois', 'sem', 'mesmo', 'aos', 'ter', 'seus', 'quem', 'nas', 'me',
      'esse', 'eles', 'voce', 'essa', 'num', 'nem', 'suas', 'meu', 'minha', 'numa',
      'pelos', 'elas', 'havia', 'seja', 'qual', 'sera', 'nos', 'tenho', 'lhe', 'deles',
      'essas', 'esses', 'pelas', 'este', 'fosse', 'dele', 'tu', 'te', 'voces', 'vos',
      'lhes', 'meus', 'minhas', 'teu', 'tua', 'teus', 'tuas', 'nosso', 'nossa', 'nossos',
      'tempo', 'vida', 'casa', 'mundo', 'dia', 'ano', 'vez', 'coisa', 'lugar', 'homem',
      'modo', 'parte', 'ponto', 'caso', 'olhos', 'momento', 'forma', 'grupo', 'trabalho', 'lado',
      'grande', 'novo', 'bom', 'primeiro', 'ultimo', 'longo', 'certo', 'outro', 'velho', 'proprio'
    ],
    
    medium: [
      'desenvolvimento', 'importante', 'organizacao', 'governo', 'informacao',
      'diferente', 'experiencia', 'seguinte', 'comunidade', 'disponivel',
      'negocio', 'tecnologia', 'ambiente', 'gestao', 'desempenho',
      'internacional', 'financeiro', 'universidade', 'adicional', 'profissional',
      'economico', 'politico', 'pesquisa', 'junto', 'educacao',
      'algo', 'tudo', 'entender', 'individual', 'particular',
      'aplicacao', 'producao', 'relacionamento', 'oportunidade', 'comunicacao',
      'significativo', 'tradicional', 'infraestrutura', 'caracteristicas', 'administracao',
      'responsabilidade', 'abrangente', 'implementacao', 'consideracao', 'representante',
      'especialmente', 'bem-sucedido', 'necessario', 'conforme', 'continuar',
      'demonstrar', 'perspectiva', 'competitivo', 'alternativa', 'fundamental',
      'conhecimento', 'funcionamento', 'estabelecimento', 'procedimento', 'acontecimento'
    ],
    
    programming: [
      'funcao', 'variavel', 'const', 'let', 'retornar', 'importar', 'exportar',
      'padrao', 'classe', 'interface', 'tipo', 'async', 'await', 'promessa',
      'objeto', 'vetor', 'string', 'numero', 'booleano', 'nulo', 'indefinido',
      'console', 'componente', 'props', 'estado', 'efeito', 'callback', 'manipulador',
      'renderizar', 'elemento', 'modulo', 'pacote', 'dependencia', 'typescript',
      'javascript', 'react', 'nextjs', 'nodejs', 'express', 'banco de dados',
      'consulta', 'mutacao', 'esquema', 'modelo', 'controlador', 'servico',
      'repositorio', 'middleware', 'autenticacao', 'autorizacao', 'validacao',
      'endpoint', 'requisicao', 'resposta', 'cabecalho', 'payload', 'parametro',
      'algoritmo', 'iteracao', 'recursao', 'condicao', 'excecao', 'depuracao'
    ],
    
    quotes: [
      "A unica forma de fazer um otimo trabalho e amar o que voce faz",
      "Inovacao distingue um lider de um seguidor",
      "Mantenha-se faminto mantenha-se tolo",
      "O futuro pertence aqueles que acreditam na beleza de seus sonhos",
      "Nao importa o quao devagar voce va desde que voce nao pare",
      "O sucesso nao e final o fracasso nao e fatal e a coragem de continuar que conta",
      "A unica jornada impossivel e aquela que voce nunca comeca",
      "Acredite que voce pode e voce ja esta no meio do caminho",
      "A melhor hora para plantar uma arvore foi ha vinte anos a segunda melhor e agora",
      "Seu tempo e limitado nao o desperdice vivendo a vida de outra pessoa",
      "A maior gloria em viver nao esta em nunca cair mas em levantar toda vez que caimos",
      "A vida e o que acontece quando voce esta ocupado fazendo outros planos",
      "No meio da dificuldade encontra-se a oportunidade",
      "O proposito de nossas vidas e ser feliz",
      "Voce so vive uma vez mas se fizer direito uma vez e suficiente"
    ],
    
    numbers: [
      '1234567890', '0987654321', '1111222233', '4444555566', '7777888899',
      '123 456 789', '987 654 321', '111 222 333', '444 555 666', '777 888 999',
      '12,34', '56,78', '90,12', '34,56', '78,90',
      '100%', '50%', '25%', '75%', '33%',
      'R$100', 'R$250', 'R$500', 'R$1000', 'R$9999',
      '2024', '2025', '2026', '1990', '2000'
    ],
    
    punctuation: [
      "Ola, mundo!", "Tudo bem?", "E um dia lindo.",
      "Sim; nao; talvez.", "Primeiro: segundo: terceiro.", "Um - dois - tres.",
      "Ele disse, 'Ola!'", '"Bom dia," ela respondeu.',
      "As cores sao: vermelho, azul e verde.",
      "Espera... o que?", "Serio?!", "Uau!!",
      "email@exemplo.com", "www.exemplo.com", "caminho/para/arquivo",
      "(parenteses)", "[colchetes]", "{chaves}",
      "50% de desconto!", "R$99,99", "100+ itens"
    ]
  },
  
  en: {
    common: [
      'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
      'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
      'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
      'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
      'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
      'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
      'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
      'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
      'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
      'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
      'great', 'made', 'may', 'part', 'still', 'should', 'place', 'while', 'much',
      'through', 'such', 'those', 'life', 'high', 'right', 'same', 'each', 'where', 'between',
      'own', 'under', 'last', 'never', 'every', 'another', 'world', 'found', 'came', 'being'
    ],
    
    medium: [
      'development', 'important', 'organization', 'government', 'information',
      'different', 'experience', 'following', 'community', 'available',
      'business', 'technology', 'environment', 'management', 'performance',
      'international', 'financial', 'university', 'additional', 'professional',
      'economic', 'political', 'research', 'together', 'education',
      'something', 'everything', 'understand', 'individual', 'particular',
      'application', 'production', 'relationship', 'opportunity', 'communication',
      'significant', 'traditional', 'infrastructure', 'characteristics', 'administration',
      'responsibility', 'comprehensive', 'implementation', 'consideration', 'representative',
      'especially', 'successful', 'necessary', 'according', 'continue',
      'demonstrate', 'perspective', 'competitive', 'alternative', 'fundamental'
    ],
    
    programming: [
      'function', 'variable', 'const', 'let', 'return', 'import', 'export',
      'default', 'class', 'interface', 'type', 'async', 'await', 'promise',
      'object', 'array', 'string', 'number', 'boolean', 'null', 'undefined',
      'console', 'component', 'props', 'state', 'effect', 'callback', 'handler',
      'render', 'element', 'module', 'package', 'dependency', 'typescript',
      'javascript', 'react', 'nextjs', 'nodejs', 'express', 'database',
      'query', 'mutation', 'schema', 'model', 'controller', 'service',
      'repository', 'middleware', 'authentication', 'authorization', 'validation',
      'endpoint', 'request', 'response', 'header', 'payload', 'parameter',
      'algorithm', 'iteration', 'recursion', 'condition', 'exception', 'debugging'
    ],
    
    quotes: [
      "The only way to do great work is to love what you do",
      "Innovation distinguishes between a leader and a follower",
      "Stay hungry stay foolish",
      "The future belongs to those who believe in the beauty of their dreams",
      "It does not matter how slowly you go as long as you do not stop",
      "Success is not final failure is not fatal it is the courage to continue that counts",
      "The only impossible journey is the one you never begin",
      "Believe you can and you are halfway there",
      "The best time to plant a tree was twenty years ago the second best time is now",
      "Your time is limited do not waste it living someone elses life",
      "The greatest glory in living lies not in never falling but in rising every time we fall",
      "Life is what happens when you are busy making other plans",
      "In the middle of difficulty lies opportunity",
      "The purpose of our lives is to be happy",
      "You only live once but if you do it right once is enough"
    ],
    
    numbers: [
      '1234567890', '0987654321', '1111222233', '4444555566', '7777888899',
      '123 456 789', '987 654 321', '111 222 333', '444 555 666', '777 888 999',
      '12.34', '56.78', '90.12', '34.56', '78.90',
      '100%', '50%', '25%', '75%', '33%',
      '$100', '$250', '$500', '$1000', '$9999',
      '2024', '2025', '2026', '1990', '2000'
    ],
    
    punctuation: [
      "Hello, world!", "What's up?", "It's a beautiful day.",
      "Yes; no; maybe.", "First: second: third.", "One - two - three.",
      "He said, 'Hello!'", '"Good morning," she replied.',
      "The colors are: red, blue, and green.",
      "Wait... what?", "Really?!", "Wow!!",
      "email@example.com", "www.example.com", "path/to/file",
      "(parentheses)", "[brackets]", "{braces}",
      "50% off!", "$99.99", "100+ items"
    ]
  }
};

export type WordListType = 'common' | 'medium' | 'programming' | 'quotes' | 'numbers' | 'punctuation';

export function getRandomWords(type: WordListType, count: number, locale: Locale = 'pt'): string[] {
  const list = wordLists[locale][type];
  
  if (type === 'quotes') {
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    const selectedQuotes = shuffled.slice(0, Math.ceil(count / 10));
    return selectedQuotes.join(' ').split(' ').slice(0, count);
  }
  
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * list.length);
    words.push(list[randomIndex]);
  }
  return words;
}

export function generateText(type: WordListType, wordCount: number, locale: Locale = 'pt'): string {
  return getRandomWords(type, wordCount, locale).join(' ');
}
