import { Metadata } from "next";
import { Articles } from "./_components/Articles/Articles";

export const metadata: Metadata = {
    title: 'Research Articles - Dr. Karuna Skin Hair and Laser Treatment Center',
    description: 'Explore dermatology insights, hair transplant research, laser treatment advances, and skincare tips from Dr. Karuna Skin Hair and Laser Treatment Center.',
    openGraph: {
        title: 'Research Articles - Dr. Karuna Skin Hair and Laser Treatment Center',
        description: 'Explore dermatology insights, hair transplant research, laser treatment advances, and skincare tips from Dr. Karuna Skin Hair and Laser Treatment Center.',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles`,
        type: 'website',
        images: [
            {
                url: '/images/research/article1.webp',
                width: 1200,
                height: 630,
                alt: 'Dr. Karuna Research Articles',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Research Articles - Dr. Karuna Skin Hair and Laser Treatment Center',
        description: 'Explore dermatology insights, hair transplant research, laser treatment advances, and skincare tips.',
        images: [`${process.env.NEXT_PUBLIC_BASE_URL}/images/articles/article1.webp`],
    },
};

export default function ArticlesPage() {
    return <Articles />;
}