import type { Article, ArticleCategory } from "@/lib/types";
import { ARTICLE_CATEGORY_LABELS } from "@/lib/types";

export const articles: Article[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // FEATURED — anchors the homepage
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "what-i-learned-building-ai-systems-for-local-businesses",
    title: "What I Learned Building AI Systems for Local Businesses",
    excerpt:
      "The technology is rarely the hard part. Here's what actually breaks down when you try to bring AI into a real small business — and what that means for the people who own them.",
    category: "ai-economy",
    date: "2026-06-01",
    readTime: 7,
    featured: true,
    content: [
      {
        type: "p",
        text: "I spent the better part of the last year building AI systems for local businesses in Las Vegas. Lead capture tools, automated follow-up sequences, chatbots, appointment setters. The kind of stuff you see advertised everywhere now as the cure for every business problem.",
      },
      {
        type: "p",
        text: "I want to tell you what I actually learned — not the pitch version, but the honest one.",
      },
      {
        type: "h2",
        text: "The Technology Is Rarely the Problem",
      },
      {
        type: "p",
        text: "Every business owner I worked with had roughly the same assumption going in: that the hard part was the software. The AI. The integration. And every single one of them was wrong about that. The technology, in 2026, is shockingly capable and shockingly accessible. The hard part is the workflow that exists before and after the technology touches anything.",
      },
      {
        type: "p",
        text: "When a lead comes in at 11pm on a Tuesday and the AI sends an instant response — great. But if the business owner has no system for what happens when that lead responds at 7am Wednesday, the AI just generated a more efficient version of the same problem they already had. Speed without process is just faster chaos.",
      },
      {
        type: "h2",
        text: "What Most Business Owners Are Actually Missing",
      },
      {
        type: "p",
        text: "It's not automation. It's clarity about what they want automation to do. The businesses that got real results from AI implementation had one thing in common: they could describe the exact problem they wanted solved in a single sentence. The ones that struggled came in with vague ambitions — 'I want to grow' or 'I want better leads' — and couldn't define what a successful lead even looked like.",
      },
      {
        type: "p",
        text: "AI amplifies what's already there. A business with a clear offer, a defined customer, and a repeatable sales process gets dramatically better results from AI tools than a business that's still figuring out those fundamentals. This sounds obvious until you see how many businesses try to use AI to skip the fundamentals.",
      },
      {
        type: "h2",
        text: "The Opportunity That Most People Are Missing",
      },
      {
        type: "p",
        text: "Here's what surprised me most: the gap between businesses using AI and businesses not using it is widening faster than most people realize. I'm not talking about the Fortune 500. I'm talking about the med spa down the street and the roofing company and the insurance broker. The ones who figured out even basic AI-assisted follow-up in 2024 are converting at rates that feel almost unfair compared to the ones still doing everything manually.",
      },
      {
        type: "p",
        text: "The window to get ahead of this is not infinite. It never is with technology shifts. But it's also not closed — not yet, not for most local markets.",
      },
      {
        type: "h2",
        text: "What This Platform Is For",
      },
      {
        type: "p",
        text: "I built Digital Wealth Transfer because I kept having the same conversation over and over. Business owners, employees, regular people asking 'what's actually happening with AI? What do I actually need to know?' Not from a tech conference. Not from a vendor. From someone who's been inside the implementation and can tell them honestly what's working, what's overhyped, and what they need to pay attention to.",
      },
      {
        type: "p",
        text: "That's what I'm trying to do here. Every article on this platform comes from that same place: what I'm seeing, learning, and building — translated for people who aren't engineers but are smart enough to know that this transition is real.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DIGITAL ASSETS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "bitcoin-is-not-an-investment-its-a-decision",
    title: "Bitcoin Is Not an Investment. It's a Decision.",
    excerpt:
      "Every asset class asks you to trust a system. Bitcoin asks you to decide which system you trust — and why. That's a fundamentally different question.",
    category: "digital-assets",
    date: "2026-05-25",
    readTime: 6,
    content: [
      {
        type: "p",
        text: "I've watched people buy Bitcoin as a speculative trade — trying to time the market, watching charts, looking for the right entry point. Some of them made money. Most of them didn't hold long enough to understand what they actually owned.",
      },
      {
        type: "p",
        text: "And I've watched people buy Bitcoin after understanding what it is — after really thinking through why it exists, what problem it solves, and what they believe about money. Those people hold differently. They're not checking the price every hour. They're thinking in years.",
      },
      {
        type: "p",
        text: "The difference isn't strategy. It's understanding.",
      },
      {
        type: "h2",
        text: "Every Asset Is a Bet on a System",
      },
      {
        type: "p",
        text: "When you hold dollars, you're betting that the U.S. government will manage monetary policy in a way that preserves your purchasing power. When you hold real estate, you're betting that land values will hold relative to inflation, that property rights will be enforced, and that the local economy will support demand. When you hold stocks, you're betting on corporate earnings growth and the stability of markets.",
      },
      {
        type: "p",
        text: "Every store of value is a vote of confidence in some system. Bitcoin is a bet that a system governed by math and physics — by fixed supply and distributed consensus — will hold value better than systems governed by committees and politics. That's it. That's the whole thesis.",
      },
      {
        type: "h2",
        text: "Why the Volatility Argument Misses the Point",
      },
      {
        type: "p",
        text: "The most common objection I hear is 'Bitcoin is too volatile to be money.' And it's true — the price swings are significant, especially over short time horizons. But the people making this argument are measuring Bitcoin against its current use case as a savings vehicle, not against the trajectory of its adoption.",
      },
      {
        type: "p",
        text: "Gold was volatile too, in its early days as a monetary instrument. Every technology that becomes infrastructure goes through a period where its price discovery looks chaotic from the outside. Bitcoin is 15 years old. The dollar has been the world's reserve currency for 80. These are different points on very different timelines.",
      },
      {
        type: "h2",
        text: "The Question Worth Sitting With",
      },
      {
        type: "p",
        text: "I'm not trying to sell you on Bitcoin. What I'm trying to do is describe the actual decision clearly, because I think most people who haven't looked into it haven't had it described clearly.",
      },
      {
        type: "p",
        text: "The question isn't 'is Bitcoin going up?' The question is: 'Do I trust a fixed-supply, mathematically governed, globally distributed monetary network more or less than I trust central banks to protect my purchasing power over the next 20 years?' Answer that honestly, based on your own read of history and your own financial situation, and you'll know what to do.",
      },
      {
        type: "p",
        text: "That's the decision. Not the price. The decision.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // FINANCIAL SHIFT — personal essay / founder origin
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "why-i-built-digital-wealth-transfer",
    title: "Why I Built Digital Wealth Transfer",
    excerpt:
      "I didn't grow up around money or technology. I grew up watching both of them work against people who didn't understand them. That's what this is about.",
    category: "financial-shift",
    date: "2026-05-18",
    readTime: 5,
    content: [
      {
        type: "p",
        text: "I grew up in East LA. My family didn't have a financial advisor. We didn't have stock accounts. The closest thing to a wealth conversation I remember was my mom explaining why we couldn't afford something. Money was something you worried about, not something you thought about strategically.",
      },
      {
        type: "p",
        text: "I don't say that to make you feel something. I say it because it's the reason this platform exists.",
      },
      {
        type: "h2",
        text: "The Jobs That Taught Me What I Actually Needed to Know",
      },
      {
        type: "p",
        text: "I spent years in sales, banking, and customer support before I ever touched a line of code or understood what Bitcoin was. In banking, I watched people make decisions about their money based on whatever the person behind the counter told them — because they had no framework for evaluating it themselves. In customer support, I watched companies use complexity as a moat. Keep things confusing enough and people stop asking questions.",
      },
      {
        type: "p",
        text: "At Tesla, I saw what happens when technology is communicated clearly, when the person selling it understands it deeply enough to translate it for someone who doesn't. It changes the quality of the decision the buyer makes. They're not just buying a car. They're making an informed choice about their energy, their technology, their future.",
      },
      {
        type: "p",
        text: "That's what was missing for AI and Bitcoin and everything else that's happening right now. Clear translation for people who aren't experts but deserve to understand.",
      },
      {
        type: "h2",
        text: "Why This Moment Matters",
      },
      {
        type: "p",
        text: "We are in the middle of the most significant economic and technological transition of our lifetime. AI is restructuring what work looks like. Bitcoin and digital assets are challenging what money looks like. Automation is changing what a business can be with a small team. The tools are becoming available to regular people — but the understanding isn't spreading at the same rate.",
      },
      {
        type: "p",
        text: "That gap — between what's possible and what most people understand is possible — is where I want to work. Not by dumbing things down. By being honest, specific, and clear. By showing my work. By writing from inside the transition instead of observing it from a distance.",
      },
      {
        type: "h2",
        text: "What Digital Wealth Transfer Is",
      },
      {
        type: "p",
        text: "This is a media and education platform. I write about AI, Bitcoin, automation, and digital business — for people who are figuring this out on their own, without institutional backing or a CS degree. Everything here comes from what I'm actually seeing, building, and learning.",
      },
      {
        type: "p",
        text: "There's no hidden agenda. I'm not a venture-backed startup trying to sell you a product. I'm a first-gen builder in Las Vegas trying to document something real while it's happening — and make it useful for people who look like where I came from.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // AI ECONOMY — Sovereign OS / personal intelligence
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "im-building-a-personal-intelligence-operating-system",
    title: "I'm Building a Personal Intelligence Operating System. Here's Why.",
    excerpt:
      "Every professional tool I use is optimized for someone else's business model. I'm done renting my own brain to subscription software. Here's what I'm building instead.",
    category: "ai-economy",
    date: "2026-06-08",
    readTime: 6,
    content: [
      {
        type: "p",
        text: "I use about a dozen tools every day to run my work. A notes app. A task manager. A calendar. An AI assistant. A browser full of tabs I'm never going to close. A CRM I half-finished setting up. A dashboard I check sometimes.",
      },
      {
        type: "p",
        text: "None of them talk to each other. None of them are optimized for how I actually think. All of them are collecting data about my behavior to sell me more features or better ads or upsell me to an enterprise plan.",
      },
      {
        type: "p",
        text: "I decided to stop complaining about this and start building something different.",
      },
      {
        type: "h2",
        text: "The Idea: A System That Thinks Like You Do",
      },
      {
        type: "p",
        text: "The concept I've been working toward is what I'm calling Sovereign OS — a personal intelligence operating system built around one person's goals, thinking style, and information environment. Not a productivity suite. Not another note-taking app. A system that integrates AI assistance, planning infrastructure, financial signals, and content creation tools into one coherent interface — one that you own, one that runs for you instead of monetizing you.",
      },
      {
        type: "p",
        text: "The prototype I have running right now pulls in Bitcoin price data, runs a Pomodoro focus timer, tracks habits, lets me plan weekly and monthly at multiple time horizons, and has an AI assistant that has context on what I'm working on. It's not polished. But it works — and working inside it every day feels fundamentally different from the fragmented tool stack I used before.",
      },
      {
        type: "h2",
        text: "Why Sovereignty Matters Here",
      },
      {
        type: "p",
        text: "The word I keep coming back to is sovereignty. Your attention, your data, your decision-making process — these are the most valuable assets you have as a knowledge worker. And right now, almost every tool you use is designed to extract value from those assets rather than compound them.",
      },
      {
        type: "p",
        text: "A personal intelligence OS flips that relationship. Instead of your tools being optimized for their company's growth metrics, they're optimized for yours. That's a different design philosophy, and it produces a fundamentally different product.",
      },
      {
        type: "h2",
        text: "What I'm Building Toward",
      },
      {
        type: "p",
        text: "Sovereign OS will eventually be a standalone product — its own domain, its own deployment, its own identity. Right now it lives as a working prototype. I use it every day. I'm documenting the build here on DWT as I go.",
      },
      {
        type: "p",
        text: "If you want to follow the build — or you're thinking about the same kinds of questions about your own tooling and attention — subscribe to the newsletter. I'll be writing about every meaningful decision in the build process: what I tried, what broke, what actually worked.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // OPPORTUNITIES — digital empowerment / accessibility
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "you-dont-need-a-cs-degree-to-build-with-ai",
    title: "You Don't Need a CS Degree to Build With AI",
    excerpt:
      "The barrier to building with AI is lower than it has ever been — and it keeps dropping. What's actually stopping most people isn't technical. It's psychological.",
    category: "opportunities",
    date: "2026-05-10",
    readTime: 5,
    content: [
      {
        type: "p",
        text: "I taught myself how to code in my 20s, after years in sales and banking. I didn't go to a bootcamp. I didn't have a CS degree. I used YouTube, documentation, and a willingness to build things that didn't work for a while.",
      },
      {
        type: "p",
        text: "That was hard. It required a particular kind of persistence that most people reasonably don't have time for.",
      },
      {
        type: "p",
        text: "What's happening with AI tools right now is different — and I don't think enough people have fully processed how different it is.",
      },
      {
        type: "h2",
        text: "The Shift That's Already Happened",
      },
      {
        type: "p",
        text: "A year ago, building an automated lead capture system for a small business meant understanding APIs, writing code, connecting services through tools like Zapier or Make, and debugging when things broke. You needed either technical skills or the money to hire someone who had them.",
      },
      {
        type: "p",
        text: "Today, I can describe what I want in plain English to an AI assistant, and it will write the code, explain what it does, tell me where to put it, and help me debug it when it breaks. The technical barrier hasn't just been lowered — it's been restructured. You don't need to know how to code anymore. You need to know what you want to build and why.",
      },
      {
        type: "h2",
        text: "What the Barrier Actually Is Now",
      },
      {
        type: "p",
        text: "The real barrier to building with AI in 2026 isn't technical literacy. It's problem clarity and willingness to experiment. You need to be able to describe a specific problem with enough precision that an AI tool can help you solve it. And you need to be willing to be wrong a few times before you get it right.",
      },
      {
        type: "p",
        text: "That's a learnable skill. It doesn't require a computer science background. It requires clear thinking, patience, and the willingness to try something that might not work on the first attempt.",
      },
      {
        type: "h2",
        text: "Who This Is Actually For",
      },
      {
        type: "ul",
        items: [
          "The entrepreneur who has a process they do manually every week and knows there has to be a better way",
          "The small business owner who keeps losing leads because they can't respond fast enough",
          "The creative who spends more time on admin than on the work that actually matters",
          "The employee who sees inefficiency everywhere but doesn't know how to start fixing it",
          "Anyone who has ever thought 'there should be a tool for this' — because now you might be able to build it",
        ],
      },
      {
        type: "h2",
        text: "The Honest Caveat",
      },
      {
        type: "p",
        text: "I'm not saying this is trivial. There's still a learning curve. You'll still hit moments where you don't know why something isn't working. The difference is that you now have an extremely capable collaborator helping you figure it out, available at any hour, infinitely patient, and free or nearly free to access.",
      },
      {
        type: "p",
        text: "The people who figured this out early are already pulling ahead. The gap between those who are building with AI and those who aren't is real, and it's widening. I'd rather write about this now — while there's still time to catch up — than document the gap after it's permanent.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}

export { ARTICLE_CATEGORY_LABELS };

export const ALL_ARTICLE_CATEGORIES: ArticleCategory[] = [
  "ai-economy",
  "digital-assets",
  "financial-shift",
  "opportunities",
];
