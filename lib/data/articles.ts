import type { Article, ArticleCategory } from "@/lib/types";

export const articles: Article[] = [

  // ─── 1. FEATURED ──────────────────────────────────────────────────────────
  {
    slug: "the-digital-shift-is-bigger-than-ai",
    title: "The Digital Shift Is Bigger Than AI",
    subtitle: "Why focusing only on artificial intelligence means missing the larger pattern.",
    excerpt:
      "AI is real and it's changing everything. But if you only focus on AI, you're missing the larger transition — one that has been building for forty years and is now accelerating faster than most people can track.",
    category: "financial-shift",
    status: "published",
    date: "2026-06-10",
    author: { name: "Jonathan Cardona", title: "Founder, Digital Wealth Transfer" },
    readTime: 8,
    featured: true,
    tags: ["AI", "digital-transition", "economy", "technology"],
    relatedSlugs: ["the-next-workforce-revolution", "bitcoin-ownership-personal-sovereignty"],
    content: [
      {
        type: "p",
        text: "We are in the middle of the most significant economic reorganization in a century. Most people can feel it. Few can articulate it. And the ones who are most focused on artificial intelligence — the tool everyone is talking about — are looking at the symptom, not the system.",
      },
      {
        type: "h2",
        text: "The Shift That Started Forty Years Ago",
      },
      {
        type: "p",
        text: "The digital transition didn't begin with ChatGPT. It didn't begin with smartphones. It began the moment information stopped being expensive to copy, and started being nearly free to distribute.",
      },
      {
        type: "p",
        text: "That shift — from atoms to bits, from physical constraints to digital abundance — has been dismantling and rebuilding industries for four decades. The music industry collapsed in the 2000s. Retail reorganized around logistics networks. Media fragmented into infinite channels. Finance started moving onto rails that don't require banks to clear.",
      },
      {
        type: "p",
        text: "Each of these waves felt like a separate event. They weren't. They were chapters of the same story.",
      },
      {
        type: "h2",
        text: "AI Is Not the Shift. AI Is the Accelerant.",
      },
      {
        type: "p",
        text: "Artificial intelligence is the most powerful tool to emerge from the digital age. But it's still a tool. And tools amplify the direction you're already moving.",
      },
      {
        type: "pullquote",
        text: "Every major shift in how value is created starts with a shift in how information moves. AI just made information move faster than any of us were ready for.",
      },
      {
        type: "p",
        text: "What AI has done is compress the timeline. Changes that would have taken twenty years are happening in five. Business models that seemed durable are becoming obsolete in months. The window between 'this is coming' and 'this already happened' has closed dramatically.",
      },
      {
        type: "p",
        text: "If you're waiting for things to stabilize before you adapt, you are adapting to a world that no longer exists.",
      },
      {
        type: "h2",
        text: "The Three Layers of the Transition",
      },
      {
        type: "p",
        text: "To understand where you are in this shift, it helps to think in three layers.",
      },
      {
        type: "ul",
        items: [
          "Infrastructure: who controls the rails — the networks, the compute, the protocols — that everything else runs on",
          "Intelligence: who controls the systems that make decisions, generate content, and drive automation",
          "Ownership: who holds real assets — value stores, property, IP — in a world where digital scarcity becomes technically enforceable",
        ],
      },
      {
        type: "p",
        text: "Most people have focused entirely on the infrastructure layer — who builds the chips, who trains the models, who wins the cloud wars. Those are important questions. But they're not the only questions.",
      },
      {
        type: "h2",
        text: "Where the Opportunity Lives",
      },
      {
        type: "callout",
        label: "The Pattern",
        text: "The most accessible opportunity in this transition isn't building foundation models or winning the infrastructure race. It's understanding how to use these tools — and helping others do the same.",
      },
      {
        type: "p",
        text: "The people who will benefit most from this shift are not necessarily the ones who build the technology. They are the ones who understand it earliest and position themselves accordingly. That's what Digital Wealth Transfer is documenting.",
      },
      {
        type: "h2",
        text: "What to Do With This",
      },
      {
        type: "p",
        text: "You don't need to become an engineer. You don't need to raise venture capital. You need to understand the pattern you're living inside, identify which layer of the transition is most relevant to your current work or business, and begin building the skills, systems, or assets that belong to where things are going — not where they've been.",
      },
      {
        type: "p",
        text: "That's the work. And it's available to anyone willing to look at what's actually happening.",
      },
    ],
  },

  // ─── 2 ────────────────────────────────────────────────────────────────────
  {
    slug: "building-ai-without-a-cs-degree",
    title: "What I Learned Building AI Systems Without a Computer Science Degree",
    subtitle: "The barrier to entry is lower than you've been told.",
    excerpt:
      "I built functional AI systems, automation workflows, and software products. I have no computer science degree. Here's what I actually learned about who can build with AI — and what actually matters.",
    category: "ai-economy",
    status: "published",
    date: "2026-06-05",
    author: { name: "Jonathan Cardona", title: "Founder, Digital Wealth Transfer" },
    readTime: 7,
    featured: false,
    tags: ["AI", "self-taught", "building", "education"],
    relatedSlugs: ["the-digital-shift-is-bigger-than-ai", "building-sovereign-os"],
    content: [
      {
        type: "p",
        text: "I built functional AI systems. I created automation workflows that run businesses. I've shipped software that real people use. I have no computer science degree.",
      },
      {
        type: "p",
        text: "This is not a flex. It's a data point — about what the barrier to entry actually is, and what most people are getting wrong about who can build with AI.",
      },
      {
        type: "h2",
        text: "How I Started",
      },
      {
        type: "p",
        text: "My background is sales, banking, and customer support. I spent years in roles where the job was understanding what someone needed, figuring out the most direct path to deliver it, and communicating clearly. None of that felt like preparation for building software. Looking back, it was all I needed.",
      },
      {
        type: "p",
        text: "I got interested in AI not as a technology enthusiast, but as someone looking for leverage. I was running systems manually — following up with customers, organizing information, writing content — and I kept thinking: this should be automated. The question was whether I could be the one to automate it.",
      },
      {
        type: "h2",
        text: "What I Discovered When I Started Building",
      },
      {
        type: "p",
        text: "The first thing I discovered is that large language models are remarkably good at translating intent into action if you know how to describe what you want. That's not a technical skill. That's a communication skill.",
      },
      {
        type: "pullquote",
        text: "The most important skill for building with AI isn't coding. It's knowing exactly what you want and being able to describe it with precision.",
      },
      {
        type: "p",
        text: "The second thing I discovered is that most real business problems don't require custom-trained models or complex infrastructure. They require clear thinking about what the problem actually is, what a good solution looks like, and how to string together existing tools in a sensible sequence.",
      },
      {
        type: "h2",
        text: "The Real Barriers",
      },
      {
        type: "p",
        text: "The barriers I encountered had nothing to do with programming knowledge. They were:",
      },
      {
        type: "ul",
        items: [
          "Not knowing what was already possible — so I kept trying to build things that existed",
          "Underestimating how much of software is just data management — inputs, transformations, outputs",
          "Overcomplicating the first version — shipping nothing because I was designing for scale before I had a single user",
          "Not having a specific problem to solve — exploring tools is useful, but nothing teaches you faster than needing to solve something real",
        ],
      },
      {
        type: "h2",
        text: "What Actually Matters",
      },
      {
        type: "p",
        text: "You need product sense more than technical knowledge. Product sense is the ability to look at a problem, define the simplest possible solution, and know when something is working well enough to ship.",
      },
      {
        type: "p",
        text: "You need persistence through confusion. Building with AI tools is often uncomfortable. Things break unexpectedly. Documentation is sparse or outdated. You spend an hour solving what turns out to be a typo. Getting comfortable being confused is the skill.",
      },
      {
        type: "callout",
        label: "The honest truth",
        text: "Stop waiting to feel ready. The best way to learn to build with AI is to have something you need to build. If you don't have a real problem, borrow one from someone who does.",
      },
      {
        type: "h2",
        text: "What This Means for Non-Technical People",
      },
      {
        type: "p",
        text: "The gap between people who build software and people who don't is closing faster than most of the software industry wants to acknowledge. That's uncomfortable for people who spent years acquiring technical credentials. It's very good news for everyone else.",
      },
      {
        type: "p",
        text: "AI tools are becoming interfaces that respond to intent, not just syntax. The person who knows what they want to build, and why, has never been more capable of actually building it.",
      },
      {
        type: "p",
        text: "I'm not saying credentials don't matter. I'm saying they matter less than they used to, in specific domains, and the trend is moving in one direction. Learn to use the tools. Build something real. Iterate. The technical barrier is lower than you think.",
      },
    ],
  },

  // ─── 3 ────────────────────────────────────────────────────────────────────
  {
    slug: "bitcoin-ownership-personal-sovereignty",
    title: "Bitcoin, Ownership, and the Future of Personal Sovereignty",
    subtitle: "This isn't about price. It's about what it means to actually own something.",
    excerpt:
      "Most Bitcoin writing either evangelizes or speculates. I'm interested in something else: the underlying question of what it means to own an asset in an increasingly digital world — and why that question matters more than most people realize.",
    category: "digital-assets",
    status: "published",
    date: "2026-05-28",
    author: { name: "Jonathan Cardona", title: "Founder, Digital Wealth Transfer" },
    readTime: 9,
    featured: false,
    tags: ["Bitcoin", "ownership", "sovereignty", "wealth"],
    relatedSlugs: ["the-digital-shift-is-bigger-than-ai", "the-next-workforce-revolution"],
    content: [
      {
        type: "p",
        text: "I want to be careful about how I write this, because most Bitcoin writing falls into one of two traps: technical evangelism that assumes everyone agrees Bitcoin is the only thing that matters, or investment advice that treats it like a speculative asset. Neither of those is what I'm interested in.",
      },
      {
        type: "p",
        text: "What I'm interested in is the underlying question: in an increasingly digital world, what does it mean to actually own something?",
      },
      {
        type: "h2",
        text: "The Ownership Problem",
      },
      {
        type: "p",
        text: "We have outsourced most of our financial life to institutions. Banks hold our money. Brokerages hold our investments. Payment networks intermediate every transaction. This feels normal because it has been normal for most of our lives.",
      },
      {
        type: "p",
        text: "But there is a meaningful difference between holding a claim on an asset and holding the asset. If you have money in a bank, you hold a claim. The bank holds the money. This distinction is usually invisible — until it isn't.",
      },
      {
        type: "pullquote",
        text: "The risk you don't see is still risk. It's just someone else's problem until it becomes yours.",
      },
      {
        type: "p",
        text: "History has a long record of institutions failing, governments inflating currencies, and custodians losing what they were supposed to protect. These aren't fringe events. They are periodic features of systems built on trust in intermediaries.",
      },
      {
        type: "h2",
        text: "What Bitcoin Actually Is",
      },
      {
        type: "p",
        text: "Bitcoin is a system for holding and transferring value without requiring a trusted intermediary. The technical innovation — the blockchain, the proof of work, the cryptographic keys — exists to solve one problem: how do you transfer something of value over a network, to someone you've never met, without needing a third party to verify it?",
      },
      {
        type: "blockquote",
        text: "Not your keys, not your coins.",
        attribution: "Bitcoin community maxim",
      },
      {
        type: "callout",
        label: "Self-custody defined",
        text: "Self-custody means you hold your own private keys. Not an exchange. Not a broker. You. This isn't a slogan — it's a technical description of how ownership works on this network. An exchange holding your Bitcoin is structurally identical to a bank holding your dollars.",
      },
      {
        type: "h2",
        text: "Sovereignty as a Practice",
      },
      {
        type: "p",
        text: "Holding Bitcoin in self-custody is not a political statement. It's a practical decision about who you trust and how much. It's the same decision you make when you choose whether to keep cash at home or deposit it with a bank — except the math is different and the counterparty risk is more explicit.",
      },
      {
        type: "p",
        text: "I think about Bitcoin the way I think about any sovereignty practice: you don't need to go to an extreme to benefit from the principle. The goal isn't to opt out of all institutions forever. The goal is to understand what you control and what you don't, and make deliberate choices about the tradeoff.",
      },
      {
        type: "h2",
        text: "Where This Goes",
      },
      {
        type: "p",
        text: "The broader question Bitcoin raises — how do we create enforceable digital scarcity and real ownership of digital assets — is one that the entire financial and technological world is working through. NFTs were a chaotic early experiment. Tokenized real-world assets are a more serious one. Central bank digital currencies are the government's answer to a question only some people were asking.",
      },
      {
        type: "p",
        text: "Whatever comes next, the underlying question of digital ownership is not going away. Bitcoin is the clearest current answer to that question — imperfect, early, but honest about what it is.",
      },
      {
        type: "p",
        text: "The people who understand this transition earliest will be the ones best positioned when it resolves. That's not investment advice. It's a pattern I see in every major technological shift.",
      },
    ],
  },

  // ─── 4 ────────────────────────────────────────────────────────────────────
  {
    slug: "building-sovereign-os",
    title: "Building Sovereign OS: Why I Needed a Personal Intelligence System",
    subtitle: "Most tools weren't built for the way I think. So I built my own.",
    excerpt:
      "I spend a significant part of every day using tools that were not designed for me. Sovereign OS came out of frustration with that — and a question I kept coming back to: if AI can do almost anything with the right context, why do I still operate like it's 2015?",
    category: "ai-economy",
    status: "published",
    date: "2026-05-20",
    author: { name: "Jonathan Cardona", title: "Founder, Digital Wealth Transfer" },
    readTime: 8,
    featured: false,
    tags: ["Sovereign OS", "productivity", "AI", "tools", "building"],
    relatedSlugs: ["building-ai-without-a-cs-degree", "the-digital-shift-is-bigger-than-ai"],
    content: [
      {
        type: "p",
        text: "I spend a significant part of every day using tools that were not designed for me. They were designed for a generic user — or for a specific enterprise customer — or for a venture capitalist's vision of what knowledge work should look like. Very few of them were built around my actual life.",
      },
      {
        type: "p",
        text: "Sovereign OS came out of frustration with that, and a question I kept coming back to: if AI can do almost anything with the right context, why do I still operate like it's 2015?",
      },
      {
        type: "h2",
        text: "The Problem I Was Trying to Solve",
      },
      {
        type: "p",
        text: "My workflow was fragmented across too many applications. Notes in one place, tasks in another, market data in a third, content ideas scattered across voice memos and text files. Every morning I spent time re-establishing context — what was I working on, what was the priority, what did I need to track?",
      },
      {
        type: "p",
        text: "That time is not nothing. And more importantly, the cognitive cost of holding too much in your head is real. Every system you have to manually check is a drain on the attention you could be using to think.",
      },
      {
        type: "pullquote",
        text: "The goal is not to build an app. It's to build a system that thinks with you instead of requiring you to think about it.",
      },
      {
        type: "h2",
        text: "What I Tried First",
      },
      {
        type: "p",
        text: "I tried the obvious things. Notion. Obsidian. Linear. Various AI writing tools. Productivity systems with elaborate tagging structures. Each one solved a piece of the problem and created new ones.",
      },
      {
        type: "p",
        text: "The issue wasn't any individual tool. The issue was that no tool was designed to be the connective layer between all of them — to hold context across domains, to surface what was relevant when it was relevant, and to help me think rather than just store.",
      },
      {
        type: "h2",
        text: "What I'm Building",
      },
      {
        type: "p",
        text: "Sovereign OS is a personal intelligence operating system. Currently it lives as a private web application. It has a Bitcoin price tracker, a Pomodoro timer, a habit tracker, an AI assistant with context about my work and goals, and a content analysis engine that helps me identify what's worth writing about.",
      },
      {
        type: "callout",
        label: "The philosophy",
        text: "You should own your tools the way you own your home, not rent them the way you rent an apartment. Every subscription is a vote for someone else's priorities over yours.",
      },
      {
        type: "p",
        text: "None of these features are remarkable individually. What makes them useful together is that they're in one place, designed around my actual workflow, and don't require a subscription to a company I don't control.",
      },
      {
        type: "h2",
        text: "Why This Connects to DWT",
      },
      {
        type: "p",
        text: "Sovereign OS started as a personal project. It's becoming the infrastructure layer for Digital Wealth Transfer's content operation. The Content Engine module — which I'm actively building — will allow me to research, draft, review, and publish directly from within the system.",
      },
      {
        type: "p",
        text: "Eventually, content created in Sovereign OS will automatically flow to DWT. Research, drafts, editing — all inside a system I own. Publication — on a platform I control.",
      },
      {
        type: "p",
        text: "I'm documenting this build as part of the DWT narrative because I think the tools you use to think and create are as important as what you think and create. Sovereignty starts with your tools.",
      },
    ],
  },

  // ─── 5 ────────────────────────────────────────────────────────────────────
  {
    slug: "the-next-workforce-revolution",
    title: "The Next Workforce Revolution Is Already Here",
    subtitle: "It's not about more jobs or fewer jobs. It's about which side of the shift you're on.",
    excerpt:
      "The conversation about AI and work has settled into two predictable camps — both making the same error. The real question isn't how many jobs AI will eliminate. It's what kind of work survives, what kind emerges, and how fast the window to adapt is closing.",
    category: "opportunities",
    status: "published",
    date: "2026-05-12",
    author: { name: "Jonathan Cardona", title: "Founder, Digital Wealth Transfer" },
    readTime: 8,
    featured: false,
    tags: ["workforce", "automation", "AI", "opportunity", "adaptation"],
    relatedSlugs: ["the-digital-shift-is-bigger-than-ai", "building-ai-without-a-cs-degree"],
    content: [
      {
        type: "p",
        text: "The conversation about AI and work has settled into two predictable camps. One says AI will eliminate most jobs within a decade. The other says technology has always created more jobs than it destroyed, so relax.",
      },
      {
        type: "p",
        text: "Both camps are making the same error: they're treating this as a simple quantity question — more jobs or fewer jobs — when the real question is a quality question. What kind of work survives, what kind emerges, and what gets automated away?",
      },
      {
        type: "h2",
        text: "What's Actually Happening",
      },
      {
        type: "p",
        text: "Most of what I see happening isn't mass elimination. It's compression. Tasks that took two hours now take twenty minutes. Work that required a team of five can be done by a team of two with the right tools. The output per person is increasing — which means you need fewer people to produce the same result.",
      },
      {
        type: "p",
        text: "That's not automation replacing humans. That's automation amplifying some humans and making others redundant. The difference matters enormously for how you think about your own position.",
      },
      {
        type: "pullquote",
        text: "The question is not whether AI will take your job. The question is whether someone using AI will do your job better than you — and what you're doing about that.",
      },
      {
        type: "h2",
        text: "The Three Categories of Change",
      },
      {
        type: "p",
        text: "Based on what I'm observing across industries, work is splitting into three categories:",
      },
      {
        type: "ul",
        items: [
          "Automated: routine cognitive work that follows clear patterns — data entry, standard documents, templated communications, basic analysis. This is going away fast.",
          "Augmented: judgment-heavy work where AI dramatically increases the output of skilled humans — writing, design, analysis, strategy, sales, customer relationships. This is where most of the opportunity is.",
          "Insulated: work that requires physical presence, human trust, or real-world context that AI can't currently replicate — caregiving, skilled trades, leadership, entrepreneurship. More durable than people expect.",
        ],
      },
      {
        type: "h2",
        text: "What This Means for Where You Are Now",
      },
      {
        type: "p",
        text: "If your work falls in the first category, the timeline is short. Not years — months. The question is what skills you are building toward the second or third category.",
      },
      {
        type: "p",
        text: "If your work is in the second category, the opportunity is significant. Learning to use AI tools effectively in your domain is the highest-leverage investment you can make right now. The person who can produce what a team of five produced — and at higher quality — has an economic position that is very different from a year ago.",
      },
      {
        type: "callout",
        label: "The window",
        text: "The window to be an early adopter in your field is closing. Early mover advantage in AI-augmented work is real and it's compressing fast. The people who adapted in 2024 and 2025 have a meaningful head start on the people who are still deciding whether this is real.",
      },
      {
        type: "h2",
        text: "What I'm Paying Attention To",
      },
      {
        type: "p",
        text: "The most interesting developments aren't in the foundation model space — it's in how AI gets applied to specific domains. Legal research. Medical documentation. Financial analysis. Content production. Customer communication. In each of these domains, a small number of early adopters are building a productivity advantage that will be very difficult to close.",
      },
      {
        type: "h2",
        text: "The Bottom Line",
      },
      {
        type: "p",
        text: "This is not a call to panic. It's a call to look clearly at what's happening and make deliberate choices about where you want to be positioned when this phase of the transition resolves.",
      },
      {
        type: "p",
        text: "The workforce revolution isn't coming. It's here. The only question is which side of it you're on.",
      },
    ],
  },
];

// ─── Data access (called by lib/content.ts adapter) ──────────────────────────

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return articles.filter((a) => a.category === category && a.status === "published");
}

// Re-exports for category pages and CategoryPage component
export { ARTICLE_CATEGORY_LABELS } from "@/lib/types";
export type { ArticleCategory } from "@/lib/types";

export const ALL_ARTICLE_CATEGORIES: ArticleCategory[] = [
  "ai-economy",
  "digital-assets",
  "financial-shift",
  "opportunities",
];
