const homeContent = {
  hero: {
    title: 'Global Talent, Local Insight — Audit Support That Delivers',
    subtitle: 'Flexible Audit Support Designed for Global Accounting Firms',
    description: 'Say yes to more audits without stretching your core team thin.',
    ctas: [
      { label: 'Schedule a Meeting', calendly: true, variant: 'primary' },
      { label: 'Learn More', path: '/about-us', variant: 'secondary' },
    ],
    backgroundImage: '/images/hero-bg.webp',
  },
  valueProposition: {
    heading: 'Rooted in relationships. Measured by results',
    subheading: 'Reliable audit outsourcing services. From prep to partner sign-off',
    description: 'We power your audit delivery engine — clean data, structured files, and compliant documentation, every time. Built around your clients. Delivered for your outcomes!',
  },
  services: [
    {
      title: 'Audit File Preparation',
      description: 'Get structured, review-ready audit files — from trial balance to referencing — delivered by a team that knows your standards.',
      link: '/services/audit-file-preparation',
      icon: 'FaFileAlt',
    },
    {
      title: 'Partner-Ready Audit Delivery',
      description: 'Files built for final review. We follow your internal QA process to deliver audit files ready for partner sign-off.',
      link: '/services/partner-ready-audit-delivery',
      icon: 'FaCheckCircle',
    },
  ],
  methodology: {
    heading: 'Putting the right solutions and methods in place',
    subheading: 'Building Audit Capacity with the Right Solutions and Smarter Methods.',
    description: 'At CapacityHive, we partner with audit firms to deliver precise, scalable, and compliant audit support. Our methodology fuses technical excellence with operational agility, ensuring your firm is equipped to meet rising regulatory demands while achieving sustainable, profitable growth. We exist to enhance — not disrupt — your audit practice.',
    description2: 'Our solutions are engineered to integrate seamlessly with your firm\'s audit methodology, quality control frameworks, and client commitments. From advanced substantive testing to meticulous workpaper preparation and financial statement drafting, every process we support is built to uphold your firm\'s reputation for rigour, reliability, and technical precision.',
    description3: 'Consulting services tailored for your financial needs! CapacityHive offers more than offshore audit teams — we offer continuity, strategic capacity, and confidence at scale. Partner with us to fortify your audit delivery, protect your brand, and unlock new levels of operational excellence without compromise.',
    videoImage: '/images/video-banner.webp',
    videoUrl: '',
  },
  stats: [
    { value: '98%', label: 'Audit files passed Partner or regulatory review first time.' },
    { value: '1 Day', label: 'Average turnaround for core documentation support requests.' },
    { value: '0%', label: 'Compromises. We don\'t trade speed for audit quality.' },
    { value: '100%', label: 'Aligned. We follow your templates, tools, and methodology.' },
  ],
  serviceAreas: [
    {
      title: 'Audit Execution and Advisory Support',
      description: 'We empower audit firms to execute high-quality, risk-focused audits with speed and precision.',
      icon: 'FaShieldAlt',
      stat: '100+ checkpoints for consistent, high-quality delivery.',
      features: [
        { title: 'Fieldwork Excellence', description: 'Testing, sampling, and walkthrough support for efficient, risk-aligned audits.' },
        { title: 'Risk Documentation', description: 'Complete risk assessment and audit planning files with clear traceability.' },
      ],
    },
    {
      title: 'Financial Reporting and Standards Compliance',
      description: 'We provide end-to-end drafting support for financial statements under IFRS, FRS 102, and US GAAP frameworks.',
      icon: 'FaBalanceScale',
      stat: 'Navigating 300+ pages of evolving standards with clarity.',
      features: [
        { title: 'Financial Statements', description: 'Drafting of full financials under IFRS, FRS 102, or US GAAP.' },
        { title: 'Disclosure Compliance', description: 'Review-ready disclosures, cross-referencing, and policy notes for defensibility.' },
      ],
    },
    {
      title: 'Risk Management and Quality Assurance',
      description: 'We help audit firms protect audit quality, enhance engagement defensibility, and reduce regulatory risk exposure.',
      icon: 'FaClipboardCheck',
      stat: '20+ frameworks considered to build robust quality processes.',
      features: [
        { title: 'Audit Defensibility', description: 'Files structured for regulatory and internal QA reviews.' },
        { title: 'Risk Response', description: 'Mapped and evidenced responses to significant risks and assertions.' },
      ],
    },
  ],
  differentiators: [
    { title: 'Audit-Ready Outputs', description: 'We deliver structured documentation, clear risk responses, and audit evidence that meet review and regulatory standards.', icon: 'FaFileExport' },
    { title: 'Risk-Focused Execution', description: 'Our support aligns directly to risk assessments, planning scopes, and audit methodology — no generic templates.', icon: 'FaExclamationTriangle' },
    { title: 'Technology-Enabled Delivery', description: 'We use secure platforms, encrypted communications, and controlled workflows to streamline audits while protecting client data integrity.', icon: 'FaLaptop' },
    { title: 'Data Security Assurance', description: 'Client confidentiality and data security are at the heart of our delivery model, meeting GDPR and industry-standard protection protocols.', icon: 'FaLock' },
  ],
  ctaBanner: {
    heading: 'Your Next Best Team Member Isn\'t a Hire, It\'s CapacityHive',
    image: '/images/cta-banner.webp',
  },
  testimonials: [
    {
      quote: 'We had a tight deadline and struggled to find auditors for a UK subsidiary within our group. CapacityHive stepped in with a professional and responsive approach, quickly offering a credible solution. Thanks to their support, the audit was completed ahead of schedule. A pleasure to work with — highly recommended!',
      author: 'R K',
      role: 'Finance Director',
      avatar: '/images/avatar.webp',
    },
  ],
  blogPreview: {
    heading: 'Blogs',
    subheading: 'Check All Blog Posts',
  },
  faq: [
    { question: 'What exactly does CapacityHive do?', answer: 'We help audit and accounting firms streamline and scale their audit delivery — from clean trial balances to final review-ready workpapers. Our team in India handles the heavy lifting, while UK and Canada-based team members ensure responsive, familiar support. Whether you need an offshore audit team, help with documentation and compliance, or guidance on structuring your audit process, we deliver files the way you work — without the hiring.' },
    { question: 'Who are your services for?', answer: 'We work with audit and accounting firms that want to grow efficiently, improve turnaround times, and deliver high-quality files without increasing headcount. Whether you\'re expanding, standardising your processes, or building capacity, our team fits seamlessly into your workflow to support consistent, professional audit delivery.' },
    { question: 'How do you ensure quality and consistency?', answer: 'Every file we deliver follows a structured internal review process — built around best practices from top-tier firms. Our team includes Big 4-qualified professionals with over 20 years of experience in audit and finance, who oversee delivery, train our staff, and ensure each engagement meets your standards. We also tailor file formats, checklists, and workflows to match your firm\'s way of working.' },
    { question: 'How do we communicate and collaborate?', answer: 'We integrate into your existing workflow — whether that\'s email, Teams, Zoom, cloud audit platforms, or shared drives. You\'ll have a dedicated point of contact, and we maintain clear communication at every stage to ensure smooth handovers, timely updates, and seamless file delivery.' },
    { question: 'Is the work secure and GDPR-compliant?', answer: 'Yes. We follow GDPR standards with secure, encrypted systems, role-based access controls, and strict confidentiality protocols. We handle only the data needed, ensure it\'s protected at every step, and support full compliance with your firm\'s data obligations.' },
    { question: 'Do you require long-term contracts?', answer: 'We typically begin with a focused engagement — like one file or a sample audit section — to align on formats, expectations, and delivery standards. This keeps onboarding smooth and sets the foundation for a longer-term relationship.' },
    { question: 'How is CapacityHive different?', answer: 'We\'re a specialized audit support partner focused on quality, consistency, and capacity building. With experienced, Big 4-trained leadership and a structured delivery model, we work as an extension of your team — aligning with your processes, standards, and review expectations. Our work fits seamlessly into your audit files, so you can scale without friction.' },
  ],
  secondCtaBanner: {
    heading: 'You focus on your clients. We\'ll take care of the audit files.',
  },
}

export default homeContent
