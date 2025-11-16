import Image from "next/image";
import { memo } from "react";
import { TitleHeader } from "./utility/TitleHeader";

export const About = memo(() => (
    <section
        className="section about"
        id="about"
        aria-label="about"
    >
        <div className="custom-container">

            <figure className="about-banner">
                <Image
                    src="/images/about-banner.webp"
                    width={470}
                    height={538}
                    loading="lazy"
                    alt="about banner"
                    className="w-fill"
                />
            </figure>

            <div>
                {/* <p className="section-subtitle">About Us</p>
                <h2 className="h2 section-title">We Care For Your Skin & Beauty</h2> */}
                <TitleHeader
                    title="About Us"
                    subTitle1="We Care For Your Skin & Beauty"
                    className="text-start"
                />

                <p className="section-text section-text-1">
                    Welcome to <b>Dr. Karuna Skin Hair & Laser Center</b>, your trusted <b>best skin clinic in Dharan</b> and premier <b>dermatology clinic in Dharan</b> located at Putali Line, Dharan-10, Sunsari, Nepal. With the motto <i>“Scientific solutions for every skin”</i>, we are committed to providing high-quality <b>skin and aesthetic care in Nepal</b> for every individual.
                </p>
                <p className="section-text">
                    Our team of experienced dermatologists at this leading <b>skin clinic in Dharan</b> offers a full range of treatments including <b>laser hair removal, acne treatment, anti-aging therapy, skin rejuvenation, hair loss treatment, pigmentation removal, melasma treatment,</b> and <b>scar removal.</b> We also specialize in <b>cosmetic dermatology,</b> ensuring gentle care for all skin types, as well as <b>comprehensive aesthetic services in Dharan</b> for all ages.
                </p>
                <p className="section-text section-text-1">
                    At <b>Dr. Karuna Skin Hair & Laser Center Nepal</b>, recognized as the <b>best skin clinic in Dharan,</b> we combine cutting-edge laser technology with compassionate care to make treatments comfortable and accessible. Whether you need a routine <b>skin consultation in Dharan, aesthetic treatments,</b> or advanced solutions for skin and hair concerns, our clinic ensures the best outcomes at an <b>affordable price.</b>
                </p>
                <p className="section-text">
                    Choose <b>Dr. Karuna Skin Hair & Laser Center</b> for the <b>best dermatologist in Dharan,</b> where healthy skin begins with expert care and a personal touch  at the most trusted <b>skin clinic in Dharan.</b>
                </p>

            </div>
        </div>
    </section>
));

About.displayName = "About";