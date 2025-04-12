export type ThemeName = 'default' | 'Impatient' | 'Angry' | 'Confused' | 'Celebratory' | 'Demanding' | 'Patient' | 'Frustrated' | 'Anxious' | 'Indecisive' | 'Tech-Troubled' | 'Complaining';

interface ThemeVariables {
  // '--Neutral-5': string;
  '--Blue-400': string;
  '--Blue-500': string;
  '--Blue-700': string;
  '--Blue-800': string;
}

export const THEMES = {
    default: {
      "--Blue-400": "#80BBFF",
      "--Blue-500": "#1f94ff",
      "--Blue-700": "#01407E",
      "--Blue-800": "#0f3557",
      // "--Neutral-5": "#181a1b"
    },
    Impatient: {
      // '--Neutral-5': '#82220c',
      '--Blue-400': '#ff8232',
      '--Blue-500': '#ff5f0a',
      '--Blue-700': '#cc2f02',
      '--Blue-800': '#a1250b'
    },
    Angry: {
      // '--Neutral-5': '#920a0a',
      '--Blue-400': '#ff5757',
      '--Blue-500': '#ff2323',
      '--Blue-700': '#d70000',
      '--Blue-800': '#b10303'
    },
    Confused: {
      // '--Neutral-5': '#733d10',
      '--Blue-400': '#feca11',
      '--Blue-500': '#eeb104',
      '--Blue-700': '#a46004',
      '--Blue-800': '#874b0c'
    },
    Celebratory: {
      // '--Neutral-5': '#74480f',
      '--Blue-400': '#ffe60d',
      '--Blue-500': '#ffd700',
      '--Blue-700': '#a67102',
      '--Blue-800': '#89580a'
    },
    Demanding: {
      // '--Neutral-5': '#602867',
      '--Blue-400': '#d48ce6',
      '--Blue-500': '#ba55d3',
      '--Blue-700': '#893299',
      '--Blue-800': '#712b7d'
    },
    Patient: {
      // '--Neutral-5': '#0d5a10',
      '--Blue-400': '#3bed3c',
      '--Blue-500': '#11d613',
      '--Blue-700': '#0a8b0b',
      '--Blue-800': '#0e6d10'
    },
    Frustrated: {
      // '--Neutral-5': '#7e1310',
      '--Blue-400': '#fe6639',
      '--Blue-500': '#fc3e13',
      '--Blue-700': '#c51609',
      '--Blue-800': '#9c1310'
    },
    Anxious: {
      // '--Neutral-5': '#4d5862',
      '--Blue-400': '#aec2cb',
      '--Blue-500': '#98aebc',
      '--Blue-700': '#778899',
      '--Blue-800': '#5b6a78'
    },
    Indecisive: {
      // '--Neutral-5': '#165263',
      '--Blue-400': '#22deee',
      '--Blue-500': '#06c1d4',
      '--Blue-700': '#0e7b90',
      '--Blue-800': '#156375'
    },
    'Tech-Troubled': {
      // '--Neutral-5': '#3d3d3d',
      '--Blue-400': '#888888',
      '--Blue-500': '#696969',
      '--Blue-700': '#4f4f4f',
      '--Blue-800': '#454545'
    },
    Complaining: {
      // '--Neutral-5': '#5d3f3f',
      '--Blue-400': '#c9a0a0',
      '--Blue-500': '#bc8f8f',
      '--Blue-700': '#825353',
      '--Blue-800': '#6d4747'
    }
  };