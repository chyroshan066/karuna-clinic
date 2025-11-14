import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IonIcon } from '@/components/utility/IonIcon';
import { notFound } from 'next/navigation';
import { Button } from '@/components/utility/Button/Button';
import { ARTICLES } from '@/constants';

// Related blog post type
interface RelatedPost {
    id: string;
    title: string;
    image: string;
    date: string;
    category: string;
    excerpt: string;
}

// Get related posts (excluding current post)
const getRelatedPosts = (currentBlogId: string): RelatedPost[] => {
    return ARTICLES
        .filter(blog => blog.id !== currentBlogId)
        .slice(0, 3)
        .map(blog => ({
            id: blog.id!,
            title: blog.title,
            image: blog.imgSrc,
            date: blog.date,
            category: blog.category,
            excerpt: blog.content.introduction?.slice(0, 120) + '...' || ''
        }));
};

const ButtonWrapper = memo(({
    children
}: {
    children: React.ReactNode
}) => (
    <div style={{
        display: 'flex',
        justifyContent: 'center'
    }}>
        {children}
    </div>
));

ButtonWrapper.displayName = "ButtonWrapper";

const BlogDetail = async ({
    params
}: {
    params: Promise<{ blogId: string }>;
}) => {
    const blogId = (await params).blogId;

    // Find the blog post by id
    const blogPost = ARTICLES.find(blog => blog.id === blogId);

    // If blog not found, show 404
    if (!blogPost) {
        notFound();
    }

    const relatedBlogs = getRelatedPosts(blogId);

    return (
        <>
            {/* Featured Image Section */}
            <section className="blog-detail-hero">
                {/* Background Image */}
                {blogPost.imgSrc && (
                    <Image
                        src={blogPost.imgSrc}
                        alt={blogPost.title}
                        fill
                        className="blog-hero-image"
                        priority
                    />
                )}

                {/* Overlay */}
                <div className="blog-hero-overlay" />

                {/* Content */}
                <div className="blog-hero-content">
                    <span className="section-subtitle blog-category">
                        {blogPost.category}
                    </span>
                    <h1 className="blog-hero-title">
                        {blogPost.title}
                    </h1>
                    <div className="blog-meta">
                        <div className="blog-meta-item">
                            <IonIcon name="person-outline" />
                            <span>{blogPost.author}</span>
                        </div>
                        <div className="blog-meta-item">
                            <IonIcon name="calendar-outline" />
                            <span>{blogPost.date}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Content Section */}
            <section className="section blog-content-section">
                <div className="custom-container">
                    {/* Back Button */}
                    <div className="back-button-wrapper">
                        <Link
                            href="/articles"
                            className="back-link hover-underline"
                        >
                            <IonIcon name="arrow-back-outline" />
                            Back to Articles
                        </Link>
                    </div>

                    <div className="row">
                        {/* Main Content - Left Side */}
                        <div className="col-md-8 blog-main-content">
                            {/* Introduction */}
                            {blogPost.content.introduction && (
                                <div className="blog-introduction">
                                    <p className="body-1">
                                        {blogPost.content.introduction}
                                    </p>
                                </div>
                            )}

                            {/* Content Sections */}
                            {blogPost.content.sections.map((section, index) => (
                                <div key={index} className="blog-section">
                                    {/* Section Title */}
                                    <h2 className="h3 blog-section-title">
                                        {section.title}
                                    </h2>

                                    {/* Section Content */}
                                    <p className="section-text">
                                        {section.content}
                                    </p>

                                    {/* Section Items List */}
                                    {section.items && section.items.length > 0 && (
                                        <ul className="blog-list">
                                            {section.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="blog-list-item">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Section Highlights */}
                                    {section.highlights && section.highlights.length > 0 && (
                                        <div className="blog-highlight-box">
                                            {section.highlights.map((highlight, highlightIndex) => (
                                                <p key={highlightIndex} className="blog-highlight-text">
                                                    {highlight}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Conclusion */}
                            {blogPost.content.conclusion && (
                                <div className="blog-conclusion bg-blue-10">
                                    <h3 className="h3 conclusion-title">
                                        Conclusion
                                    </h3>
                                    <p className="section-text conclusion-text">
                                        {blogPost.content.conclusion}
                                    </p>
                                </div>
                            )}

                            {/* Social Share */}
                            <div className="blog-social-share">
                                <div className="social-share-content">
                                    <span className="social-share-label">
                                        Share This Article:
                                    </span>
                                    <div className="social-share-buttons">
                                        {[
                                            {
                                                icon: 'logo-facebook',
                                                label: 'Facebook',
                                                url: `https://www.facebook.com/sharer.php?u=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`
                                            },
                                            {
                                                icon: 'logo-twitter',
                                                label: 'Twitter',
                                                url: `https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}&text=${encodeURIComponent(blogPost.title)}`
                                            },
                                            {
                                                icon: 'logo-instagram',
                                                label: 'Instagram',
                                                url: '#'
                                            }
                                        ].map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="social-share-btn"
                                                aria-label={social.label}
                                            >
                                                <IonIcon name={social.icon} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* CTA Section */}
                            <div className="blog-cta centered">
                                <h3 className="h3">Ready to Get Your Tattoo?</h3>
                                <p className="section-text">
                                    Book an appointment with our expert artists today
                                </p>
                                <ButtonWrapper>
                                    <Button
                                        btnText="Book Appointment"
                                        btnLink="/#contact"
                                    />
                                </ButtonWrapper>
                            </div>
                        </div>

                        {/* Sidebar - Right Side */}
                        <div className="col-md-4">
                            {relatedBlogs.length > 0 ? (
                                <div className="related-posts-sidebar">
                                    <h3 className="h3 sidebar-title">
                                        Related Posts
                                    </h3>

                                    {/* Related Blog Cards */}
                                    {relatedBlogs.map((post) => (
                                        <div key={post.id} className="related-post-card">
                                            <Link href={`/articles/${post.id}`} className="related-post-link">
                                                <div className="related-post-image">
                                                    {post.image ? (
                                                        <Image
                                                            src={post.image}
                                                            alt={post.title}
                                                            fill
                                                            className="img-cover"
                                                        />
                                                    ) : (
                                                        <div className="related-post-placeholder">
                                                            Image
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="related-post-content">
                                                    <span className="section-subtitle">
                                                        {post.category}
                                                    </span>

                                                    <h4 className="h3 related-post-title">
                                                        {post.title}
                                                    </h4>

                                                    <p className="card-text">
                                                        {post.excerpt}
                                                    </p>

                                                    <div className="related-post-date">
                                                        <IonIcon name="calendar-outline" />
                                                        <span>{post.date}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-related-posts">
                                    <IonIcon
                                        name="document-text-outline"
                                        className="size-12"
                                    />
                                    <h4 className="h3">No Related Articles</h4>
                                    <p className="card-text">
                                        This is our first articles post. Check back soon for more content!
                                    </p>
                                    <ButtonWrapper>
                                        <Button
                                            btnText="View All Articles"
                                            btnLink="/articles"
                                        />
                                    </ButtonWrapper>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogDetail;