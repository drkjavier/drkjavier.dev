import React, { useState } from 'react';

interface LanguageToggleProps {
  currentLang: 'es' | 'en';
}

export default function LanguageToggle({ currentLang }: LanguageToggleProps) {
  const [lang, setLang] = useState(currentLang);

  const switchLanguage = (newLang: 'es' | 'en') => {
    if (newLang === lang) return;
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    const targetPath = newLang === 'en' ? '/en/' : '/';
    window.location.href = targetPath;
  };

  return (
    <div className="flex items-center gap-1 border rounded-md overflow-hidden text-sm font-medium"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <button
        onClick={() => switchLanguage('es')}
        className="px-3 py-1.5 transition-colors"
        style={{
          backgroundColor: lang === 'es' ? 'var(--color-primary)' : 'transparent',
          color: lang === 'es' ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
        }}
      >
        ES
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className="px-3 py-1.5 transition-colors"
        style={{
          backgroundColor: lang === 'en' ? 'var(--color-primary)' : 'transparent',
          color: lang === 'en' ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
        }}
      >
        EN
      </button>
    </div>
  );
}
