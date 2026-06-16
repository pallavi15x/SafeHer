import { useState, useEffect } from 'react';

export type Page = 'home' | 'features' | 'how-it-works' | 'resources' | 'about' | 'contact';

const VALID_PAGES: Page[] = ['home', 'features', 'how-it-works', 'resources', 'about', 'contact'];

function getPageFromHash(): Page {
  const hash = window.location.hash.replace('#', '').toLowerCase() as Page;
  return VALID_PAGES.includes(hash) ? hash : 'home';
}

export function useRouter() {
  const [page, setPage] = useState<Page>(getPageFromHash);

  useEffect(() => {
    const onHashChange = () => {
      const p = getPageFromHash();
      setPage(p);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (p: Page) => {
    window.location.hash = p;
  };

  return { page, navigate };
}
