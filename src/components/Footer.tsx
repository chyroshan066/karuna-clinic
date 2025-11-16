import { memo } from "react";
import { IonIcon } from "./utility/IonIcon";
import { NAVLINKS, SERVICES, SOCIALLINKS } from "@/constants";
import { Link, Services } from "@/types";
import { SocialLink } from "./utility/SocialLink";

interface FooterColumn {
    footerListTitle: string;
    list: Link[] | Services[];
}

const FOOTERCOLUMN: FooterColumn[] = [
    {
        footerListTitle: "Other Links",
        list: NAVLINKS,
    },
    {
        footerListTitle: "Our Services",
        list: SERVICES,
    },
];

const FooterColumn = memo(({
    footerListTitle, list
}: FooterColumn) => (
    <ul className="footer-list">
        <li>
            <p className="footer-list-title">{footerListTitle}</p>
        </li>

        {list.map((link, index) => (
            <li key={index}>
                <a
                    href={link.href?.includes("#") ? link.href : `#${link.href}`}
                    className="footer-link"
                >
                    <IonIcon name="add-outline" />
                    <span className="span">{link.name}</span>
                </a>
            </li>
        ))}

    </ul>
));

FooterColumn.displayName = "FooterColumn";

export const Footer = memo(() => (
    <footer className="footer">
        <div className="footer-top section">
            <div className="custom-container">
                <div className="footer-brand">
                    <a
                        href="#"
                        className="logo"
                    >
                        Dr. Karuna Skin Hair & Laser Center
                    </a>
                    <p className="footer-text">
                        Your trusted <strong>dermatology clinic in Dharan</strong> for <strong>laser hair removal, acne treatment, skin rejuvenation, anti-aging therapy, pigmentation removal, hair loss treatment,</strong>, and <strong>aesthetic care</strong> at an affordable price. Visit <strong>Dr. Karuna Skin Hair & Laser Center</strong> for healthy skin.
                    </p>

                    <div className="schedule">
                        <div className="schedule-icon">
                            <IonIcon name="time-outline" />
                        </div>
                        <span className="span">
                            Sunday - Friday:<br />
                            10:00 AM - 3:00 PM
                        </span>
                    </div>

                </div>

                {FOOTERCOLUMN.map((column, index) => (
                    <FooterColumn
                        key={index}
                        footerListTitle={column.footerListTitle}
                        list={column.list}
                    />
                ))}

                <ul className="footer-list">
                    <li>
                        <p className="footer-list-title">Contact Us</p>
                    </li>

                    <li className="footer-item">
                        <div className="item-icon">
                            <IonIcon name="location-outline" />
                        </div>
                        <address className="item-text">
                            Putali Line, Dharan-10 <br />
                            Sunsari, Nepal
                        </address>
                    </li>

                    <li className="footer-item">
                        <div className="item-icon">
                            <IonIcon name="call-outline" />
                        </div>
                        <a
                            href="tel:+9779811316273"
                            className="footer-link"
                        >
                            9811316273
                        </a>
                    </li>

                    <li className="footer-item">
                        <div className="item-icon">
                            <IonIcon name="mail-outline" />
                        </div>
                        <a
                            href="mailto:drkaruna.clinic@gmail.com"
                            className="footer-link"
                        >
                            drkaruna.clinic@gmail.com
                        </a>
                    </li>

                </ul>
            </div>
        </div>

        <div className="footer-bottom">
            <div className="custom-container">
                <p className="copyright">
                    &copy; 2025 All Rights Reserved by Dr. Karuna Skin Hair & Laser Center.
                </p>
                <ul className="social-list">

                    {SOCIALLINKS.map((link, index) => (
                        <SocialLink
                            key={index}
                            href={link.href}
                            name={link.name}
                        />
                    ))}

                </ul>
            </div>
        </div>
    </footer>
));

Footer.displayName = "Footer";