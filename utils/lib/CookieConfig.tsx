interface CookieConfig {
  name: string;
  label: string;
  description: string;
  cookies: string[];
  onAccept: () => void;
  onRevoke: () => void;
}

interface Config {
  apiKey: string;
  product: string;
  optionalCookies: CookieConfig[];
  position: 'LEFT' | 'RIGHT';
  theme: 'LIGHT' | 'DARK';
}

declare global {
  interface Window {
    CookieControl: {
      load: (config: Config) => void;
    };
  }
}

const CookieConfig = () => {
  const config: Config = {
    apiKey: '3a0578b34b8e13d5aa9fb91166af07c105fb2e0d',
    product: 'community',
    optionalCookies: [
      {
        name: 'analytics',
        label: 'Analytics',
        description:
          'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
        cookies: [],
        onAccept: () => {},
        onRevoke: () => {},
      },
      {
        name: 'marketing',
        label: 'Marketing',
        description:
          'Marketing cookies are used to track visitors across websites to display ads that are relevant and engaging.',
        cookies: [],
        onAccept: () => {},
        onRevoke: () => {},
      },
      {
        name: 'preferences',
        label: 'Preferences',
        description:
          'Preference cookies enable a website to remember information that changes the way the site behaves or looks.',
        cookies: [],
        onAccept: () => {},
        onRevoke: () => {},
      },
    ],
    position: 'RIGHT',
    theme: 'DARK',
  };

  return <>{typeof window !== 'undefined' && window?.CookieControl?.load(config)}</>;
};

export default CookieConfig;
