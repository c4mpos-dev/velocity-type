export type Locale = 'pt' | 'en';

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
    time: 'tempo',
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
  },
  en: {
    // Header
    stats: 'Statistics',
    settings: 'Settings',
    
    // Mode Selector
    time: 'time',
    words: 'words',
    quote: 'quote',
    common: 'common',
    medium: 'medium',
    code: 'code',
    punctuation: 'punctuation',
    seconds: 's',
    
    // Typing Area
    clickToStart: 'click here or press any key to start',
    focusWarning: 'click to focus',
    tabToRestart: 'tab + enter to restart',
    wordsProgress: 'words',
    
    // Results
    wpm: 'wpm',
    wpmFull: 'words per minute',
    raw: 'raw',
    rawWpm: 'Raw WPM',
    accuracy: 'accuracy',
    consistency: 'consistency',
    time: 'time',
    characters: 'characters',
    correct: 'correct',
    incorrect: 'incorrect',
    extra: 'extra',
    missed: 'missed',
    testType: 'test type',
    wpmOverTime: 'WPM over time',
    keyboardHeatmap: 'Keyboard heatmap',
    heatmapDesc: 'Redder keys = more errors',
    tryAgain: 'Try again',
    share: 'Share',
    newRecord: 'New record!',
    greatJob: 'Great job!',
    keepPracticing: 'Keep practicing!',
    
    // Stats Modal
    yourStats: 'Your Statistics',
    allTime: 'All time',
    testsCompleted: 'Tests completed',
    bestWpm: 'Best WPM',
    avgWpm: 'Avg WPM',
    avgAccuracy: 'Avg Accuracy',
    recentTests: 'Recent Tests',
    noTests: 'No tests completed yet',
    startTyping: 'Start typing to see your stats!',
    close: 'Close',
    
    // Settings Panel
    settingsTitle: 'Settings',
    sound: 'Sound',
    soundEnabled: 'Sound enabled',
    soundEnabledDesc: 'Typing sounds and feedback',
    volume: 'Volume',
    soundPack: 'Sound pack',
    mechanical: 'Mechanical',
    soft: 'Soft',
    typewriter: 'Typewriter',
    display: 'Display',
    smoothCaret: 'Smooth caret',
    smoothCaretDesc: 'Smooth cursor animation',
    showLiveWpm: 'Show live WPM',
    showLiveWpmDesc: 'Display WPM while typing',
    showProgressBar: 'Show progress bar',
    showProgressBarDesc: 'Visual progress indicator',
    caretStyle: 'Caret style',
    line: 'Line',
    block: 'Block',
    underline: 'Underline',
    behavior: 'Behavior',
    quickRestart: 'Quick restart',
    quickRestartDesc: 'Tab to restart test',
    language: 'Language',
    
    // Footer
    madeWith: 'Made with',
    forTypists: 'for typists',
    github: 'GitHub',
    twitter: 'Twitter',
    
    // Keyboard
    errorRate: 'Error rate',
  }
} as const;

export type TranslationKey = keyof typeof translations.pt;

export function getTranslation(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] || translations.en[key] || key;
}
