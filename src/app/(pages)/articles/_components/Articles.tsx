import { memo } from "react";
import Link from "next/link";
import { ARTICLES } from "@/constants/articles";
import Image from "next/image";
import { IonIcon } from "@/components/utility/IonIcon";
import { TitleHeader } from "@/components/utility/TitleHeader";

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const Articles = memo(() => (
    <section
        className="section blog"
        id="blog"
        aria-label="blog"
    >
        <div className="custom-container">

            <TitleHeader
                title="Our Articles"
                subTitle1="Latest Articles & News"
            />

            <ul className="blog-list">

                {ARTICLES.map((article) => (
                    <li key={article.id}>
                        <div className="blog-card">
                            <figure
                                className="card-banner img-holder"
                                style={{
                                    "--width": "1180",
                                    "--height": "800"
                                } as React.CSSProperties}
                            >
                                <Image
                                    src={article.imgSrc}
                                    width={1180}
                                    height={800}
                                    loading="lazy"
                                    alt={article.title}
                                    className="img-cover"
                                />

                                <div className="card-badge">
                                    <IonIcon name="calendar-outline" />
                                    <time
                                        className="time"
                                        dateTime={article.date}
                                    >
                                        {formatDate(article.date)}
                                    </time>
                                </div>
                            </figure>

                            <div className="card-content">
                                <h3 className="h3">
                                    <Link
                                        href={article.href}
                                        className="card-title"
                                    >
                                        {article.title}
                                    </Link>
                                </h3>
                                <p className="card-text line-clamp-3">
                                    {article.content.introduction}
                                </p>
                                <Link
                                    href={article.href}
                                    className="card-link"
                                >
                                    Read More
                                </Link>
                            </div>

                        </div>
                    </li>
                ))}

            </ul>
        </div>
    </section>
));

Articles.displayName = "Articles";