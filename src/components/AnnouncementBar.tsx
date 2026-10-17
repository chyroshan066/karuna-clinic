"use client";

import { memo, useEffect, useRef, useState } from "react";
import { IonIcon } from "./utility/IonIcon";

const STORAGE_KEY = "karuna-absence-notice-dismissed";

/**
 * Optional: auto-hide the notice after Dr. Karuna returns.
 * Use an ISO date, e.g. "2026-10-07T23:59:59+05:45" (Nepal time).
 * Leave as null to keep it visible until you remove the component.
 */
const NOTICE_END_DATE: string | null = null;
// const NOTICE_END_DATE: string | null = "2026-10-07T23:59:59+05:45";

export const AnnouncementBar = memo(() => {
    // Visible by default so there is no layout shift on first paint;
    // hidden in the effect below if the visitor already dismissed it.
    const [isVisible, setIsVisible] = useState(true);
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (NOTICE_END_DATE && Date.now() > new Date(NOTICE_END_DATE).getTime()) {
            setIsVisible(false);
            return;
        }
        try {
            if (sessionStorage.getItem(STORAGE_KEY) === "true") {
                setIsVisible(false);
            }
        } catch {
            /* storage unavailable (private mode etc.) – just show the bar */
        }
    }, []);

    // Publish the bar's height as --announcement-h so the fixed (scrolled)
    // header can sit directly beneath it. Resets to 0 when the bar closes.
    useEffect(() => {
        const root = document.documentElement;
        const bar = barRef.current;
        if (!isVisible || !bar) {
            root.style.setProperty("--announcement-h", "0px");
            return;
        }
        const update = () =>
            root.style.setProperty("--announcement-h", `${bar.offsetHeight}px`);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(bar);
        return () => {
            observer.disconnect();
            root.style.setProperty("--announcement-h", "0px");
        };
    }, [isVisible]);

    const dismiss = () => {
        setIsVisible(false);
        try {
            sessionStorage.setItem(STORAGE_KEY, "true");
        } catch {
            /* ignore */
        }
    };

    if (!isVisible) return null;

    return (
        <div
            ref={barRef}
            className="announcement-bar"
            role="region"
            aria-label="Clinic notice"
        >
            <div className="custom-container announcement-inner">
                <IonIcon
                    name="information-circle-outline"
                    aria-hidden="true"
                    className="announcement-icon"
                />

                {/* Fixed label – never moves */}
                <strong className="announcement-label">Notice:</strong>

                {/* Scrolling message. The text is rendered twice so the loop is
                    seamless (the track slides by exactly one copy's width).
                    The second copy is hidden from screen readers and the tab order. */}
                <div className="announcement-marquee">
                    <div className="announcement-track">
                        {[0, 1].map((copy) => (
                            <p
                                key={copy}
                                className="announcement-text"
                                aria-hidden={copy === 1 ? true : undefined}
                            >
                                Our clinic will remain closed for the Dashain holidays until Purnima (Kartik 8, 2083). We will resume services thereafter; however, as renovation work will still be in progress, we kindly request you to call{" "}
                                <a
                                    href="tel:+9779811316273"
                                    className="announcement-link"
                                    style={{ display: "inline" }}
                                    tabIndex={copy === 1 ? -1 : undefined}
                                >
                                    9811316273
                                </a>{" "}
                                before visiting to help us manage patient visits smoothly. Thank you for your patience and understanding.
                            </p>
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    className="announcement-close"
                    aria-label="Dismiss notice"
                    onClick={dismiss}
                >
                    <IonIcon name="close-outline" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
});

AnnouncementBar.displayName = "AnnouncementBar";