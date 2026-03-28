import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, RefreshCw } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface Message {
    id: string;
    type: "bot" | "user";
    text: string;
    options?: string[];
    timestamp: Date;
}

type ChatStep =
    | "INITIAL"
    | "COLLECTING_NAME"
    | "COLLECTING_SERVICE"
    | "COLLECTING_PLATFORM"
    | "COLLECTING_WEBSITE_TYPE"
    | "COLLECTING_PROJECT_DETAILS"
    | "COLLECTING_TIMELINE"
    | "COLLECTING_EMAIL"
    | "COLLECTING_PHONE"
    | "THANK_YOU";

// ─────────────────────────────────────────────
// KNOWLEDGE BASE
// ─────────────────────────────────────────────
const SERVICES = [
    "Build a new website",
    "Redesign an existing website",
    "Branding / Logo design",
    "Improve SEO",
    "Hosting or maintenance",
    "Something else"
];
const PLATFORMS = ["Custom Coding", "WordPress", "Not sure yet"];
const WEBSITE_TYPES = [
    "Business website",
    "E-commerce store",
    "Portfolio / personal website",
    "Landing page",
    "Something else"
];
const TIMELINES = ["As soon as possible", "Within 1 month", "Just exploring options"];

const GREETINGS = ["hi", "hello", "hey", "yo", "good morning", "good evening", "hii", "helo", "greeting"];

const QUESTION_SIGNALS = ["how", "what", "when", "do you", "can you", "is there", "are you", "cost", "price", "much", "long"];
const SERVICE_SIGNALS = [
    "need a website", "need website", "want a website", "build a website", "build my website",
    "need seo", "need logo", "want logo", "want branding", "need branding",
    "redesign", "need hosting", "my site is slow", "my site looks", "my website is"
];
const COMPLEX_SIGNALS = ["integrate", "crm", "dashboard", "custom app", "api", "database", "automation", "payment gateway"];

const detectPlatform = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes("wordpress") || q.includes("wp ") || q.includes(" wp") || q.includes("elementor")) return "WordPress";
    if (q.includes("custom") || q.includes("code") || q.includes("coding") || q.includes("react") || q.includes("next")) return "Custom Coding";
    if (q.includes("not sure") || q.includes("not sure yet") || q.includes("dont know") || q.includes("don't know")) return "Not sure yet";
    return "";
};

const detectWebsiteType = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes("ecommerce") || q.includes("e-commerce") || q.includes("store") || q.includes("shop")) return "E-commerce store";
    if (q.includes("portfolio") || q.includes("personal")) return "Portfolio / personal website";
    if (q.includes("landing")) return "Landing page";
    if (q.includes("business") || q.includes("company") || q.includes("agency") || q.includes("restaurant") || q.includes("clinic") || q.includes("salon")) return "Business website";
    return "";
};

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const classifyMessage = (query: string): "greeting" | "question" | "service" | "name" | "complex" | "unclear" => {
    const q = query.toLowerCase().trim();
    if (GREETINGS.some(g => q === g || q.startsWith(g + " "))) return "greeting";
    if (COMPLEX_SIGNALS.some(s => q.includes(s))) return "complex";
    if (QUESTION_SIGNALS.some(s => q.includes(s))) return "question";
    if (SERVICE_SIGNALS.some(s => q.includes(s))) return "service";

    const wordCount = query.trim().split(/\s+/).length;
    // Names are usually 1-2 words, no numbers, and not in our signal lists
    if (wordCount <= 2 && /^[A-Za-z\s'-]+$/.test(query)) return "name";

    return "unclear";
};

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ─────────────────────────────────────────────
// ORB COMPONENT
// ─────────────────────────────────────────────
const ChatOrb = ({ onClick }: { onClick: () => void }) => {
    return (
        <img 
            src="/ai-image.png" 
            alt="AI Assistant" 
            className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[60] w-24 h-24 sm:w-28 sm:h-28 cursor-pointer object-cover"
            onClick={onClick}
        />
    );
};

// ─────────────────────────────────────────────
// CHATBOT COMPONENT
// ─────────────────────────────────────────────
export const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [step, setStep] = useState<ChatStep>("INITIAL");
    const [userInput, setUserInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [lead, setLead] = useState({
        name: "", service: "", platform: "", websiteType: "", projectDetails: "", timeline: "", email: "", phone: ""
    });

    // Keeps the latest inferred selections immediately (avoids 1-render lag from React state updates)
    const pendingSelectionsRef = useRef<{ service: string; platform: string; websiteType: string }>({
        service: "",
        platform: "",
        websiteType: ""
    });

    const FAQ_MAP = [
        {
            keywords: ["how much", "cost", "price", "budget", "quote", "charge"],
            answer: "Website pricing depends on the features and complexity of the project.\n\nSimple business websites are faster and more affordable to build, while advanced custom projects require more customization."
        },
        {
            keywords: ["how long", "time", "duration", "take", "fast", "quick"],
            answer: "Most websites are completed within 1–4 weeks depending on the project scope. Branding projects usually take about 1 week."
        },
        {
            keywords: ["wordpress", "shopify", "wix", "squarespace"],
            answer: "Yes, we work with WordPress and other popular platforms. We can redesign or rebuild sites on these platforms as well."
        },
        {
            keywords: ["hosting", "server", "domain", "maintenance", "uptime"],
            answer: "Yes, we offer premium hosting and ongoing maintenance packages to keep your site fast, secure, and always online."
        },
        {
            keywords: ["ecommerce", "shop", "store", "sell", "online store", "product"],
            answer: "Absolutely! We build ecommerce websites with full online store functionality, including payment integration, product listings, and order management."
        },
        {
            keywords: ["seo", "search engine", "google ranking", "traffic", "keywords"],
            answer: "Our SEO service includes keyword research, on-page optimization, technical SEO, and monthly reporting to help your business rank higher on Google."
        },
        {
            keywords: ["logo", "branding", "identity", "design", "brand"],
            answer: "Our branding service covers logo design, brand colors, typography, and a complete visual identity system for your business."
        },
        {
            keywords: ["support", "after launch", "help", "contact"],
            answer: "We provide post-launch support and maintenance to address any issues and keep your digital assets running smoothly."
        },
        {
            keywords: ["your name", "who are you", "what are you", "who is zyra", "what is zyra"],
            answer: "I'm Zyra, the digital assistant for Zyra Digitals. I help visitors learn about our services and connect them with our expert team!"
        },
        {
            keywords: ["what do you do", "can you help", "what services"],
            answer: "I can help you with website development, redesigns, branding, SEO, and hosting. I'm also here to answer any questions you have about our agency!"
        },
        {
            keywords: ["tell my name", "what is my name", "whats my name", "do you know my name"],
            answer: lead.name ? `Your name is ${lead.name}! How can I help you further?` : "I don't think you've shared your name yet. What should I call you?"
        }
    ];

    const matchFAQ = (q: string) => FAQ_MAP.find(f => f.keywords.some(k => q.toLowerCase().includes(k))) ?? null;

    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    // Open chat
    useEffect(() => {
        if (isOpen && messages.length === 0) startSession();
    }, [isOpen]);

    const addMsg = (msg: Omit<Message, "id" | "timestamp">) =>
        setMessages(prev => [...prev, { ...msg, id: Math.random().toString(36).slice(2), timestamp: new Date() }]);

    const botSay = (text: string, options?: string[], delay = 700) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            addMsg({ type: "bot", text, options });
        }, delay);
    };

    const startSession = () => {
        setMessages([]);
        setLead({ name: "", service: "", platform: "", websiteType: "", projectDetails: "", timeline: "", email: "", phone: "" });
        pendingSelectionsRef.current = { service: "", platform: "", websiteType: "" };
        setStep("INITIAL");
        botSay(
            "Hello 👋\nI'm Zyra, the digital assistant from Zyra Digitals.\n\nYou can ask me about our services or start by sharing your name 🙂"
        );
    };

    const askNextAfterFAQ = (delay = 800) => {
        setTimeout(() => resumeStep(), delay);
    };

    const resumeStep = () => {
        switch (step) {
            case "INITIAL":
            case "COLLECTING_NAME":
                botSay("By the way, may I know your **name** so I can assist you better?");
                setStep("COLLECTING_NAME");
                break;
            case "COLLECTING_SERVICE":
                {
                    const knownService = lead.service || pendingSelectionsRef.current.service;
                    if (knownService) {
                        // If we already inferred the service earlier, move forward instead of asking again.
                        if (knownService === "Build a new website" || knownService === "Redesign an existing website") {
                            setStep("COLLECTING_PLATFORM");
                            botSay("What development platform do you prefer?", PLATFORMS);
                        } else {
                            setStep("COLLECTING_PROJECT_DETAILS");
                            botSay("Could you describe your project or business briefly?");
                        }
                        break;
                    }

                    botSay("What would you like help with today?", SERVICES);
                    break;
                }
            case "COLLECTING_PLATFORM":
                {
                    const knownPlatform = lead.platform || pendingSelectionsRef.current.platform;
                    if (knownPlatform) {
                        setStep("COLLECTING_WEBSITE_TYPE");
                        botSay("What type of website are you planning to build?", WEBSITE_TYPES);
                        break;
                    }
                    botSay("What development platform do you prefer?", PLATFORMS);
                    break;
                }
            case "COLLECTING_WEBSITE_TYPE":
                {
                    const knownWebsiteType = lead.websiteType || pendingSelectionsRef.current.websiteType;
                    if (knownWebsiteType) {
                        setStep("COLLECTING_PROJECT_DETAILS");
                        botSay("Could you describe your project or business briefly?");
                        break;
                    }
                    botSay("What type of website are you planning to build?", WEBSITE_TYPES);
                    break;
                }
            case "COLLECTING_PROJECT_DETAILS":
                botSay("Could you describe your project or business briefly?");
                break;
            case "COLLECTING_TIMELINE":
                botSay("What timeline are you working with?", TIMELINES);
                break;
            case "COLLECTING_EMAIL":
                botSay("Where should we send your project details or quote?\nPlease enter your email address.");
                break;
            case "COLLECTING_PHONE":
                botSay("Would you like to share a phone number so our team can contact you faster?\n(You can skip this if you prefer.)", ["Skip"]);
                break;
        }
    };

    const handleOptionClick = (option: string) => {
        addMsg({ type: "user", text: option });
        processQuery(option);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim()) return;
        const text = userInput.trim();
        setUserInput("");
        addMsg({ type: "user", text });
        processQuery(text);
    };

    const processQuery = (query: string) => {
        const q = query.toLowerCase();
        const faq = matchFAQ(q);
        const msgType = classifyMessage(query);

        // ── Step-specific option handling should run before FAQ intercept ─────────
        if (step === "COLLECTING_PLATFORM") {
            const platform = PLATFORMS.includes(query) ? query : detectPlatform(query);
            if (platform) {
                pendingSelectionsRef.current.platform = platform;
                setLead(prev => ({ ...prev, platform }));
                setStep("COLLECTING_WEBSITE_TYPE");
                botSay(
                    platform === "WordPress"
                        ? "Great choice 👍\nWordPress is a flexible platform for many types of websites.\n\nWhat type of website are you planning to build?"
                        : "Got it.\n\nWhat type of website are you planning to build?",
                    WEBSITE_TYPES
                );
                return;
            }
        }

        if (step === "COLLECTING_WEBSITE_TYPE") {
            const websiteType = WEBSITE_TYPES.includes(query) ? query : detectWebsiteType(query);
            if (websiteType) {
                pendingSelectionsRef.current.websiteType = websiteType;
                setLead(prev => ({ ...prev, websiteType }));
                setStep("COLLECTING_PROJECT_DETAILS");
                botSay("Nice!\nCould you briefly describe your business or project?");
                return;
            }
        }

        // ── Contact info collection steps (strict) ────────────────────────────────
        if (step === "COLLECTING_EMAIL") {
            if (!isValidEmail(query)) {
                botSay("⚠️ That doesn't look like a valid email address.\n\nExample: name@email.com\n\nCould you please enter your email again?");
                return;
            }
            setLead(prev => ({ ...prev, email: query }));
            setStep("COLLECTING_PHONE");
            botSay("Would you like to share a phone number so our team can contact you faster?\n(You can skip this if you prefer.)", ["Skip"]);
            return;
        }

        if (step === "COLLECTING_PHONE") {
            const phone = q === "skip" ? "" : query;
            setLead(prev => ({ ...prev, phone }));
            finishLead(phone);
            return;
        }

        // ── FAQ intercept (available at any step) ────────────────────────────────
        if (faq) {
            botSay(faq.answer);
            askNextAfterFAQ(900);
            return;
        }

        // ── Complex technical question ────────────────────────────────────────────
        if (msgType === "complex") {
            botSay("That looks like a more specific requirement.\nOur team would be happy to review it and provide the best solution.\n\nCould you share your email so one of our specialists can contact you?");
            setStep("COLLECTING_EMAIL");
            return;
        }

        // ── INITIAL step — flexible entry ─────────────────────────────────────────
        if (step === "INITIAL" || step === "COLLECTING_NAME") {
            if (msgType === "greeting") {
                botSay("Hello! 😊\nI'm Zyra, the digital assistant from Zyra Digitals.\nMay I know your name so I can assist you better?");
                setStep("COLLECTING_NAME");
                return;
            }

            if (msgType === "service") {
                let service = "";
                if (q.includes("website") && q.includes("redesign")) service = "Redesign an existing website";
                else if (q.includes("website") || q.includes("web")) service = "Build a new website";
                else if (q.includes("logo") || q.includes("brand")) service = "Branding / Logo design";
                else if (q.includes("seo")) service = "Improve SEO";
                else if (q.includes("hosting") || q.includes("maintenance")) service = "Hosting or maintenance";

                if (service) {
                    pendingSelectionsRef.current.service = service;
                    const inferredPlatform = detectPlatform(query);
                    if (inferredPlatform) pendingSelectionsRef.current.platform = inferredPlatform;
                    const inferredWebsiteType = detectWebsiteType(query);
                    if (inferredWebsiteType) pendingSelectionsRef.current.websiteType = inferredWebsiteType;

                    setLead(prev => ({
                        ...prev,
                        service,
                        platform: prev.platform || inferredPlatform,
                        websiteType: prev.websiteType || inferredWebsiteType
                    }));
                }
                botSay("That sounds great! We'd be happy to help with that.\n\nBefore we continue, may I know your name?");
                setStep("COLLECTING_NAME");
                return;
            }

            if (msgType === "name") {
                const name = query.trim();
                setLead(prev => ({ ...prev, name }));

                // If service was inferred earlier (user started with "I need a website..."), skip asking again.
                const knownService = lead.service || pendingSelectionsRef.current.service;
                const knownPlatform = lead.platform || pendingSelectionsRef.current.platform;
                const knownWebsiteType = lead.websiteType || pendingSelectionsRef.current.websiteType;

                if (knownService) {
                    if (knownService === "Build a new website" || knownService === "Redesign an existing website") {
                        if (knownPlatform) {
                            if (knownWebsiteType) {
                                setStep("COLLECTING_PROJECT_DETAILS");
                                botSay(`Nice to meet you ${name} 🙂\n\nCould you briefly describe your business or project?`);
                                return;
                            }

                            setStep("COLLECTING_WEBSITE_TYPE");
                            botSay(`Nice to meet you ${name} 🙂\n\nWhat type of website are you planning to build?`, WEBSITE_TYPES);
                            return;
                        }
                        setStep("COLLECTING_PLATFORM");
                        botSay(`Nice to meet you ${name} 🙂\n\nWhat development platform do you prefer?`, PLATFORMS);
                    } else {
                        if (knownWebsiteType) {
                            setStep("COLLECTING_PROJECT_DETAILS");
                            botSay(`Nice to meet you ${name} 🙂\n\nCould you briefly describe your business or project?`);
                            return;
                        }
                        setStep("COLLECTING_PROJECT_DETAILS");
                        botSay(`Nice to meet you ${name} 🙂\n\nCould you briefly describe your project or business?`);
                    }
                    return;
                }

                setStep("COLLECTING_SERVICE");
                botSay(`Nice to meet you ${name} 🙂\n\nWhat would you like help with today?`, SERVICES);
                return;
            }

            // Fallback for unclear initial input
            if (step === "COLLECTING_NAME") {
                botSay("I don't think you've shared your name yet.\nWhat should I call you?");
            } else {
                botSay("I may not have fully understood that.\n\nAre you looking to build a new website, redesign your current one, improve SEO, or create branding?", SERVICES);
                setStep("COLLECTING_NAME");
            }
            return;
        }

        // ── Mid-flow steps ────────────────────────────────────────────────────────
        switch (step) {
            case "COLLECTING_SERVICE":
                handleServiceSelection(query);
                break;

            case "COLLECTING_PROJECT_DETAILS":
                setLead(prev => ({ ...prev, projectDetails: query }));
                setStep("COLLECTING_TIMELINE");
                botSay("Thanks for sharing that.\n\nOur team can definitely help with that. What timeline are you planning for this project?", TIMELINES);
                break;

            case "COLLECTING_TIMELINE":
                setLead(prev => ({ ...prev, timeline: query }));
                setStep("COLLECTING_EMAIL");
                botSay("Where should we send your project details or quote?\nPlease enter your email address.");
                break;

            default:
                botSay("I'm not sure I fully understood. Are you looking to build, redesign, brand, or something else?", SERVICES);
        }
    };

    const handleServiceSelection = (query: string) => {
        const q = query.toLowerCase();
        let service = "";

        if (q.includes("build") || q.includes("new website")) service = "Build a new website";
        else if (q.includes("redesign") || q.includes("existing")) service = "Redesign an existing website";
        else if (q.includes("branding") || q.includes("logo")) service = "Branding / Logo design";
        else if (q.includes("seo")) service = "Improve SEO";
        else if (q.includes("hosting") || q.includes("maintenance")) service = "Hosting or maintenance";
        else if (q.includes("something") || q.includes("else") || q.includes("other")) service = "Something else";
        else service = query;

        pendingSelectionsRef.current.service = service;
        setLead(prev => ({ ...prev, service }));

        if (service === "Build a new website" || service === "Redesign an existing website") {
            const inferredPlatform = detectPlatform(query);
            if (inferredPlatform) {
                pendingSelectionsRef.current.platform = inferredPlatform;
                setLead(prev => ({ ...prev, platform: inferredPlatform }));
                setStep("COLLECTING_WEBSITE_TYPE");
                botSay(
                    inferredPlatform === "WordPress"
                        ? "Great choice 👍\nWordPress is a flexible platform for many types of websites.\n\nWhat type of website are you planning to build?"
                        : "Got it.\n\nWhat type of website are you planning to build?",
                    WEBSITE_TYPES
                );
                return;
            }

            setStep("COLLECTING_PLATFORM");
            botSay(`Great! We specialize in high-performance websites that convert visitors into clients.\n\nWhat development platform do you prefer?`, PLATFORMS);
        } else {
            setStep("COLLECTING_PROJECT_DETAILS");
            botSay("Great choice!\n\nCould you briefly describe your project or business?");
        }
    };

    const finishLead = async (phone: string) => {
        const finalLead = { ...lead, phone };
        try {
            const messageContent = [
                `Service: ${finalLead.service}`,
                finalLead.platform && `Platform: ${finalLead.platform}`,
                finalLead.websiteType && `Website Type: ${finalLead.websiteType}`,
                `Timeline: ${finalLead.timeline}`,
                `Project: ${finalLead.projectDetails}`,
                `Email: ${finalLead.email}`,
                `Phone: ${finalLead.phone || "N/A"}`
            ].filter(Boolean).join("\n");

            await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: finalLead.name,
                    email: finalLead.email || "chatbot@zyradigitals.com",
                    message: messageContent,
                    isChatbot: true
                })
            });
        } catch (err) {
            console.error("Lead submission error:", err);
        }

        setStep("THANK_YOU");
        botSay("Perfect 👍\n\nThank you for sharing your details.\nOur team will review your request and contact you shortly.\n\nThank you for reaching out to Zyra Digitals.\nWe're excited to help with your project! 🚀");

        setTimeout(() => startSession(), 7000);
    };

    return (
        <>
            {/* Orb */}
            {!isOpen && <ChatOrb onClick={() => setIsOpen(true)} />}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.94 }}
                        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 w-[calc(100vw-32px)] sm:w-[360px] h-[520px] sm:h-[600px] max-h-[85vh] bg-white border border-gray-100 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.28)] overflow-hidden flex flex-col font-sans"
                    >
                        {/* Header */}
                        <div className="bg-[#B8860B] px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <img 
                                    src="/ai-image.png" 
                                    alt="AI Assistant" 
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="text-white font-bold text-[15px] sm:text-[17px] leading-none">Zyra</h3>
                                    <p className="text-white/70 text-[10px] sm:text-[11px] mt-0.5">Digital Assistant · Online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <button onClick={startSession} className="text-white/75 hover:text-white transition-colors" title="New chat">
                                    <RefreshCw size={15} className="sm:w-[17px] sm:h-[17px]" />
                                </button>
                                <button onClick={() => setIsOpen(false)} className="text-white/75 hover:text-white transition-colors" title="Close">
                                    <X size={20} className="sm:w-[22px] sm:h-[22px]" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-grow overflow-y-auto px-4 py-5 space-y-5 bg-white scrollbar-hide">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex flex-col gap-2 max-w-[88%]",
                                        msg.type === "user" ? "ml-auto items-end" : "mr-auto items-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "px-3.5 py-2.5 sm:px-4 sm:py-3.5 rounded-[1.2rem] sm:rounded-[1.4rem] text-[13px] sm:text-[14px] leading-[1.5] sm:leading-[1.55] whitespace-pre-wrap shadow-sm",
                                            msg.type === "user"
                                                ? "bg-[#B8860B] text-white rounded-tr-sm"
                                                : "bg-[#F3F4F6] text-[#1F2937] rounded-tl-sm"
                                        )}
                                    >
                                        {msg.text}
                                    </div>
                                    {msg.options && (
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {msg.options.map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => handleOptionClick(opt)}
                                                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white border border-gray-200 rounded-[0.8rem] sm:rounded-[0.9rem] text-[11.5px] sm:text-[12.5px] font-medium text-gray-600 hover:border-[#B8860B] hover:text-[#B8860B] active:scale-95 transition-all duration-200 shadow-sm"
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <div className="mr-auto">
                                    <div className="bg-[#F3F4F6] px-4 py-3.5 rounded-[1.4rem] rounded-tl-sm flex gap-1.5 shadow-sm w-fit">
                                        {[0, 1, 2].map(i => (
                                            <motion.div
                                                key={i}
                                                animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.18 }}
                                                className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="px-4 pb-5 pt-2 bg-white shrink-0 border-t border-gray-50">
                            <form
                                onSubmit={handleSubmit}
                                className="flex items-center bg-white rounded-[1.2rem] border border-gray-200 px-4 py-1 shadow-sm focus-within:border-[#B8860B] focus-within:ring-1 focus-within:ring-[#B8860B]/20 transition-all"
                            >
                                <Input
                                    value={userInput}
                                    onChange={e => setUserInput(e.target.value)}
                                    placeholder="Type a message..."
                                    className="border-none bg-transparent focus-visible:ring-0 text-[14px] h-11 flex-grow p-0 placeholder:text-gray-400"
                                />
                                <button
                                    type="submit"
                                    disabled={!userInput.trim()}
                                    className="ml-2 p-1.5 text-[#B8860B] disabled:text-gray-300 transition-colors"
                                >
                                    <Send size={22} strokeWidth={2} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
