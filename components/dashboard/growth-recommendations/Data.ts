export type Priority = 'High' | 'Medium' | 'Low';
export type Effort = 'Low' | 'Medium';
export type Category = 'Marketing' | 'Sales' | 'Customer Acquisition' | 'Brand Awareness' | 'Customer Retention';
export type ToolId = 'instagram' | 'facebook' | 'tiktok' | 'later' | 'canva' | 'mailchimp' | 'analytics' | 'website';

export interface Rec {
  id: string;
  category: Category;
  priority: Priority;
  effort: Effort;
  title: string;
  desc: string;
  bullets: string[];
  benefit: string;
  why: string;
  checklist: string[];
  tools: ToolId[];
  metrics: string[];
}

export const CATEGORIES: Category[] = ['Marketing', 'Sales', 'Customer Acquisition', 'Brand Awareness', 'Customer Retention'];

export const TOOLS: Record<ToolId, { label: string; color: string; letter: string }> = {
  instagram: { label: 'Instagram', color: '#e1306c', letter: 'I' },
  facebook: { label: 'Facebook', color: '#1877f2', letter: 'f' },
  tiktok: { label: 'TikTok', color: '#111827', letter: 'T' },
  later: { label: 'Later', color: '#475569', letter: 'L' },
  canva: { label: 'Canva', color: '#00a3c4', letter: 'C' },
  mailchimp: { label: 'Mailchimp', color: '#f59e0b', letter: 'M' },
  analytics: { label: 'Analytics', color: '#f97316', letter: 'A' },
  website: { label: 'Website', color: '#5b4fe6', letter: 'W' },
};

export const RECS: Rec[] = [
  {
    id: 'improve-social', category: 'Marketing', priority: 'High', effort: 'Low',
    title: 'Improve Social Media Engagement',
    desc: 'Your audience needs more engaging and consistent content to build a stronger community and brand loyalty.',
    bullets: ['Post 3-5 times per week (mix of reels, images, stories)', 'Test different content formats (behind the scenes, user generated content, product showcases)', 'Use relevant hashtags and engage with followers'],
    benefit: 'Higher brand visibility & engagement',
    why: 'Social media engagement helps increase brand visibility, build trust, and drive more traffic to your website, which can lead to higher sales over time.',
    checklist: ['Plan a content calendar (3-5 posts per week)', 'Mix content types (reels, images, stories, user content)', 'Use relevant hashtags and trending topics', 'Engage with your audience (reply to comments & DMs)', 'Track what content performs best and adjust'],
    tools: ['instagram', 'facebook', 'tiktok', 'later', 'canva'],
    metrics: ['Engagement rate (likes, comments, shares)', 'Website traffic from social media', 'Follower growth'],
  },
  {
    id: 'optimize-product', category: 'Sales', priority: 'Medium', effort: 'Medium',
    title: 'Optimize Product Pages',
    desc: 'Product pages can be more effective with better descriptions, high-quality images and clear CTAs.',
    bullets: ['Rewrite product descriptions (highlight key benefits)', 'Use high-resolution lifestyle images', 'Add clear and compelling call-to-action buttons'],
    benefit: 'Higher conversion rates',
    why: 'Clear, benefit-led product pages answer buyer questions faster, which reduces drop-off and turns more visitors into customers.',
    checklist: ['Audit your top 10 product pages', 'Rewrite descriptions around customer benefits', 'Replace weak photos with lifestyle images', 'Add a visible "Add to cart" button above the fold', 'Compare conversion rate before and after'],
    tools: ['website', 'canva', 'analytics'],
    metrics: ['Product page conversion rate', 'Add-to-cart rate', 'Bounce rate on product pages'],
  },
  {
    id: 'referral', category: 'Customer Acquisition', priority: 'Low', effort: 'Low',
    title: 'Build a Customer Referral Program',
    desc: 'Your existing customers can help you reach new audiences and grow faster through referrals.',
    bullets: ['Offer rewards for both referrer and new customer', 'Make it easy to share (unique referral links)', 'Promote the program in emails and social media'],
    benefit: 'More new customers & higher loyalty',
    why: 'Referred customers trust recommendations from people they know, so they cost less to acquire and tend to stay longer.',
    checklist: ['Decide the reward for both sides', 'Create a unique referral link for each customer', 'Add a referral banner to your website', 'Announce the program by email and social', 'Review referral signups every month'],
    tools: ['mailchimp', 'instagram', 'website'],
    metrics: ['Referral signups', 'Cost per acquired customer', 'Repeat purchase rate of referred customers'],
  },
  {
    id: 'promo-campaigns', category: 'Brand Awareness', priority: 'Medium', effort: 'Medium',
    title: 'Create Targeted Promotional Campaigns',
    desc: 'Tailored offers to specific audience segments can increase relevance and drive better results.',
    bullets: ['Segment your audience (e.g., age, style preference)', 'Run limited-time offers or seasonal discounts', 'Promote via email and social media ads'],
    benefit: 'More traffic & brand recognition',
    why: 'Offers that match what each segment cares about get more clicks and purchases than one message sent to everyone.',
    checklist: ['Split your audience into 2-3 segments', 'Write one offer per segment', 'Set start and end dates for each offer', 'Launch through email and social ads', 'Compare results across segments'],
    tools: ['mailchimp', 'facebook', 'instagram', 'canva'],
    metrics: ['Click-through rate', 'Campaign revenue', 'Traffic from campaign links'],
  },
  {
    id: 'retention', category: 'Customer Retention', priority: 'Low', effort: 'Low',
    title: 'Strengthen Customer Retention',
    desc: 'Keeping existing customers engaged is more cost-effective and brings long-term value.',
    bullets: ['Send follow-up emails after purchase', 'Launch a loyalty or rewards program', 'Ask for feedback and reviews'],
    benefit: 'Higher repeat purchases & lifetime value',
    why: 'Repeat customers spend more over time and cost far less to keep than new customers cost to win.',
    checklist: ['Set up a thank-you email after each order', 'Offer points or a discount on the next purchase', 'Request a review 7 days after delivery', 'Reach out to customers inactive for 60 days', 'Track repeat purchase rate monthly'],
    tools: ['mailchimp', 'website', 'analytics'],
    metrics: ['Repeat purchase rate', 'Customer lifetime value', 'Review count and rating'],
  },
];

export const INITIAL_SAVED = [
  { id: 'optimize-product', date: 'Apr 20, 2025' },
  { id: 'promo-campaigns', date: 'Apr 18, 2025' },
  { id: 'referral', date: 'Apr 16, 2025' },
  { id: 'retention', date: 'Apr 12, 2025' },
];