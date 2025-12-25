import { motion } from "framer-motion";

interface TextMarqueeProps {
    text: string;
}

const TextMarquee = ({ text }: TextMarqueeProps) => {
    return (
        <div className="relative flex overflow-hidden py-12 bg-foreground text-background border-t border-b border-background/20 select-none">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
                <span className="text-[10vw] font-bold font-heading uppercase tracking-tighter mr-12 opacity-90">
                    {text} - {text} - {text} - {text}
                </span>
                <span className="text-[10vw] font-bold font-heading uppercase tracking-tighter mr-12 opacity-90">
                    {text} - {text} - {text} - {text}
                </span>
            </motion.div>
        </div>
    );
};

export default TextMarquee;
