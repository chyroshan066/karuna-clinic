"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { Icon } from '@iconify/react';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/constants/articles';
import { Button } from '@/components/utility/Button/Button';
import { IonIcon } from '@/components/utility/IonIcon';

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
            <section style={{
                padding: '0',
                // marginTop: '148px',
                position: 'relative',
                height: '60vh',
                minHeight: '400px',
                overflow: 'hidden'
            }}>
                {/* Background Image */}
                {blogPost.imgSrc && (
                    <Image
                        src={blogPost.imgSrc}
                        alt={blogPost.title}
                        fill
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                        priority
                    />
                )}

                {/* Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 1
                }}></div>

                {/* Content */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                    textAlign: 'center',
                    maxWidth: '900px',
                    padding: '0 20px',
                    width: '100%'
                }}>
                    <span
                        className="text"
                        style={{
                            color: '#C5A992',
                            marginBottom: '20px',
                            display: 'inline-block'
                        }}>
                        {blogPost.category}
                    </span>
                    <h1 style={{
                        color: '#fff',
                        marginBottom: '20px',
                        fontSize: '56px'
                    }}>
                        {blogPost.title}
                    </h1>
                    <div style={{
                        display: 'flex',
                        gap: '30px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        color: '#fff'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            {/* <Icon
                                icon="mdi:account"
                                width="18"
                                height="18"
                                color="#fff"
                            /> */}
                            <IonIcon name="person-outline" />

                            <span style={{ fontSize: '16px' }}>
                                {blogPost.author}
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            {/* <Icon
                                icon="mdi:calendar"
                                width="18"
                                height="18"
                                color="#fff"
                            /> */}
                            <IonIcon name="calendar-outline" />

                            <span style={{ fontSize: '16px' }}>
                                {blogPost.date}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Content Section */}
            <section style={{ padding: '80px 0' }}>
                <div className="custom-container">
                    {/* Back Button */}
                    <div style={{ marginBottom: '40px' }}>
                        <Link
                            href="/blogs"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                textDecoration: 'none',
                                color: '#111',
                                fontFamily: 'var(--font-oswald), Oswald, sans-serif',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                fontSize: '16px',
                                transition: 'color 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#444'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#111'}
                        >
                            {/* <Icon
                                icon="mdi:arrow-left"
                                width="20"
                                height="20" /> */}
                            <IonIcon name="arrow-back-outline" />

                            Back to Blog
                        </Link>
                    </div>

                    <div className="row">
                        {/* Main Content - Left Side */}
                        <div
                            className="col-md-8"
                            style={{ paddingRight: '30px' }}
                        >

                            {/* Introduction */}
                            {blogPost.content.introduction && (
                                <div style={{ marginBottom: '50px' }}>
                                    <p style={{
                                        fontSize: '20px',
                                        fontStyle: 'italic',
                                        lineHeight: '187%',
                                        color: '#555'
                                    }}>
                                        {blogPost.content.introduction}
                                    </p>
                                </div>
                            )}

                            {/* Content Sections */}
                            {blogPost.content.sections.map((section, index) => (
                                <div
                                    key={index}
                                    style={{ marginBottom: '50px' }}
                                >
                                    {/* Section Title */}
                                    <h2 style={{
                                        marginBottom: '25px',
                                        position: 'relative',
                                        paddingLeft: '24px'
                                    }}>
                                        <span style={{
                                            content: '',
                                            marginLeft: '-24px',
                                            position: 'absolute',
                                            width: '14px',
                                            height: '3px',
                                            background: '#C5A992',
                                            left: 0,
                                            top: '18px'
                                        }} />
                                        {section.title}
                                    </h2>

                                    {/* Section Content */}
                                    <p style={{ marginBottom: '20px' }}>
                                        {section.content}
                                    </p>

                                    {/* Section Items List */}
                                    {section.items && section.items.length > 0 && (
                                        <ul style={{ margin: '25px 0' }}>
                                            {section.items.map((item, itemIndex) => (
                                                <li
                                                    key={itemIndex}
                                                    style={{
                                                        paddingLeft: '30px',
                                                        position: 'relative',
                                                        marginBottom: '12px'
                                                    }}
                                                >
                                                    <span style={{
                                                        content: '—',
                                                        position: 'absolute',
                                                        left: 0,
                                                        color: '#C5A992',
                                                        fontWeight: 600
                                                    }}>—</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Section Highlights */}
                                    {section.highlights && section.highlights.length > 0 && (
                                        <div style={{
                                            background: '#F9F9F9',
                                            padding: '30px',
                                            borderLeft: '4px solid #C5A992',
                                            marginTop: '25px'
                                        }}>
                                            {section.highlights.map((highlight, highlightIndex) => (
                                                <p
                                                    key={highlightIndex}
                                                    style={{
                                                        fontWeight: 500,
                                                        color: '#111',
                                                        margin: 0
                                                    }}
                                                >
                                                    {highlight}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Conclusion */}
                            {blogPost.content.conclusion && (
                                <div style={{
                                    background: '#111',
                                    padding: '50px 40px',
                                    marginTop: '60px',
                                    marginBottom: '60px'
                                }}>
                                    <h3 style={{
                                        color: '#C5A992',
                                        marginBottom: '20px'
                                    }}>
                                        Conclusion
                                    </h3>
                                    <p style={{
                                        color: '#fff',
                                        margin: 0
                                    }}>
                                        {blogPost.content.conclusion}
                                    </p>
                                </div>
                            )}

                            {/* Social Share */}
                            <div style={{
                                borderTop: '1px solid #EEEEEE',
                                borderBottom: '1px solid #EEEEEE',
                                padding: '40px 0',
                                marginBottom: '40px'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flexWrap: 'wrap',
                                    gap: '20px'
                                }}>
                                    <span style={{
                                        fontSize: '16px',
                                        fontFamily: 'var(--font-oswald), Oswald, sans-serif',
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                        color: '#111',
                                        fontWeight: 600
                                    }}>
                                        Share This Article:
                                    </span>
                                    <div style={{
                                        display: 'flex',
                                        gap: '15px'
                                    }}>
                                        {[
                                            {
                                                icon: 'mdi:facebook',
                                                label: 'Facebook',
                                                // encodeURIComponent() - Properly encodes the URL for use in a query string
                                                // window.location.href - Gets the current page's full URL
                                                url: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(window.location.href)}`
                                                // url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`
                                            },
                                            {
                                                icon: 'mdi:twitter',
                                                label: 'Twitter',
                                                url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(blogPost.title)}`
                                            },
                                            {
                                                icon: 'mdi:instagram',
                                                label: 'Instagram',
                                                url: '#'
                                            }
                                        ].map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    background: 'transparent',
                                                    border: '1px solid #EEEEEE',
                                                    borderRadius: '50%',
                                                    width: '45px',
                                                    height: '45px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    textDecoration: 'none'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#111';
                                                    e.currentTarget.style.borderColor = '#111';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.borderColor = '#EEEEEE';
                                                }}
                                                aria-label={social.label}
                                            >
                                                <Icon
                                                    icon={social.icon}
                                                    width="20"
                                                    height="20"
                                                    color="#111"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* CTA Section */}
                            <div
                                className="centered"
                                style={{
                                    padding: '60px 40px',
                                    background: '#F9F9F9'
                                }}
                            >
                                <h3 style={{ marginBottom: '20px' }}>
                                    Ready to Get Your Tattoo?
                                </h3>
                                <p style={{ marginBottom: '35px' }}>
                                    Book an appointment with our expert artists today
                                </p>

                                <Button
                                    variant="btnBlack"
                                    btnText="Book Appointment"
                                    href="/#contact"
                                />

                            </div>

                        </div>

                        {/* Sidebar - Right Side */}
                        <div className="col-md-4">
                            {relatedBlogs.length > 0 ? (
                                // Related Posts
                                <div
                                    style={{
                                        position: 'sticky',
                                        top: '180px',
                                        maxHeight: 'calc(100vh - 200px)',
                                        overflowY: 'auto',
                                        paddingRight: '10px'
                                    }}
                                    className="related-posts-sidebar"
                                >
                                    <h3 style={{
                                        fontFamily: 'var(--font-oswald), Oswald, sans-serif',
                                        fontWeight: 600,
                                        fontSize: '28px',
                                        textTransform: 'uppercase',
                                        color: '#111',
                                        letterSpacing: '0.03em',
                                        marginBottom: '30px',
                                        position: 'relative',
                                        paddingLeft: '24px'
                                    }}>
                                        <span style={{
                                            content: '',
                                            marginLeft: '-24px',
                                            position: 'absolute',
                                            width: '14px',
                                            height: '3px',
                                            background: '#C5A992',
                                            left: 0,
                                            top: '15px'
                                        }} />
                                        Related Posts
                                    </h3>

                                    {/* Related Blog Cards */}
                                    {relatedBlogs.map((post) => (
                                        <div
                                            key={post.id}
                                            style={{
                                                marginBottom: '30px',
                                                background: '#fff',
                                                transition: 'transform 0.3s ease',
                                                cursor: 'pointer'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-5px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            <Link
                                                href={`/blogs/${post.id}`}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <div style={{
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '200px',
                                                    overflow: 'hidden',
                                                    marginBottom: '20px'
                                                }}>
                                                    {post.image ? (
                                                        <Image
                                                            src={post.image}
                                                            alt={post.title}
                                                            fill
                                                            style={{
                                                                objectFit: 'cover',
                                                                transition: 'transform 0.3s ease'
                                                            }}
                                                        />
                                                    ) : (
                                                        <div style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            background: 'linear-gradient(135deg, #333 0%, #666 100%)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            color: '#fff',
                                                            fontSize: '14px'
                                                        }}>
                                                            Image
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <span
                                                        className="text"
                                                        style={{
                                                            fontSize: '11px',
                                                            color: '#C5A992',
                                                            marginBottom: '10px',
                                                            display: 'inline-block',
                                                            marginLeft: 0
                                                        }}
                                                    >
                                                        {post.category}
                                                    </span>

                                                    <h4
                                                        style={{
                                                            fontFamily: 'var(--font-oswald), Oswald, sans-serif',
                                                            fontWeight: 600,
                                                            fontSize: '18px',
                                                            textTransform: 'uppercase',
                                                            color: '#111',
                                                            letterSpacing: '0.03em',
                                                            marginBottom: '10px',
                                                            lineHeight: '140%',
                                                            transition: 'color 0.3s ease'
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.color = '#444'}
                                                        onMouseLeave={(e) => e.currentTarget.style.color = '#111'}
                                                    >
                                                        {post.title}
                                                    </h4>

                                                    <p style={{
                                                        fontSize: '14px',
                                                        lineHeight: '160%',
                                                        color: '#555',
                                                        marginBottom: '12px'
                                                    }}>
                                                        {post.excerpt}
                                                    </p>

                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        fontSize: '13px',
                                                        color: '#ACACAC'
                                                    }}>
                                                        <Icon
                                                            icon="mdi:calendar"
                                                            width="14"
                                                            height="14"
                                                        />
                                                        <span>{post.date}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                // No Related Posts UI
                                <div
                                    style={{
                                        position: 'sticky',
                                        top: '180px',
                                        background: '#F9F9F9',
                                        padding: '40px 30px',
                                        textAlign: 'center',
                                        borderRadius: '4px'
                                    }}
                                >
                                    <Icon
                                        icon="mdi:text-box-outline"
                                        width="48"
                                        height="48"
                                        color="#C5A992"
                                        style={{ marginBottom: '20px' }}
                                    />
                                    <h4 style={{
                                        fontFamily: 'var(--font-oswald), Oswald, sans-serif',
                                        fontWeight: 600,
                                        fontSize: '20px',
                                        textTransform: 'uppercase',
                                        color: '#111',
                                        letterSpacing: '0.03em',
                                        marginBottom: '15px'
                                    }}>
                                        No Related Posts
                                    </h4>
                                    <p style={{
                                        fontSize: '14px',
                                        lineHeight: '160%',
                                        color: '#555',
                                        marginBottom: '25px'
                                    }}>
                                        This is our first blog post. Check back soon for more content!
                                    </p>
                                    <Link
                                        href="/blogs"
                                        style={{
                                            display: 'inline-block',
                                            padding: '12px 24px',
                                            background: '#111',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            fontFamily: 'var(--font-oswald), Oswald, sans-serif',
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            fontSize: '14px',
                                            transition: 'background 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = '#333'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = '#111'}
                                    >
                                        View All Blogs
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section >

            {/* Responsive Styles */}
            <style jsx >
                {`
                    section {
                        margin-top: 0;
                    }
                    .related-posts-sidebar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .related-posts-sidebar::-webkit-scrollbar-track {
                        background: #f1f1f1;
                        border-radius: 10px;
                    }
                    .related-posts-sidebar::-webkit-scrollbar-thumb {
                        background: #C5A992;
                        border-radius: 10px;
                    }
                    .related-posts-sidebar::-webkit-scrollbar-thumb:hover {
                        background: #b39982;
                    }

                    @media screen and (max-width: 999px) {
                        section {
                            margin-top: 148px;
                        }
                    }

                    @media screen and (max-width: 768px) {
                      h1 {
                        font-size: 32px !important;
                      }
                      h2 {
                        font-size: 24px !important;
                      }
                      h3 {
                        font-size: 20px !important;
                      }
                      section {
                        padding: 60px 0 !important;
                      }
                      .col-md-8, .col-md-4 {
                        flex: 0 0 100%;
                        max-width: 100%;
                        padding: 0 15px;
                      }
                      .col-md-8 {
                        margin-bottom: 60px;
                      }
                      .related-posts-sidebar {
                        position: relative !important;
                        max-height: none !important;
                        overflow-y: visible !important;
                      }
                    }

                    @media screen and (max-width: 576px) {
                      h1 {
                        font-size: 28px !important;
                      }
                      h2 {
                        font-size: 20px !important;
                      }
                    }
                `}
            </style >
        </>
    );
};

export default BlogDetail;
