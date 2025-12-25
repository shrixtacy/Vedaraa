import { ReactNode } from "react";
import { useLenis } from "@/hooks/useLenis";

interface SmoothScrollProps {
    children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
    useLenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    return <>{children}</>;
};

export default SmoothScroll;
