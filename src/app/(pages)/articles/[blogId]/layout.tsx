import { ARTICLES } from "@/constants";
import { Metadata } from "next";
import Script from "next/script";
import React from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function generateMetadata({
    params
}: {
    params: Promise<{ blogId: string }>
}): Promise<Metadata> {
    const blogId = (await params).blogId;
    const blogPost = ARTICLES.find(blog => blog.id === blogId);

    if (!blogPost) {
        return {
            title: 'Blog Not Found',
        };
    }

    return {
        title: `${blogPost.title} | Sewaro Tattoo Studio`,
        description: blogPost.content.introduction || 'Read more on Sewaro Tattoo Studio blog',
        authors: [{ name: blogPost.author }],
        keywords: blogPost.keywords,
        openGraph: {
            title: blogPost.title,
            description: blogPost.content.introduction || '',
            url: `${baseUrl}/blogs/${blogId}`,
            type: 'article',
            publishedTime: blogPost.date,
            authors: [blogPost.author],
            images: [
                {
                    url: blogPost.imgSrc,
                    width: 1200,
                    height: 630,
                    alt: blogPost.title,
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: blogPost.title,
            description: blogPost.content.introduction || '',
            images: [blogPost.imgSrc],
        },
    };
}

export default function BlogLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ blogId: string }>;
}) {
    const blogId = React.use(params).blogId;
    const blogPost = ARTICLES.find(blog => blog.id === blogId);

    if (!blogPost) return children;

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blogPost.title,
        "image": `${baseUrl}${blogPost.imgSrc}`,
        "author": {
            "@type": "Person",
            "name": blogPost.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Sewaro Tattoo",
            "logo": {
                "@type": "ImageObject",
                "url": `/images/logo.webp`
            }
        },
        "datePublished": new Date(blogPost.date).toISOString(),
        "dateModified": new Date(blogPost.date).toISOString(),
        "description": blogPost.content.introduction,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${baseUrl}/blogs/${blogId}`
        }
    };

    return (
        <>
            <Script
                id={`article-schema-${blogId}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleSchema)
                }}
            />
            {children}
        </>
    );
}