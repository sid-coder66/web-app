# Consulting Website Template — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully templated, multi-page consulting website in React that mirrors CapacityHive's structure and layout — designed so the user can later swap in their own theme, logo, and content.

**Architecture:** Vite + React SPA with React Router for client-side routing. Component-based design with a shared layout (Header, Footer) wrapping page-level components. All content lives in centralized config files so theme/logo/content can be swapped in one place. CSS Modules or Tailwind CSS for styling. Framer Motion for animations. Responsive (mobile-first).

**Tech Stack:** Vite, React 18, React Router v6, Tailwind CSS, Framer Motion, React Icons

---

## Site Map (from analysis)

| Page | Route | Source |
|---|---|---|
| Home | `/` | 10+ sections |
| About Us | `/about-us` | Hero, founder, stats, features, testimonials, process, team preview |
| Leadership Team | `/leadership-team` | Team grid, mission statement |
| Blog Listing | `/blog` | Card list, pagination |
| Blog Post | `/blog/:slug` | Full-width article, related posts |
| Service: Audit File Prep | `/services/audit-file-preparation` | Service detail template |
| Service: Partner-Ready Delivery | `/services/partner-ready-audit-delivery` | Service detail template |
| Contact Us | `/contact-us` | Contact info, newsletter, offices |
| Get In Touch / Schedule | `/get-in-touch` | CTA page, newsletter signup |
| Terms & Conditions | `/terms-conditions` | Legal content |
| Privacy Policy | `/privacy-policy` | Legal content |

---

## File Structure

```
src/
├── main.jsx                          # App entry point
├── App.jsx                           # Router setup, layout wrapper
├── config/
│   ├── siteConfig.js                 # Company name, tagline, logo, contact info, socials, offices
│   ├── navigationConfig.js           # Nav links, CTA button config
│   ├── homeContent.js                # Hero, stats, services, differentiators, FAQ, testimonials
│   ├── aboutContent.js               # About page sections
│   ├── teamContent.js                # Team member data
│   ├── servicesContent.js            # Service page data (array of service objects)
│   ├── blogContent.js                # Blog posts array (title, slug, image, category, body)
│   └── legalContent.js               # Terms & privacy policy text
├── components/
│   ├── layout/
│   │   ├── Header.jsx                # Logo, nav, mobile menu, CTA button
│   │   ├── Footer.jsx                # Company links, offices, socials, legal links
│   │   ├── Layout.jsx                # Header + children + Footer wrapper
│   │   └── MobileMenu.jsx            # Slide-out mobile nav
│   ├── ui/
│   │   ├── Button.jsx                # Primary/secondary/outline variants
│   │   ├── SectionHeading.jsx        # Reusable section title + subtitle
│   │   ├── StatCard.jsx              # Metric number + label
│   │   ├── ServiceCard.jsx           # Icon + title + description + CTA
│   │   ├── TeamCard.jsx              # Photo + name + title
│   │   ├── TestimonialCard.jsx       # Quote + author + role
│   │   ├── BlogCard.jsx              # Image + category + title + link
│   │   ├── FAQAccordion.jsx          # Expandable Q&A
│   │   ├── NewsletterSignup.jsx      # Email input + submit
│   │   ├── OfficeCard.jsx            # Location name + address + map link
│   │   ├── ProcessStep.jsx           # Step number + title + description
│   │   ├── FeatureBlock.jsx          # Icon + title + description
│   │   └── VideoEmbed.jsx            # Embedded video player
│   └── sections/
│       ├── HeroSection.jsx           # Full-width hero with CTA buttons
│       ├── StatsSection.jsx          # 4-column metrics row
│       ├── ServicesOverview.jsx       # Service cards grid
│       ├── MethodologySection.jsx     # Text + video side-by-side
│       ├── DifferentiatorsSection.jsx # 4-column feature grid
│       ├── TestimonialsSection.jsx    # Testimonial cards
│       ├── BlogPreviewSection.jsx     # 3 latest blog cards
│       ├── FAQSection.jsx            # FAQ accordion list
│       ├── NewsletterSection.jsx     # Newsletter CTA banner
│       ├── CTABannerSection.jsx      # Full-width CTA with background
│       └── ProcessSection.jsx        # 3-step process flow
├── pages/
│   ├── HomePage.jsx
│   ├── AboutPage.jsx
│   ├── TeamPage.jsx
│   ├── BlogListPage.jsx
│   ├── BlogPostPage.jsx
│   ├── ServicePage.jsx              # Dynamic — renders from servicesContent by slug
│   ├── ContactPage.jsx
│   ├── GetInTouchPage.jsx
│   ├── TermsPage.jsx
│   └── PrivacyPage.jsx
├── hooks/
│   └── useScrollToTop.js            # Scroll to top on route change
├── styles/
│   └── index.css                     # Tailwind directives, custom theme vars
├── assets/
│   └── images/                       # Placeholder images (replaced later by user)
index.html
tailwind.config.js
vite.config.js
package.json
```

---

## Task 1: Project Scaffolding & Tooling

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/styles/index.css`

- [ ] **Step 1: Initialize the Vite + React project**

```bash
cd /Users/siddharth/work/personal/web
npm create vite@latest . -- --template react
```

Select "React" and "JavaScript" when prompted. If the directory is non-empty, confirm overwrite.

- [ ] **Step 2: Install dependencies**

```bash
npm install react-router-dom framer-motion react-icons
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Configure Tailwind**

Create `src/styles/index.css`:
```css
@import "tailwindcss";
```

Update `vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 4: Set up index.html**

Update `index.html` to reference the app entry:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Consulting Firm</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Create main.jsx entry**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

- [ ] **Step 6: Create placeholder App.jsx**

```jsx
function App() {
  return <div className="text-center p-8 text-2xl">App is running</div>
}

export default App
```

- [ ] **Step 7: Verify the app runs**

```bash
npm run dev
```

Open browser at `http://localhost:5173`. Confirm "App is running" displays.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React project with Tailwind and dependencies"
```

---

## Task 2: Site Configuration Files

**Files:**
- Create: `src/config/siteConfig.js`, `src/config/navigationConfig.js`

- [ ] **Step 1: Create siteConfig.js**

```js
const siteConfig = {
  companyName: 'YourCompany',
  tagline: 'Together we Scale',
  logo: '/logo.svg',
  description: 'Global consulting firm experienced in identifying, assessing, and solving all your business challenges.',
  contact: {
    email: 'info@yourcompany.com',
    privacyEmail: 'privacy@yourcompany.com',
  },
  socials: {
    facebook: 'https://facebook.com/yourcompany',
    linkedin: 'https://linkedin.com/company/yourcompany',
  },
  offices: [
    {
      country: 'UK',
      address: '123 Business Lane, London, EC1A 1BB',
      mapUrl: 'https://maps.google.com/?q=London',
    },
    {
      country: 'India',
      address: '456 Tech Park Road, Bangalore',
      mapUrl: 'https://maps.google.com/?q=Bangalore',
    },
    {
      country: 'Canada',
      address: '789 Maple Avenue, Toronto, ON',
      mapUrl: 'https://maps.google.com/?q=Toronto',
    },
  ],
  newsletter: {
    heading: 'Stay Updated',
    description: 'Sign up for alerts, monthly insights, strategic business perspectives and exclusive content.',
  },
}

export default siteConfig
```

- [ ] **Step 2: Create navigationConfig.js**

```js
const navigationConfig = {
  mainNav: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Team', path: '/leadership-team' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact Us', path: '/contact-us' },
  ],
  ctaButton: {
    label: 'Schedule a Meeting',
    path: '/get-in-touch',
  },
  footerLinks: {
    company: [
      { label: 'About Us', path: '/about-us' },
      { label: 'Blog', path: '/blog' },
      { label: 'Team', path: '/leadership-team' },
    ],
    legal: [
      { label: 'Terms & Conditions', path: '/terms-conditions' },
      { label: 'Privacy Policy', path: '/privacy-policy' },
    ],
  },
}

export default navigationConfig
```

- [ ] **Step 3: Commit**

```bash
git add src/config/siteConfig.js src/config/navigationConfig.js
git commit -m "feat: add site and navigation configuration files"
```

---

## Task 3: Content Configuration Files

**Files:**
- Create: `src/config/homeContent.js`, `src/config/aboutContent.js`, `src/config/teamContent.js`, `src/config/servicesContent.js`, `src/config/blogContent.js`, `src/config/legalContent.js`

- [ ] **Step 1: Create homeContent.js**

```js
const homeContent = {
  hero: {
    title: 'Global Talent, Local Insight',
    subtitle: 'Your dedicated support team for professional services delivery.',
    ctas: [
      { label: 'Schedule a Meeting', path: '/get-in-touch', variant: 'primary' },
      { label: 'Learn More', path: '/about-us', variant: 'secondary' },
    ],
    backgroundImage: '/images/hero-bg.jpg',
  },
  valueProposition: {
    heading: 'Unlock Capacity',
    description: 'We deliver clean data, structured files, and compliant documentation so your team can focus on high-value work.',
  },
  services: [
    {
      title: 'Service One',
      description: 'Comprehensive preparation and structuring of your key deliverables.',
      link: '/services/audit-file-preparation',
      icon: 'FaFileAlt',
    },
    {
      title: 'Service Two',
      description: 'End-to-end delivery ready for senior review and sign-off.',
      link: '/services/partner-ready-audit-delivery',
      icon: 'FaCheckCircle',
    },
  ],
  methodology: {
    heading: 'Seamless Integration',
    description: 'We integrate directly with your existing frameworks, tools, and templates — no disruption to your workflow.',
    videoUrl: '',
  },
  stats: [
    { value: '99%', label: 'First-time review pass rate' },
    { value: '1 Day', label: 'Average turnaround time' },
    { value: '0%', label: 'Compromises on quality' },
    { value: '100%', label: 'Process alignment' },
  ],
  serviceAreas: [
    {
      title: 'Execution & Advisory Support',
      description: 'Fieldwork excellence and risk documentation with 100+ checkpoints.',
      icon: 'FaShieldAlt',
    },
    {
      title: 'Reporting & Standards Compliance',
      description: 'Drafting support under IFRS, FRS 102, and US GAAP with full disclosure compliance.',
      icon: 'FaBalanceScale',
    },
    {
      title: 'Risk Management & Quality Assurance',
      description: 'Audit defensibility and regulatory risk reduction across 20+ frameworks.',
      icon: 'FaClipboardCheck',
    },
  ],
  differentiators: [
    { title: 'Ready Outputs', description: 'Deliverables that meet review standards from day one.', icon: 'FaFileExport' },
    { title: 'Risk-Focused Execution', description: 'Every engagement prioritizes risk identification and mitigation.', icon: 'FaExclamationTriangle' },
    { title: 'Technology-Enabled Delivery', description: 'Modern tools and cloud-based workflows for efficient collaboration.', icon: 'FaLaptop' },
    { title: 'Data Security Assurance', description: 'Enterprise-grade encryption, access controls, and compliance protocols.', icon: 'FaLock' },
  ],
  testimonials: [
    {
      quote: 'Placeholder testimonial text. The team delivered exceptional results under a tight deadline.',
      author: 'Jane Smith',
      role: 'Finance Director',
      company: 'Client Corp',
    },
  ],
  blogPreview: {
    heading: 'Latest Insights',
    subheading: 'Stay ahead with our latest articles and thought leadership.',
  },
  faq: [
    { question: 'What services do you offer?', answer: 'We provide comprehensive consulting services including audit support, compliance, and advisory.' },
    { question: 'How do you ensure quality?', answer: 'Every deliverable goes through a multi-stage quality review process before delivery.' },
    { question: 'How do we communicate?', answer: 'We use your preferred communication channels — email, Slack, Teams, or scheduled calls.' },
    { question: 'What standards do you follow?', answer: 'We are experienced across IFRS, UK GAAP, US GAAP, and 20+ regulatory frameworks.' },
    { question: 'How is data security handled?', answer: 'We use end-to-end encryption, role-based access, and GDPR-aligned protocols.' },
    { question: 'Can we start with a pilot?', answer: 'Absolutely. We recommend beginning with a single engagement to validate fit.' },
    { question: 'What makes you different from competitors?', answer: 'Our team is led by former audit partners who understand the partner-review mindset.' },
    { question: 'How fast can you deliver?', answer: 'Most standard engagements are turned around within 24 hours.' },
  ],
}

export default homeContent
```

- [ ] **Step 2: Create aboutContent.js**

```js
const aboutContent = {
  hero: {
    title: 'About Us',
    subtitle: 'Scale Your Firm. Reclaim Your Time. Never Compromise.',
    description: 'We are a global consulting firm delivering professional-grade support services that let your team focus on strategy and growth.',
  },
  founder: {
    name: 'Founder Name',
    title: 'The Founder',
    image: '/images/founder.jpg',
    signatureImage: '/images/signature.png',
  },
  stats: [
    { value: '99%', label: 'First-time review pass rate' },
    { value: '1 Day', label: 'Average turnaround' },
    { value: '0%', label: 'Compromises on quality' },
    { value: '100%', label: 'Process alignment' },
  ],
  features: [
    { title: 'Scale Without Hiring', description: 'Expand your capacity without the overhead of recruitment and training.', icon: 'FaUsers' },
    { title: 'Secure Cloud Collaboration', description: 'Work together seamlessly on cloud-based platforms with full audit trails.', icon: 'FaCloud' },
    { title: 'Built-In Data Security', description: 'Enterprise-grade encryption and access controls protect every file.', icon: 'FaShieldAlt' },
  ],
  ctaBanner: {
    heading: 'Expand Smarter. Lead Stronger. Sleep Better.',
    image: '/images/cta-banner.jpg',
  },
  process: [
    { step: 1, title: 'Discovery & Alignment', description: 'We learn your tools, templates, and review standards.' },
    { step: 2, title: 'Workflow Setup', description: 'We configure secure access and establish delivery cadence.' },
    { step: 3, title: 'Ongoing Delivery', description: 'Consistent, quality-reviewed work delivered on your schedule.' },
  ],
}

export default aboutContent
```

- [ ] **Step 3: Create teamContent.js**

```js
const teamContent = {
  heading: 'Our Team',
  mission: 'We value the ideas, talent, and voices of our people!',
  description: 'Our diverse team of experienced professionals brings deep domain expertise from across the globe.',
  members: [
    { name: 'Team Member 1', title: 'Founder & CEO', image: '/images/team/member1.jpg' },
    { name: 'Team Member 2', title: 'Director & Regional Lead', image: '/images/team/member2.jpg' },
    { name: 'Team Member 3', title: 'Regional Lead', image: '/images/team/member3.jpg' },
    { name: 'Team Member 4', title: 'Regional Lead', image: '/images/team/member4.jpg' },
    { name: 'Team Member 5', title: 'Regional Lead', image: '/images/team/member5.jpg' },
  ],
}

export default teamContent
```

- [ ] **Step 4: Create servicesContent.js**

```js
const servicesContent = [
  {
    slug: 'audit-file-preparation',
    title: 'Service One — File Preparation',
    heroTagline: 'From raw data to structured files — delivery done right.',
    heroImage: '/images/services/service1-hero.jpg',
    overview: 'Structured file preparation for firms seeking quality output without internal resource strain. This is professional work, not basic task outsourcing.',
    sections: [
      {
        heading: 'What We Do',
        items: [
          'Data formatting and cleanup',
          'Lead schedule preparation',
          'Workpaper creation and referencing',
          'Tracking and control completion',
          'Basic compliance documentation',
        ],
      },
      {
        heading: 'Why It Works',
        items: [
          'Senior staff freed for higher-value work',
          'Faster turnaround and improved quality',
          'Operational control without hiring overhead',
          'Scale without adding to payroll',
        ],
      },
      {
        heading: 'Built for Firms Like Yours',
        description: 'From small practices to mid-size firms, we bring expertise across IFRS, UK GAAP, and international standards.',
      },
      {
        heading: 'Secure, Structured, Reliable',
        description: 'Encryption, role-based access, version control, and internal QA review on every engagement.',
      },
    ],
    cta: {
      heading: "Let's Build Your Delivery Engine",
      description: 'Start with one file. See the difference.',
    },
  },
  {
    slug: 'partner-ready-audit-delivery',
    title: 'Service Two — Partner-Ready Delivery',
    heroTagline: 'Deliverables ready for senior sign-off. No rework.',
    heroImage: '/images/services/service2-hero.jpg',
    overview: 'File delivery that adheres to firm standards without requiring rework. Files ready for partner sign-off from day one.',
    sections: [
      {
        heading: 'What Sets It Apart',
        items: [
          'Files aligned to firm review checklists',
          'Standardized referencing and documentation',
          'File tracking and control completion',
          'Documented compliance sections',
          'Quality-reviewed workpapers',
        ],
      },
      {
        heading: 'Why Firms Choose This Service',
        items: [
          'Reduced internal review cycles',
          'Elimination of rework loops',
          'Standardized quality across distributed teams',
          'Strategic focus preservation for partners',
        ],
      },
      {
        heading: 'Security & Compliance',
        description: 'GDPR-aligned protocols, encrypted systems, and defined access levels.',
      },
    ],
    cta: {
      heading: 'Start With a Scoped Pilot',
      description: 'Begin with a single engagement to validate alignment before scaling.',
    },
  },
]

export default servicesContent
```

- [ ] **Step 5: Create blogContent.js**

```js
const blogContent = {
  postsPerPage: 12,
  categories: ['All', 'Outsourcing', 'Audit', 'Compliance', 'Growth'],
  posts: [
    {
      slug: 'outsourcing-tax-return-preparation',
      title: 'Outsourcing Tax Return Preparation: A Step-by-Step Playbook',
      category: 'Outsourcing',
      image: '/images/blog/post1.jpg',
      date: '2025-12-15',
      content: `
## Introduction

Placeholder blog content. Replace with your actual article.

## Step 1: Identify Your Needs

Content here...

## Step 2: Choose Your Partner

Content here...

## FAQ

**Q: How do I get started?**
A: Contact us for a free consultation.
      `,
    },
    {
      slug: 'outsourced-accounting',
      title: 'Understanding Outsourced Accounting Models',
      category: 'Outsourcing',
      image: '/images/blog/post2.jpg',
      date: '2025-12-13',
      content: 'Placeholder blog content.',
    },
    {
      slug: 'uk-accounting-firm-growth-guide',
      title: 'The Ultimate Guide to UK Accounting Firm Growth',
      category: 'Growth',
      image: '/images/blog/post3.jpg',
      date: '2025-12-11',
      content: 'Placeholder blog content.',
    },
    {
      slug: 'outsource-bookkeeping',
      title: 'How to Outsource Bookkeeping Effectively',
      category: 'Outsourcing',
      image: '/images/blog/post4.jpg',
      date: '2025-12-09',
      content: 'Placeholder blog content.',
    },
    {
      slug: 'internal-audit-outsourcing',
      title: 'Internal Audit Outsourcing Best Practices',
      category: 'Audit',
      image: '/images/blog/post5.jpg',
      date: '2025-12-07',
      content: 'Placeholder blog content.',
    },
    {
      slug: 'corporate-reporting-2025',
      title: 'Corporate Reporting in 2025: FRC Annual Review',
      category: 'Compliance',
      image: '/images/blog/post6.jpg',
      date: '2025-12-05',
      content: 'Placeholder blog content.',
    },
  ],
}

export default blogContent
```

- [ ] **Step 6: Create legalContent.js**

```js
const legalContent = {
  terms: {
    title: 'Terms & Conditions',
    lastUpdated: '2025-01-01',
    sections: [
      { heading: 'Privacy Policy', body: 'We are committed to protecting your personal information. Please refer to our Privacy Policy for details on data handling.' },
      { heading: 'Terms & Conditions', body: 'By accessing this site, you agree to these terms. We reserve the right to terminate access for violation of these terms.' },
      { heading: 'Modifications & Interruptions', body: 'We reserve the right to modify or discontinue services at any time without notice.' },
      { heading: 'Governing Law', body: 'These terms are governed by the laws of the United Kingdom.' },
      { heading: 'Dispute Resolution', body: 'Any disputes shall first be resolved through informal negotiation. If unresolved, binding arbitration shall apply.' },
      { heading: 'Corrections', body: 'We reserve the right to correct errors, inaccuracies, or omissions on the site at any time.' },
      { heading: 'Disclaimer', body: 'Services are provided on an "as-is" basis. We make no warranties regarding completeness, reliability, or accuracy.' },
      { heading: 'Limitations of Liability', body: 'Our total liability shall not exceed $50 USD under any circumstances.' },
      { heading: 'Indemnification', body: 'You agree to defend and indemnify the company against any claims arising from your use of our services.' },
      { heading: 'User Data', body: 'You are responsible for the data you provide. We handle all data in accordance with our Privacy Policy.' },
      { heading: 'Electronic Communications', body: 'By using this site, you consent to receiving communications electronically.' },
      { heading: 'Contact Us', body: 'For questions, contact us at info@yourcompany.com.' },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: '2025-01-01',
    sections: [
      { heading: 'Introduction', body: "We're committed to protecting your Personal Information." },
      { heading: 'What Information We Collect', body: 'We collect basic personal data necessary for providing our services. For inquiries, contact privacy@yourcompany.com.' },
      { heading: 'What Information We Share', body: 'Data processing occurs by our employees, agents, advisors, suppliers, contractors, and/or partners. We do not sell your data to third parties.' },
      { heading: 'How Long We Keep Information', body: 'We retain data only as long as necessary for the purposes outlined in this policy.' },
      { heading: 'Your Rights', body: 'You have the right to access, correct, or delete your personal data. Contact our Data Protection Officer for requests.' },
      { heading: 'Notification of Data Breaches', body: 'In the event of a data breach, contact privacy@yourcompany.com immediately.' },
      { heading: 'Notification of Changes', body: 'We may update this policy from time to time. Changes will be posted on this page.' },
      { heading: 'Cookies', body: 'We use cookies to improve your experience. You may configure your browser to reject cookies.' },
    ],
  },
}

export default legalContent
```

- [ ] **Step 7: Commit**

```bash
git add src/config/
git commit -m "feat: add all content configuration files for pages"
```

---

## Task 4: Reusable UI Components

**Files:**
- Create: `src/components/ui/Button.jsx`, `src/components/ui/SectionHeading.jsx`, `src/components/ui/StatCard.jsx`, `src/components/ui/ServiceCard.jsx`, `src/components/ui/TeamCard.jsx`, `src/components/ui/TestimonialCard.jsx`, `src/components/ui/BlogCard.jsx`, `src/components/ui/FAQAccordion.jsx`, `src/components/ui/NewsletterSignup.jsx`, `src/components/ui/OfficeCard.jsx`, `src/components/ui/ProcessStep.jsx`, `src/components/ui/FeatureBlock.jsx`, `src/components/ui/VideoEmbed.jsx`

- [ ] **Step 1: Create Button.jsx**

```jsx
import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50',
  outline: 'bg-transparent text-white border-2 border-white hover:bg-white/10',
}

export default function Button({ label, path, variant = 'primary', className = '' }) {
  const base = 'inline-block px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center'
  return (
    <Link to={path} className={`${base} ${variants[variant]} ${className}`}>
      {label}
    </Link>
  )
}
```

- [ ] **Step 2: Create SectionHeading.jsx**

```jsx
export default function SectionHeading({ title, subtitle, centered = true, light = false }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-gray-200' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create StatCard.jsx**

```jsx
import { motion } from 'framer-motion'

export default function StatCard({ value, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center p-6"
    >
      <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{value}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </motion.div>
  )
}
```

- [ ] **Step 4: Create ServiceCard.jsx**

```jsx
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'

export default function ServiceCard({ title, description, link, icon }) {
  const IconComponent = FaIcons[icon]
  return (
    <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
      {IconComponent && <IconComponent className="text-blue-600 text-3xl mb-4" />}
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to={link} className="text-blue-600 font-semibold hover:underline">
        Read More →
      </Link>
    </div>
  )
}
```

- [ ] **Step 5: Create TeamCard.jsx**

```jsx
import { motion } from 'framer-motion'

export default function TeamCard({ name, title, image }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-lg font-bold text-gray-900">{name}</h3>
      <p className="text-gray-500 text-sm">{title}</p>
    </motion.div>
  )
}
```

- [ ] **Step 6: Create TestimonialCard.jsx**

```jsx
import { FaQuoteLeft } from 'react-icons/fa'

export default function TestimonialCard({ quote, author, role, company }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
      <FaQuoteLeft className="text-blue-600 text-2xl mb-4" />
      <p className="text-gray-700 text-lg italic mb-6">{quote}</p>
      <div>
        <span className="font-bold text-gray-900">{author}</span>
        <span className="text-gray-500"> — {role}, {company}</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Create BlogCard.jsx**

```jsx
import { Link } from 'react-router-dom'

export default function BlogCard({ slug, title, category, image }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <span className="text-blue-600 text-xs font-semibold uppercase tracking-wide">{category}</span>
        <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3 line-clamp-2">{title}</h3>
        <Link to={`/blog/${slug}`} className="text-blue-600 font-semibold hover:underline text-sm">
          Read More →
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 8: Create FAQAccordion.jsx**

```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-900 hover:bg-gray-50"
          >
            {item.question}
            <FaChevronDown className={`text-gray-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-5 pb-5 text-gray-600">{item.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 9: Create NewsletterSignup.jsx**

```jsx
import { useState } from 'react'
import siteConfig from '../../config/siteConfig'

export default function NewsletterSignup({ variant = 'default' }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Subscribed: ${email}`)
    setEmail('')
  }

  const isFullWidth = variant === 'banner'
  return (
    <div className={`${isFullWidth ? 'bg-blue-600 py-16' : 'py-12'}`}>
      <div className="max-w-xl mx-auto text-center px-4">
        <h3 className={`text-2xl font-bold mb-3 ${isFullWidth ? 'text-white' : 'text-gray-900'}`}>
          {siteConfig.newsletter.heading}
        </h3>
        <p className={`mb-6 ${isFullWidth ? 'text-blue-100' : 'text-gray-600'}`}>
          {siteConfig.newsletter.description}
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 10: Create OfficeCard.jsx**

```jsx
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function OfficeCard({ country, address, mapUrl }) {
  return (
    <div className="text-sm">
      <h4 className="font-bold text-white mb-1 flex items-center gap-2">
        <FaMapMarkerAlt className="text-blue-400" /> {country}
      </h4>
      <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
        {address}
      </a>
    </div>
  )
}
```

- [ ] **Step 11: Create ProcessStep.jsx**

```jsx
import { motion } from 'framer-motion'

export default function ProcessStep({ step, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {step}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}
```

- [ ] **Step 12: Create FeatureBlock.jsx**

```jsx
import * as FaIcons from 'react-icons/fa'

export default function FeatureBlock({ title, description, icon }) {
  const IconComponent = FaIcons[icon]
  return (
    <div className="text-center p-6">
      {IconComponent && <IconComponent className="text-blue-600 text-3xl mx-auto mb-4" />}
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
```

- [ ] **Step 13: Create VideoEmbed.jsx**

```jsx
export default function VideoEmbed({ url }) {
  if (!url) {
    return (
      <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
        Video placeholder
      </div>
    )
  }
  return (
    <div className="aspect-video rounded-xl overflow-hidden">
      <iframe src={url} className="w-full h-full" allowFullScreen title="Video" />
    </div>
  )
}
```

- [ ] **Step 14: Verify imports work**

```bash
npm run dev
```

Open browser, confirm no console errors.

- [ ] **Step 15: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add all reusable UI components"
```

---

## Task 5: Section Components

**Files:**
- Create: `src/components/sections/HeroSection.jsx`, `src/components/sections/StatsSection.jsx`, `src/components/sections/ServicesOverview.jsx`, `src/components/sections/MethodologySection.jsx`, `src/components/sections/DifferentiatorsSection.jsx`, `src/components/sections/TestimonialsSection.jsx`, `src/components/sections/BlogPreviewSection.jsx`, `src/components/sections/FAQSection.jsx`, `src/components/sections/NewsletterSection.jsx`, `src/components/sections/CTABannerSection.jsx`, `src/components/sections/ProcessSection.jsx`

- [ ] **Step 1: Create HeroSection.jsx**

```jsx
import { motion } from 'framer-motion'
import Button from '../ui/Button'

export default function HeroSection({ title, subtitle, ctas, backgroundImage }) {
  return (
    <section
      className="relative min-h-[600px] flex items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-3xl">{title}</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">{subtitle}</p>
          <div className="flex flex-wrap gap-4">
            {ctas?.map((cta, i) => (
              <Button key={i} label={cta.label} path={cta.path} variant={i === 0 ? 'primary' : 'outline'} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create StatsSection.jsx**

```jsx
import StatCard from '../ui/StatCard'

export default function StatsSection({ stats }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <StatCard key={i} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create ServicesOverview.jsx**

```jsx
import SectionHeading from '../ui/SectionHeading'
import ServiceCard from '../ui/ServiceCard'

export default function ServicesOverview({ services, heading }) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {heading && <SectionHeading title={heading} />}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={i} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create MethodologySection.jsx**

```jsx
import SectionHeading from '../ui/SectionHeading'
import VideoEmbed from '../ui/VideoEmbed'

export default function MethodologySection({ heading, description, videoUrl }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{heading}</h2>
          <p className="text-gray-600 text-lg">{description}</p>
        </div>
        <VideoEmbed url={videoUrl} />
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create DifferentiatorsSection.jsx**

```jsx
import SectionHeading from '../ui/SectionHeading'
import FeatureBlock from '../ui/FeatureBlock'

export default function DifferentiatorsSection({ title, items }) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={title || 'Why Choose Us'} />
        <div className="grid md:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <FeatureBlock key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Create TestimonialsSection.jsx**

```jsx
import SectionHeading from '../ui/SectionHeading'
import TestimonialCard from '../ui/TestimonialCard'

export default function TestimonialsSection({ testimonials }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title="What Our Clients Say" />
        <div className="space-y-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Create BlogPreviewSection.jsx**

```jsx
import SectionHeading from '../ui/SectionHeading'
import BlogCard from '../ui/BlogCard'
import blogContent from '../../config/blogContent'

export default function BlogPreviewSection({ heading, subheading }) {
  const latestPosts = blogContent.posts.slice(0, 3)
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={heading} subtitle={subheading} />
        <div className="grid md:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 8: Create FAQSection.jsx**

```jsx
import SectionHeading from '../ui/SectionHeading'
import FAQAccordion from '../ui/FAQAccordion'

export default function FAQSection({ items }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title="Frequently Asked Questions" />
        <FAQAccordion items={items} />
      </div>
    </section>
  )
}
```

- [ ] **Step 9: Create NewsletterSection.jsx**

```jsx
import NewsletterSignup from '../ui/NewsletterSignup'

export default function NewsletterSection({ variant = 'banner' }) {
  return <NewsletterSignup variant={variant} />
}
```

- [ ] **Step 10: Create CTABannerSection.jsx**

```jsx
import Button from '../ui/Button'

export default function CTABannerSection({ heading, image, ctaLabel, ctaPath }) {
  return (
    <section
      className="relative py-24 bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-blue-900/70" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{heading}</h2>
        <Button label={ctaLabel || 'Get In Touch'} path={ctaPath || '/get-in-touch'} variant="outline" />
      </div>
    </section>
  )
}
```

- [ ] **Step 11: Create ProcessSection.jsx**

```jsx
import SectionHeading from '../ui/SectionHeading'
import ProcessStep from '../ui/ProcessStep'

export default function ProcessSection({ title, subtitle, steps }) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={title} subtitle={subtitle} />
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <ProcessStep key={step.step} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 12: Commit**

```bash
git add src/components/sections/
git commit -m "feat: add all section components for page composition"
```

---

## Task 6: Layout Components (Header, Footer, Mobile Menu)

**Files:**
- Create: `src/components/layout/Header.jsx`, `src/components/layout/Footer.jsx`, `src/components/layout/MobileMenu.jsx`, `src/components/layout/Layout.jsx`
- Create: `src/hooks/useScrollToTop.js`

- [ ] **Step 1: Create useScrollToTop.js**

```jsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
}
```

- [ ] **Step 2: Create MobileMenu.jsx**

```jsx
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import navigationConfig from '../../config/navigationConfig'

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-72 bg-white z-50 shadow-xl"
          >
            <div className="flex justify-end p-4">
              <button onClick={onClose} className="text-gray-600 text-2xl">
                <FaTimes />
              </button>
            </div>
            <nav className="px-6 py-4 space-y-6">
              {navigationConfig.mainNav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className="block text-lg font-medium text-gray-800 hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to={navigationConfig.ctaButton.path}
                onClick={onClose}
                className="block bg-blue-600 text-white text-center py-3 rounded-lg font-semibold"
              >
                {navigationConfig.ctaButton.label}
              </Link>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 3: Create Header.jsx**

```jsx
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import siteConfig from '../../config/siteConfig'
import navigationConfig from '../../config/navigationConfig'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={siteConfig.logo} alt={siteConfig.companyName} className="h-10" />
          <div>
            <span className="font-bold text-xl text-gray-900">{siteConfig.companyName}</span>
            <span className="block text-xs text-gray-500">{siteConfig.tagline}</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navigationConfig.mainNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to={navigationConfig.ctaButton.path}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            {navigationConfig.ctaButton.label}
          </Link>
        </nav>

        <button onClick={() => setMobileOpen(true)} className="md:hidden text-gray-700 text-2xl">
          <FaBars />
        </button>
      </div>
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
```

- [ ] **Step 4: Create Footer.jsx**

```jsx
import { Link } from 'react-router-dom'
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import siteConfig from '../../config/siteConfig'
import navigationConfig from '../../config/navigationConfig'
import OfficeCard from '../ui/OfficeCard'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{siteConfig.companyName}</h3>
            <p className="text-sm text-gray-400">{siteConfig.description}</p>
            <div className="flex gap-4 mt-6">
              <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
                <FaFacebook />
              </a>
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              {navigationConfig.footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Offices</h4>
            <div className="space-y-4">
              {siteConfig.offices.map((office) => (
                <OfficeCard key={office.country} {...office} />
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Get Started</h4>
            <Link
              to="/get-in-touch"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {navigationConfig.footerLinks.legal.map((link) => (
              <Link key={link.path} to={link.path} className="text-sm text-gray-500 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Create Layout.jsx**

```jsx
import Header from './Header'
import Footer from './Footer'
import useScrollToTop from '../../hooks/useScrollToTop'

export default function Layout({ children }) {
  useScrollToTop()
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 6: Verify layout renders**

Update `App.jsx` temporarily:
```jsx
import Layout from './components/layout/Layout'

function App() {
  return (
    <Layout>
      <div className="p-8 text-center text-2xl">Layout works</div>
    </Layout>
  )
}

export default App
```

Run `npm run dev`, confirm header and footer render.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/ src/hooks/
git commit -m "feat: add layout components — header, footer, mobile menu, scroll-to-top"
```

---

## Task 7: All Page Components

**Files:**
- Create: `src/pages/HomePage.jsx`, `src/pages/AboutPage.jsx`, `src/pages/TeamPage.jsx`, `src/pages/BlogListPage.jsx`, `src/pages/BlogPostPage.jsx`, `src/pages/ServicePage.jsx`, `src/pages/ContactPage.jsx`, `src/pages/GetInTouchPage.jsx`, `src/pages/TermsPage.jsx`, `src/pages/PrivacyPage.jsx`

- [ ] **Step 1: Create HomePage.jsx**

```jsx
import homeContent from '../config/homeContent'
import HeroSection from '../components/sections/HeroSection'
import StatsSection from '../components/sections/StatsSection'
import ServicesOverview from '../components/sections/ServicesOverview'
import MethodologySection from '../components/sections/MethodologySection'
import DifferentiatorsSection from '../components/sections/DifferentiatorsSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import BlogPreviewSection from '../components/sections/BlogPreviewSection'
import FAQSection from '../components/sections/FAQSection'
import NewsletterSection from '../components/sections/NewsletterSection'
import SectionHeading from '../components/ui/SectionHeading'
import FeatureBlock from '../components/ui/FeatureBlock'

export default function HomePage() {
  return (
    <>
      <HeroSection {...homeContent.hero} />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionHeading
            title={homeContent.valueProposition.heading}
            subtitle={homeContent.valueProposition.description}
          />
        </div>
      </section>

      <ServicesOverview services={homeContent.services} />

      <MethodologySection {...homeContent.methodology} />

      <StatsSection stats={homeContent.stats} />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Our Expertise" />
          <div className="grid md:grid-cols-3 gap-8">
            {homeContent.serviceAreas.map((area, i) => (
              <FeatureBlock key={i} {...area} />
            ))}
          </div>
        </div>
      </section>

      <DifferentiatorsSection items={homeContent.differentiators} />

      <TestimonialsSection testimonials={homeContent.testimonials} />

      <BlogPreviewSection {...homeContent.blogPreview} />

      <FAQSection items={homeContent.faq} />

      <NewsletterSection />
    </>
  )
}
```

- [ ] **Step 2: Create AboutPage.jsx**

```jsx
import aboutContent from '../config/aboutContent'
import teamContent from '../config/teamContent'
import HeroSection from '../components/sections/HeroSection'
import StatsSection from '../components/sections/StatsSection'
import ProcessSection from '../components/sections/ProcessSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTABannerSection from '../components/sections/CTABannerSection'
import NewsletterSection from '../components/sections/NewsletterSection'
import SectionHeading from '../components/ui/SectionHeading'
import FeatureBlock from '../components/ui/FeatureBlock'
import TeamCard from '../components/ui/TeamCard'
import homeContent from '../config/homeContent'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <>
      <HeroSection
        title={aboutContent.hero.title}
        subtitle={aboutContent.hero.subtitle}
        ctas={[{ label: 'Contact Us', path: '/contact-us', variant: 'primary' }]}
        backgroundImage="/images/about-hero.jpg"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img src={aboutContent.founder.signatureImage} alt="Signature" className="h-16 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900">{aboutContent.founder.name}</h3>
            <p className="text-gray-500">{aboutContent.founder.title}</p>
          </div>
          <div>
            <img src={aboutContent.founder.image} alt={aboutContent.founder.name} className="rounded-xl w-full" />
          </div>
        </div>
      </section>

      <StatsSection stats={aboutContent.stats} />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {aboutContent.features.map((f, i) => (
              <FeatureBlock key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      <CTABannerSection heading={aboutContent.ctaBanner.heading} image={aboutContent.ctaBanner.image} />

      <TestimonialsSection testimonials={homeContent.testimonials} />

      <ProcessSection
        title="How We Fit Into Your Team"
        steps={aboutContent.process}
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="People Who Lead Our Mission" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {teamContent.members.slice(0, 5).map((m, i) => (
              <TeamCard key={i} {...m} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/leadership-team" className="text-blue-600 font-semibold hover:underline">
              Our Team →
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  )
}
```

- [ ] **Step 3: Create TeamPage.jsx**

```jsx
import teamContent from '../config/teamContent'
import TeamCard from '../components/ui/TeamCard'
import SectionHeading from '../components/ui/SectionHeading'
import NewsletterSection from '../components/sections/NewsletterSection'

export default function TeamPage() {
  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title={teamContent.heading} subtitle={teamContent.mission} />
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">{teamContent.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {teamContent.members.map((m, i) => (
              <TeamCard key={i} {...m} />
            ))}
          </div>
        </div>
      </section>
      <NewsletterSection />
    </>
  )
}
```

- [ ] **Step 4: Create BlogListPage.jsx**

```jsx
import { useState } from 'react'
import blogContent from '../config/blogContent'
import BlogCard from '../components/ui/BlogCard'
import SectionHeading from '../components/ui/SectionHeading'

export default function BlogListPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = blogContent.postsPerPage
  const totalPages = Math.ceil(blogContent.posts.length / perPage)
  const paginatedPosts = blogContent.posts.slice((currentPage - 1) * perPage, currentPage * perPage)

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title="Blog" subtitle="Insights, guides, and industry updates." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create BlogPostPage.jsx**

```jsx
import { useParams, Link } from 'react-router-dom'
import blogContent from '../config/blogContent'
import BlogCard from '../components/ui/BlogCard'
import NewsletterSection from '../components/sections/NewsletterSection'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = blogContent.posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-blue-600 hover:underline">Back to Blog</Link>
      </div>
    )
  }

  const relatedPosts = blogContent.posts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <>
      <article className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <nav className="text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-blue-600">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-wide">{post.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">{post.title}</h1>
          {post.date && <p className="text-gray-500 text-sm mb-8">{new Date(post.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>}
          <img src={post.image} alt={post.title} className="w-full rounded-xl mb-8" />
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((p) => (
                <BlogCard key={p.slug} {...p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterSection />
    </>
  )
}
```

- [ ] **Step 6: Create ServicePage.jsx**

```jsx
import { useParams, Link } from 'react-router-dom'
import servicesContent from '../config/servicesContent'
import Button from '../components/ui/Button'
import NewsletterSection from '../components/sections/NewsletterSection'

export default function ServicePage() {
  const { slug } = useParams()
  const service = servicesContent.find((s) => s.slug === slug)

  if (!service) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Not Found</h1>
        <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
      </div>
    )
  }

  return (
    <>
      <section
        className="relative min-h-[400px] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${service.heroImage})` }}
      >
        <div className="absolute inset-0 bg-blue-900/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{service.title}</h1>
          <p className="text-xl text-gray-200">{service.heroTagline}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-lg text-gray-700 mb-12">{service.overview}</p>

          {service.sections.map((section, i) => (
            <div key={i} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.heading}</h2>
              {section.description && <p className="text-gray-600">{section.description}</p>}
              {section.items && (
                <ul className="space-y-2 mt-4">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-600">
                      <span className="text-blue-600 mt-1">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="bg-blue-50 rounded-xl p-8 text-center mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{service.cta.heading}</h2>
            <p className="text-gray-600 mb-6">{service.cta.description}</p>
            <Button label="Schedule a Meeting" path="/get-in-touch" />
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  )
}
```

- [ ] **Step 7: Create ContactPage.jsx**

```jsx
import siteConfig from '../config/siteConfig'
import SectionHeading from '../components/ui/SectionHeading'
import OfficeCard from '../components/ui/OfficeCard'
import NewsletterSection from '../components/sections/NewsletterSection'
import { FaEnvelope } from 'react-icons/fa'

export default function ContactPage() {
  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Contact Us" subtitle="We'd love to hear from you." />

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Offices</h3>
              <div className="space-y-6">
                {siteConfig.offices.map((office) => (
                  <div key={office.country} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-bold text-gray-900">{office.country}</h4>
                      <a href={office.mapUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 text-sm">
                        {office.address}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get In Touch</h3>
              <div className="flex items-center gap-3 mb-6">
                <FaEnvelope className="text-blue-600" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-gray-700 hover:text-blue-600">
                  {siteConfig.contact.email}
                </a>
              </div>
              <p className="text-gray-600">Reach out to us directly or schedule a meeting at your convenience.</p>
            </div>
          </div>
        </div>
      </section>
      <NewsletterSection />
    </>
  )
}
```

- [ ] **Step 8: Create GetInTouchPage.jsx**

```jsx
import SectionHeading from '../components/ui/SectionHeading'
import NewsletterSection from '../components/sections/NewsletterSection'

export default function GetInTouchPage() {
  return (
    <>
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeading title="Schedule a Meeting" subtitle="Let's discuss how we can support your team." />
          <div className="bg-gray-100 rounded-xl p-12 text-center">
            <p className="text-gray-500 text-lg">
              Scheduling widget placeholder — integrate Calendly, HubSpot, or your preferred booking tool here.
            </p>
          </div>
        </div>
      </section>
      <NewsletterSection />
    </>
  )
}
```

- [ ] **Step 9: Create TermsPage.jsx**

```jsx
import legalContent from '../config/legalContent'

export default function TermsPage() {
  const { title, sections } = legalContent.terms
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{title}</h1>
        {sections.map((s, i) => (
          <div key={i} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">{s.heading}</h2>
            <p className="text-gray-600">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 10: Create PrivacyPage.jsx**

```jsx
import legalContent from '../config/legalContent'

export default function PrivacyPage() {
  const { title, sections } = legalContent.privacy
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{title}</h1>
        {sections.map((s, i) => (
          <div key={i} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">{s.heading}</h2>
            <p className="text-gray-600">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 11: Commit**

```bash
git add src/pages/
git commit -m "feat: add all page components — home, about, team, blog, services, contact, legal"
```

---

## Task 8: Router Setup & App Integration

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Wire up all routes in App.jsx**

```jsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import TeamPage from './pages/TeamPage'
import BlogListPage from './pages/BlogListPage'
import BlogPostPage from './pages/BlogPostPage'
import ServicePage from './pages/ServicePage'
import ContactPage from './pages/ContactPage'
import GetInTouchPage from './pages/GetInTouchPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/leadership-team" element={<TeamPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/get-in-touch" element={<GetInTouchPage />} />
        <Route path="/terms-conditions" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="*" element={<div className="py-20 text-center text-2xl">404 — Page Not Found</div>} />
      </Routes>
    </Layout>
  )
}
```

- [ ] **Step 2: Run the app and test all routes**

```bash
npm run dev
```

Verify in browser:
- `/` — Homepage with all sections
- `/about-us` — About page with founder, stats, process
- `/leadership-team` — Team grid
- `/blog` — Blog listing with pagination
- `/blog/outsourcing-tax-return-preparation` — Blog post
- `/services/audit-file-preparation` — Service detail
- `/services/partner-ready-audit-delivery` — Service detail
- `/contact-us` — Contact page
- `/get-in-touch` — Schedule meeting page
- `/terms-conditions` — Legal page
- `/privacy-policy` — Legal page
- `/nonexistent` — 404 page

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wire up React Router with all page routes"
```

---

## Task 9: Placeholder Assets & Final Polish

**Files:**
- Create: `public/images/` directory with placeholder images
- Create: `public/logo.svg`
- Create: `public/favicon.svg`

- [ ] **Step 1: Create placeholder SVG logo**

Create `public/logo.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" fill="none">
  <rect width="40" height="40" rx="8" fill="#2563EB"/>
  <text x="50" y="28" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1F2937">Logo</text>
</svg>
```

Create `public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#2563EB"/>
  <text x="16" y="22" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="white">C</text>
</svg>
```

- [ ] **Step 2: Create placeholder image directory and generator script**

```bash
mkdir -p public/images/blog public/images/services public/images/team
```

Create `scripts/generate-placeholders.js`:
```js
import { writeFileSync, mkdirSync } from 'fs'

function svg(w, h, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="#E5E7EB"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="#9CA3AF">${label}</text>
</svg>`
}

const images = [
  ['public/images/hero-bg.jpg', 1920, 800, 'Hero Background'],
  ['public/images/about-hero.jpg', 1920, 800, 'About Hero'],
  ['public/images/founder.jpg', 600, 600, 'Founder Photo'],
  ['public/images/signature.png', 200, 80, 'Signature'],
  ['public/images/cta-banner.jpg', 1920, 600, 'CTA Banner'],
  ['public/images/services/service1-hero.jpg', 1920, 600, 'Service 1'],
  ['public/images/services/service2-hero.jpg', 1920, 600, 'Service 2'],
  ['public/images/team/member1.jpg', 400, 400, 'Team 1'],
  ['public/images/team/member2.jpg', 400, 400, 'Team 2'],
  ['public/images/team/member3.jpg', 400, 400, 'Team 3'],
  ['public/images/team/member4.jpg', 400, 400, 'Team 4'],
  ['public/images/team/member5.jpg', 400, 400, 'Team 5'],
  ['public/images/blog/post1.jpg', 800, 500, 'Blog 1'],
  ['public/images/blog/post2.jpg', 800, 500, 'Blog 2'],
  ['public/images/blog/post3.jpg', 800, 500, 'Blog 3'],
  ['public/images/blog/post4.jpg', 800, 500, 'Blog 4'],
  ['public/images/blog/post5.jpg', 800, 500, 'Blog 5'],
  ['public/images/blog/post6.jpg', 800, 500, 'Blog 6'],
]

for (const [path, w, h, label] of images) {
  writeFileSync(path.replace('.jpg', '.svg').replace('.png', '.svg'), svg(w, h, label))
  console.log(`Created: ${path}`)
}
```

Run:
```bash
node scripts/generate-placeholders.js
```

Then update all config files to use `.svg` extensions instead of `.jpg`/`.png` for the placeholders. (When the user provides real images, they'll replace these paths.)

- [ ] **Step 3: Final verification**

```bash
npm run dev
```

Test every page. Confirm:
- All navigation links work
- All placeholder images display
- Mobile menu opens/closes
- FAQ accordion expands/collapses
- Blog pagination works
- Service pages render dynamically
- Footer offices and social links render
- No console errors

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add placeholder assets and complete website template"
```

---

## Task 10: Responsive & Animation Polish

**Files:**
- Modify: Various components for mobile responsiveness refinements

- [ ] **Step 1: Test mobile responsiveness**

Open Chrome DevTools → Toggle device toolbar → Test at 375px (mobile), 768px (tablet), 1024px (desktop).

Check each page:
- Header collapses to hamburger menu on mobile
- Hero text scales down appropriately
- Grids stack to single column on mobile
- Footer stacks vertically
- Blog cards go to single column
- Service pages are readable on mobile

- [ ] **Step 2: Fix any responsive issues found**

Apply fixes as needed. Common patterns:
- Ensure `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` patterns are used
- Ensure text sizes use responsive variants (`text-2xl md:text-4xl`)
- Ensure padding is appropriate on small screens (`px-4`)

- [ ] **Step 3: Verify Framer Motion animations**

Scroll through each page and confirm:
- Stats animate in on scroll
- Team cards fade in
- Hero content slides up on page load
- Process steps animate in

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "polish: responsive layout fixes and animation verification"
```

---

## Summary — What the User Swaps Later

| What to Change | Where |
|---|---|
| Company name, tagline, description | `src/config/siteConfig.js` |
| Logo and favicon | `public/logo.svg`, `public/favicon.svg` |
| Theme colors (blue → custom) | `tailwind.config.js` + search-replace `blue-600`, `blue-700` etc. |
| Navigation links | `src/config/navigationConfig.js` |
| Homepage content | `src/config/homeContent.js` |
| About page content | `src/config/aboutContent.js` |
| Team members | `src/config/teamContent.js` |
| Services | `src/config/servicesContent.js` |
| Blog posts | `src/config/blogContent.js` |
| Legal text | `src/config/legalContent.js` |
| Images | Replace files in `public/images/` |
| Fonts | Add in `index.html` + `tailwind.config.js` |
