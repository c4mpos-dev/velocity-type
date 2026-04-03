export type Locale = 'pt';

export const translations = {
  pt: {
    // Header
    stats: 'Estatísticas',
    settings: 'Configurações',
    
    // Mode Selector
    time: 'tempo',
    words: 'palavras',
    quote: 'citação',
    common: 'comum',
    medium: 'médio',
    code: 'código',
    punctuation: 'pontuação',
    seconds: 's',
    
    // Typing Area
    clickToStart: 'clique aqui ou pressione qualquer tecla para começar',
    focusWarning: 'clique para focar',
    tabToRestart: 'tab + enter para reiniciar',
    wordsProgress: 'palavras',
    
    // Results
    wpm: 'ppm',
    wpmFull: 'palavras por minuto',
    raw: 'bruto',
    rawWpm: 'PPM Bruto',
    accuracy: 'precisão',
    consistency: 'consistência',
    characters: 'caracteres',
    correct: 'corretos',
    incorrect: 'incorretos',
    extra: 'extras',
    missed: 'perdidos',
    testType: 'tipo de teste',
    wpmOverTime: 'PPM ao longo do tempo',
    keyboardHeatmap: 'Mapa de calor do teclado',
    heatmapDesc: 'Teclas mais vermelhas = mais erros',
    tryAgain: 'Tentar novamente',
    share: 'Compartilhar',
    newRecord: 'Novo recorde!',
    greatJob: 'Ótimo trabalho!',
    keepPracticing: 'Continue praticando!',
    
    // Stats Modal
    yourStats: 'Suas Estatísticas',
    allTime: 'Todos os tempos',
    testsCompleted: 'Testes completados',
    bestWpm: 'Melhor PPM',
    avgWpm: 'PPM Médio',
    avgAccuracy: 'Precisão Média',
    recentTests: 'Testes Recentes',
    noTests: 'Nenhum teste completado ainda',
    startTyping: 'Comece a digitar para ver suas estatísticas!',
    close: 'Fechar',
    
    // Settings Panel
    settingsTitle: 'Configurações',
    sound: 'Som',
    soundEnabled: 'Som ativado',
    soundEnabledDesc: 'Sons de digitação e feedback',
    volume: 'Volume',
    soundPack: 'Pacote de som',
    mechanical: 'Mecânico',
    soft: 'Suave',
    typewriter: 'Máquina de escrever',
    display: 'Exibição',
    smoothCaret: 'Cursor suave',
    smoothCaretDesc: 'Animação suave do cursor',
    showLiveWpm: 'Mostrar PPM em tempo real',
    showLiveWpmDesc: 'Exibir PPM enquanto digita',
    showProgressBar: 'Mostrar barra de progresso',
    showProgressBarDesc: 'Barra visual do progresso',
    caretStyle: 'Estilo do cursor',
    line: 'Linha',
    block: 'Bloco',
    underline: 'Sublinhado',
    behavior: 'Comportamento',
    quickRestart: 'Reinício rápido',
    quickRestartDesc: 'Tab para reiniciar teste',
    language: 'Idioma',
    
    // Footer
    madeWith: 'Feito com',
    forTypists: 'para digitadores',
    github: 'GitHub',
    twitter: 'Twitter',
    
    // Keyboard
    errorRate: 'Taxa de erro',
  }
} as const;

export type TranslationKey = keyof typeof translations.pt;

export function getTranslation(key: TranslationKey): string {
  return translations.pt[key] || key;
}

