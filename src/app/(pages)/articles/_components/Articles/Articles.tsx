import { memo } from "react";
import Link from "next/link";
import { ARTICLES } from "@/constants/articles";
import Image from "next/image";
import { IonIcon } from "@/components/utility/IonIcon";
import { TitleHeader } from "@/components/utility/TitleHeader";
import styles from "./Articles.module.css";

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
        className={`section ${styles.blog}`}
        id="blog"
        aria-label="blog"
    >
        <div className="custom-container">

            <TitleHeader
                title="Our Articles"
                subTitle1="Latest Articles & News"
                className="mb-10"
            />

            <ul className={styles.blogList}>

                {ARTICLES.map((article) => (
                    <li key={article.id}>
                        <div className={styles.blogCard}>
                            <figure
                                className={`img-holder ${styles.cardBanner}`}
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

                                <div className={styles.cardBadge}>
                                    <IonIcon name="calendar-outline" />
                                    <time dateTime={article.date}>
                                        {formatDate(article.date)}
                                    </time>
                                </div>
                            </figure>

                            <div className={styles.cardContent}>
                                <h3 className={`h3 ${styles.h3}`}>
                                    <Link
                                        href={`/articles/${article.id}`}
                                        className={styles.cardTitle}
                                    >
                                        {article.title}
                                    </Link>
                                </h3>
                                <p className={`line-clamp-3 ${styles.cardexTt}`}>
                                    {article.content.introduction}
                                </p>
                                <Link
                                    href={`/articles/${article.id}`}
                                    className={styles.cardLink}
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