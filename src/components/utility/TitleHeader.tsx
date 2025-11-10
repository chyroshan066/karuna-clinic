import { cn } from "@/utils/clsx";
import { memo } from "react";

interface TitleHeader {
    title?: string;
    subTitle1: string;
    subTitle2?: string;
    className?: string;
}

export const TitleHeader = memo(({
    title, subTitle1, subTitle2, className
}: TitleHeader) => (
    <>
        {title && <p className={cn("section-subtitle text-center", className)}>{title}</p>}
        <h2 className={cn("h2 section-title text-center title-header", className)}>
            {subTitle1} {subTitle2 && <><br /> {subTitle2}</>}
        </h2>
    </>
));

TitleHeader.displayName = "TitleHeader";