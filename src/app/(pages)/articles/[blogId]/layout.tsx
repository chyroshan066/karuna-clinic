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
            title: 'Article Not Found',
        };
    }

    return {
        title: `${blogPost.title} | Dr. Karuna Skin Hair & Laser Center`,
        description: blogPost.content.introduction || 'Read more on Dr. Karuna Skin Hair & Laser Center blog',
        authors: [{ name: blogPost.author }],
        keywords: blogPost.keywords,
        openGraph: {
            title: blogPost.title,
            description: blogPost.content.introduction || '',
            url: `${baseUrl}/articles/${blogId}`,
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

export default function ArticleLayout({
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
            "name": "Dr. Karuna Skin Hair & Laser Center",
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/images/logo.webp`
            }
        },
        "datePublished": new Date(blogPost.date).toISOString(),
        "dateModified": new Date(blogPost.date).toISOString(),
        "description": blogPost.content.introduction,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${baseUrl}/articles/${blogId}`
        },
        "about": {
            "@type": "MedicalBusiness",
            "name": "Dr. Karuna Skin Hair & Laser Center",
            "medicalSpecialty": "Dermatology"
        },
        "keywords": blogPost.keywords?.join(', ')
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