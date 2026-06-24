export interface Program {
  id: string
  title: string
  category: string
  img: string
  tagline: string
  description: string[]
  features: string[]
  investment: string
  note: string
  duration: string
  format: string
  includes: string
}

export const programs: Program[] = [
  {
    id: '01',
    title: 'Private Coaching',
    category: 'One-on-One',
    img: '/images/program-coaching.jpg',
    tagline: 'Intimate identity work for the woman ready to become her next-level self.',
    description: [
      'This is not surface-level motivation. Private Coaching with Jenni is a deep, personalized transformation journey designed for the woman who has outgrown who she used to be but has not fully stepped into who she is becoming.',
      'Through neuroscience-informed tools, lived experience, and deep identity work, you will break patterns of self-sabotage, regulate your nervous system, shift your beliefs at the root, and align your habits with your future self. This is where you stop negotiating with fear and start becoming her.',
    ],
    features: [
      'Bi-weekly 90-minute private sessions with Jenni',
      'Personalized identity elevation roadmap',
      'Nervous system regulation techniques',
      'Unlimited Voxer access between sessions',
      'Custom meditation and breathwork practices',
      '3-month minimum commitment',
    ],
    investment: '$5,000',
    note: 'per month, 3-month minimum',
    duration: '3–6 months',
    format: 'Bi-weekly 1:1 sessions',
    includes: 'Voxer access, custom practices',
  },
  {
    id: '02',
    title: 'Mind Renewed™ Workshop',
    category: 'Group Experience',
    img: '/images/program-workshops.jpg',
    tagline: 'A transformative group experience designed to shift you from who you have been into who you are becoming.',
    description: [
      'The Mind Renewed™ Workshop is Jenni\'s signature group experience — a powerful, immersive container where women come together to do the inner work that creates lasting outer change. This is not inspiration that fades. This is transformation that stays.',
      'Inside this workshop, you will walk through the exact stages of the Mind Renewed Mountain Method: awareness, grounding, revelation, and renewal. You will leave with clarity on what has been holding you back, a new way of thinking about your growth, and the tools to actually move forward.',
    ],
    features: [
      'Full-day immersive group workshop (6 hours)',
      'The Mind Renewed Mountain Method framework',
      'Guided meditation and breathwork sessions',
      'Breakthrough identity journaling exercises',
      'Lifetime access to workshop recordings',
      'Private community access post-event',
    ],
    investment: '$997',
    note: 'one-time investment',
    duration: '1 day (6 hours)',
    format: 'In-person or virtual',
    includes: 'Workbook, recordings, community',
  },
  {
    id: '03',
    title: 'Keynote Speaking',
    category: 'Events',
    img: '/images/program-speaking.jpg',
    tagline: 'A speaker who does not just inspire — she shifts something that stays.',
    description: [
      'Jenni Madison speaks at women\'s events, schools, and leadership spaces on identity, mindset, and transformation. She is not a motivational speaker. Her goal is not to give your audience a good moment — it is to shift something in them that stays.',
      'Your audience will leave with clarity on what has been holding them back, a new way of thinking about their growth, and the tools to actually move forward. Jenni speaks on identity, mindset, resilience, and personal transformation in a way that is real, powerful, and actionable.',
    ],
    features: [
      'Custom talk tailored to your audience',
      'Pre-event strategy call with organizers',
      'Interactive audience engagement elements',
      'Digital workbook for attendees',
      'Post-event follow-up resources',
      'Travel included for domestic events',
    ],
    investment: '$15,000',
    note: 'starting rate, travel included',
    duration: '45–90 minutes',
    format: 'Keynote or panel',
    includes: 'Strategy call, workbook, follow-up',
  },
  {
    id: '04',
    title: 'The Divine Way',
    category: 'Spiritual Mentorship',
    img: '/images/program-divine.jpg',
    tagline: 'A path of inner mastery and soulful awakening through meditation and yoga.',
    description: [
      'The Divine Way is Jenni\'s spiritual mentorship program — a sacred container for women who are ready to deepen their connection to self, source, and their inner wisdom. As a certified Ananda Meditation and PremYoga Teacher, Jenni guides others to discover their inner wisdom and cultivate calm, clear awareness.',
      'This program weaves together meditation, yoga, and the study of mind and consciousness. It is for the woman who knows that her next level is not just about strategy — it is about spirit. Who do you need to become to live the life you say you want? The answer lives inside this work.',
    ],
    features: [
      'Weekly guided meditation and yoga sessions',
      'Study of mind and consciousness principles',
      'Sacred breathwork and energy practices',
      'Personalized spiritual growth roadmap',
      'Monthly 1:1 mentorship calls with Jenni',
      'Access to exclusive retreat experiences',
    ],
    investment: '$2,500',
    note: 'per month, ongoing membership',
    duration: 'Ongoing membership',
    format: 'Weekly group + monthly 1:1',
    includes: 'Retreat access, resource library',
  },
  {
    id: '05',
    title: 'Meditation & Yoga',
    category: 'Wellness Practice',
    img: '/images/program-yoga.jpg',
    tagline: 'Renew the way you think through the wisdom of your body.',
    description: [
      'Jenni\'s Meditation & Yoga sessions are designed to help you regulate your nervous system, cultivate present-moment awareness, and reconnect with the truth of who you are. This is not fitness. This is embodiment. This is where you learn to hold success without burning out.',
      'Each session blends Ananda Meditation techniques with PremYoga practices to create a holistic experience that calms the mind, opens the heart, and strengthens the spirit. Available as private sessions or within The Divine Way membership.',
    ],
    features: [
      'Private 60-minute sessions with Jenni',
      'Ananda Meditation techniques',
      'PremYoga flow and restorative practice',
      'Personalized home practice sequences',
      'Nervous system regulation tools',
      'Available in-person or virtually',
    ],
    investment: '$300',
    note: 'per session, packages available',
    duration: '60 minutes',
    format: 'Private 1:1 sessions',
    includes: 'Home sequences, recording',
  },
  {
    id: '06',
    title: 'Entrepreneur Mentorship',
    category: 'Business Growth',
    img: '/images/program-entrepreneur.jpg',
    tagline: 'Build a business that aligns with who you are becoming, not who you used to be.',
    description: [
      'Jenni brings her background in entrepreneurship and real estate to help women build businesses that are an expression of their evolved identity. This is not generic business coaching. This is identity-first entrepreneurship — building from the inside out.',
      'You will learn how to align your business strategy with your authentic self, break through the limiting beliefs that keep you playing small, and create systems that support both your success and your well-being. This is where business meets becoming.',
    ],
    features: [
      'Monthly strategy and identity alignment sessions',
      'Business systems and scaling framework',
      'Mindset blocks specific to entrepreneurship',
      'Revenue and offer optimization review',
      'Access to Jenni\'s network and resources',
      'Quarterly group mastermind meetings',
    ],
    investment: '$3,500',
    note: 'per month, 6-month program',
    duration: '6 months',
    format: 'Monthly 1:1 + quarterly group',
    includes: 'Mastermind access, resource library',
  },
]
