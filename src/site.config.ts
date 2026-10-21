// One place for facts that change: domain, contacts, links, analytics.

export const site = {
  name: 'ThreadBind Studios',
  url: 'https://threadbindstudios.com',
  locale: 'en_GB',
  email: 'threadbindstudios@proton.me',
  gaId: 'G-7149QJJGP9',

  forms: {
    waitlist: 'https://forms.gle/A3rPEWxdjGXEhSCf7',
    contact: 'https://rajathjnx.atlassian.net/jira/software/form/ef3174e2-3651-4e5d-9089-26731b62b964',
    feedback: 'https://rajathjnx.atlassian.net/jira/software/form/d7d861aa-f899-41ce-b5d9-8de1b282dbe2',
  },

  // Placeholders until the profiles exist. Paste the real URL into `href` to publish a link;
  // an empty href shows the name marked "soon".
  socials: [
    { label: 'Discord', href: '' },
    { label: 'X', href: '' },
    { label: 'Instagram', href: '' },
    { label: 'YouTube', href: '' },
  ],
} as const;

export const nav = [
  { label: 'Weave', href: '/weave/' },
  { label: 'Studio', href: '/about/' },
  { label: 'Press', href: '/press/' },
  { label: 'Support', href: '/support/' },
] as const;

export const legal = [
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Terms', href: '/terms/' },
  { label: 'Content policy', href: '/content-policy/' },
] as const;
