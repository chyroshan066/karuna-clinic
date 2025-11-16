import { IonIcon } from '@/components/utility/IonIcon';
import { TitleHeader } from '@/components/utility/TitleHeader';
import Link from 'next/link';
import React, { memo } from 'react';

const TRAININGS: string[] = [
    "Advanced Skin Laser Surgery",
    "Skin Rejuvenation",
    "Skin Tightening",
    "Hair Restoration Surgery",
];

const BIO: string[] = [
    "Dr. Karuna Singh Sijapati is an internationally trained, board-certified dermatologist and a highly skilled clinician with extensive experience in dermatology, cosmetology, and aesthetic medicine. She is known for her patient-centered approach and commitment to delivering safe, advanced, and evidence-based treatments.",
    "She completed her MD in Dermatology and Venereology from the prestigious B.P. Koirala Institute of Health Sciences (BPKIHS), Dharan, Nepal. To further specialize in aesthetic care, she pursued a Fellowship in Aesthetic Medicine at one of India’s leading institutes in Pune.",
    "Dr. Sijapati has also undergone intensive training in advanced skin laser surgery, skin rejuvenation, skin tightening, and body contouring at the Laser and Dermatosurgery Training & Research Centre in Tamil Nadu, India. She further expanded her expertise by completing a dedicated Laser Surgery Training Program at Siriraj Hospital, Mahidol University, Thailand—one of Asia’s premier medical institutions.",
    "In addition, she has been trained in hair restoration surgery under renowned hair transplant surgeons in Bangalore, India.",
];

export const Dermatologist = memo(() => {
    return (
        <main>
            {/* Hero Section*/}
            <section style={{
                background: 'linear-gradient(135deg, var(--dark-brown-1) 0%, var(--rich-amber) 100%)',
                paddingTop: '30px',
                paddingBottom: '5px',
                marginTop: '95px'
            }}>
                <div className="custom-container">
                    <div className="hero-content text-center">
                        <h1 className="headline-1">Meet Our Expert</h1>
                        <p className="hero-text">
                            Providing exceptional dermatological care with years of experience and specialized training
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Dentist Profile Section */}
            <section style={{
                paddingTop: '80px',
                paddingBottom: '80px'
            }}>
                <div className="custom-container">
                    <div className="dentist-profile-grid">

                        {/* Profile Card */}
                        <div
                            className="dentist-card"
                            style={{
                                background: 'linear-gradient(145deg, #ffffff 0%, #f8fffe 100%)',
                                border: '1px solid rgba(150, 211, 169, 0.2)',
                                borderRadius: '20px',
                                padding: '60px',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                            {/* Decorative background element */}
                            <div style={{
                                position: 'absolute',
                                top: '-50px',
                                right: '-50px',
                                width: '150px',
                                height: '150px',
                                background: 'linear-gradient(135deg, var(--rich-amber), var(--deep-burgundy))',
                                borderRadius: '50%',
                                opacity: '0.1',
                                zIndex: '1'
                            }}></div>

                            {/* Profile Image */}
                            <div
                                className="dentist-image-wrapper"
                                style={{
                                    position: 'relative',
                                    zIndex: '2'
                                }}>
                                <div
                                    className="img-holder dentist-img-holder"
                                    style={{
                                        "--width": 220,
                                        "--height": 220,
                                        border: '6px solid var(--rich-amber)',
                                        borderRadius: '50%',
                                        padding: '8px',
                                        background: 'white',
                                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                                        position: 'relative'
                                    } as React.CSSProperties}>
                                    <img
                                        src="/images/dermatologist-profile.webp"
                                        alt="Dr. Ambika Sah - Dental Surgeon"
                                        className="img-cover dentist-profile-img"
                                        loading="lazy"
                                        style={{ borderRadius: '50%' }}
                                    />
                                </div>
                            </div>

                            <div style={{
                                position: 'relative',
                                zIndex: '2'
                            }}>
                                <h2
                                    className="h25 dentist-name"
                                    style={{
                                        marginTop: '30px',
                                        color: 'var(--dark-brown-1)'
                                    }}>
                                    Dr. Karuna Singh Sijapati
                                </h2>
                                <h3
                                    className="dentist-title"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--rich-amber), var(--deep-burgundy))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        fontSize: '1.8rem',
                                        fontWeight: '700',
                                        marginBottom: '25px'
                                    }}>
                                    Dermatologist
                                </h3>

                                <div
                                    className="dentist-qualification-badge"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--cream-mist), #e8f5f0)',
                                        border: '2px solid var(--rich-amber)',
                                        borderRadius: '15px',
                                        padding: '20px 30px',
                                        marginBottom: '25px',
                                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                                    }}>
                                    <p style={{
                                        color: 'var(--chocolate-brown-2)',
                                        fontWeight: '800',
                                        fontSize: '1.6rem',
                                        letterSpacing: '1px'
                                    }}>
                                        MD Dermatology & Venereology
                                    </p>
                                </div>

                                <div
                                    className="dentist-institution-info"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--chocolate-brown-2), var(--dark-brown-1))',
                                        borderRadius: '15px',
                                        padding: '25px',
                                        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
                                        border: '1px solid var(--rich-amber)'
                                    }}>
                                    <p
                                        className="institution-text"
                                        style={{
                                            fontSize: '1.4rem',
                                            fontWeight: '600',
                                            lineHeight: '1.6',
                                            margin: '0'
                                        }}>
                                        B.P. KOIRALA INSTITUTE OF HEALTH SCIENCES<br />
                                        <span style={{
                                            fontSize: '1.2rem',
                                            opacity: '0.9',
                                            fontWeight: '500',
                                            color: 'var(--champagne-gold)'
                                        }}>
                                            NMC No: 10003
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div style={{
                            textAlign: 'left',
                            padding: '40px',
                            background: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '20px',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(150, 211, 169, 0.1)'
                        }}>
                            <h3
                                className="section-subtitle"
                                style={{
                                    color: 'var(--deep-burgundy)',
                                    fontSize: '1.4rem',
                                    letterSpacing: '2px',
                                    marginBottom: '15px'
                                }}>
                                ABOUT
                            </h3>
                            <h2 style={{
                                color: 'var(--dark-brown-1)',
                                fontSize: '2.8rem',
                                fontWeight: '700',
                                marginBottom: '30px',
                                lineHeight: '1.2'
                            }}>
                                Dedicated to Your Skin Health
                            </h2>
                            {BIO.map((text, index) => (
                                <p
                                    key={index}
                                    className="section-text dentist-about-text"
                                    style={{
                                        fontSize: '1.6rem',
                                        lineHeight: '1.8',
                                        color: 'var(--warm-taupe)',
                                        marginBottom: '30px'
                                    }}>
                                    {text}
                                </p>
                            ))}
                            <p
                                className="section-text dentist-about-text"
                                style={{
                                    fontSize: '1.6rem',
                                    lineHeight: '1.8',
                                    color: 'var(--warm-taupe)'
                                }}>
                                Dr. Sijapati is equally passionate about academic growth and research. She has authored multiple research papers and case reports published in reputable national and international journals. She actively participates in conferences, CME programs, and hands-on workshops to stay updated with the latest advancements in dermatology and aesthetic treatments—ensuring the best outcomes for her patients.
                            </p>

                            {/* Key highlights */}
                            <div style={{ marginTop: '40px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    marginBottom: '15px',
                                    padding: '15px',
                                    background: 'rgba(150, 211, 169, 0.1)',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(150, 211, 169, 0.2)'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'var(--deep-burgundy)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '18px',
                                        flexShrink: '0'
                                    }}>
                                        🎓
                                    </div>
                                    <span style={{
                                        fontSize: '1.5rem',
                                        color: 'var(--dark-brown-1)',
                                        fontWeight: '600'
                                    }}>
                                        BPKIHS Graduate{/* & NMC Registered */}
                                    </span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    padding: '15px',
                                    background: 'rgba(150, 211, 169, 0.1)',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(150, 211, 169, 0.2)'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'var(--deep-burgundy)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '18px',
                                        flexShrink: '0'
                                    }}>
                                        💚
                                    </div>
                                    <span style={{
                                        fontSize: '1.5rem',
                                        color: 'var(--dark-brown-1)',
                                        fontWeight: '600'
                                    }}>
                                        Patient-Centered Care Approach
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Training & Expertise Section */}
            <section style={{
                background: 'linear-gradient(135deg, var(--deep-chocolate-3) 0%, var(--chocolate-brown-2) 100%)',
                padding: '100px 0',
                position: 'relative',
                overflow: 'hidden'
            }}>

                <div
                    className="custom-container"
                    style={{
                        position: 'relative',
                        zIndex: '2'
                    }}>
                    <div
                        className="text-center"
                        style={{ marginBottom: '80px' }}>
                        <h3
                            className="section-subtitle"
                            style={{
                                color: 'var(--rich-amber)',
                                fontSize: '1.4rem',
                                letterSpacing: '2px',
                                marginBottom: '15px'
                            }}>
                            SPECIALIZED TRAINING
                        </h3>
                        <h2
                            className="h2"
                            style={{
                                color: 'white',
                                fontSize: '3.2rem',
                                fontWeight: '700',
                                marginBottom: '25px'
                            }}>
                            Advanced Skin & Hair Expertise
                        </h2>
                        <p style={{
                            color: 'var(--champagne-gold)',
                            fontSize: '1.6rem',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            Dr. Karuna has completed specialized training in advanced skin, hair, and laser treatments and actively contributes to community health initiatives.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '40px'
                    }}>

                        {/* Training Card */}
                        <div className="training-card" style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            padding: '50px',
                            borderRadius: '20px',
                            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
                            textAlign: 'center',
                            transition: 'all 0.3s ease',
                            border: '1px solid rgba(150, 211, 169, 0.3)',
                            backdropFilter: 'blur(10px)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>

                            {/* Gradient overlay */}
                            <div style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                right: '0',
                                height: '6px',
                                background: 'linear-gradient(90deg, var(--rich-amber), var(--deep-burgundy))'
                            }} />

                            <div style={{
                                width: '90px',
                                height: '90px',
                                background: 'linear-gradient(135deg, var(--rich-amber), var(--deep-burgundy))',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 30px',
                                fontSize: '36px',
                                color: 'white',
                                boxShadow: '0 15px 40px rgba(150, 211, 169, 0.4)',
                                position: 'relative'
                            }}>
                                <IonIcon name="school-outline" />

                                {/* Pulse animation ring */}
                                <div style={{
                                    position: 'absolute',
                                    width: '110px',
                                    height: '110px',
                                    border: '2px solid var(--rich-amber)',
                                    borderRadius: '50%',
                                    opacity: '0.3',
                                    animation: 'pulse 2s infinite'
                                }} />
                            </div>

                            <h4 className="training-card-title" style={{
                                color: 'var(--dark-brown-1)',
                                fontSize: '2.2rem',
                                fontWeight: '700',
                                marginBottom: '25px'
                            }}>
                                Training Completed
                            </h4>

                            <ul style={{
                                listStyle: 'none',
                                padding: '0',
                                margin: '0',
                                textAlign: 'left'
                            }}>

                                {TRAININGS.map((training, index) => (
                                    <li
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '18px',
                                            fontSize: '1.6rem',
                                            color: 'var(--warm-taupe)',
                                            padding: '12px',
                                            background: 'rgba(150, 211, 169, 0.08)',
                                            borderRadius: '10px',
                                            border: '1px solid rgba(150, 211, 169, 0.2)'
                                        }}>
                                        <span style={{
                                            width: '12px',
                                            height: '12px',
                                            background: 'var(--deep-burgundy)',
                                            borderRadius: '50%',
                                            marginRight: '18px',
                                            flexShrink: '0'
                                        }} />
                                        {training}
                                    </li>
                                ))}

                                <li className="training-item" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '1.6rem',
                                    color: 'var(--warm-taupe)',
                                    padding: '12px',
                                    background: 'rgba(150, 211, 169, 0.08)',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(150, 211, 169, 0.2)'
                                }}>
                                    <span style={{
                                        width: '12px',
                                        height: '12px',
                                        background: 'var(--deep-burgundy)',
                                        borderRadius: '50%',
                                        marginRight: '18px',
                                        flexShrink: '0'
                                    }}></span>
                                    Body Contouring
                                </li>
                            </ul>
                        </div>

                        {/* Community Service Card */}
                        <div className="training-card" style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            padding: '50px',
                            borderRadius: '20px',
                            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
                            textAlign: 'center',
                            transition: 'all 0.3s ease',
                            border: '1px solid rgba(150, 211, 169, 0.3)',
                            backdropFilter: 'blur(10px)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* Gradient overlay */}
                            <div style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                right: '0',
                                height: '6px',
                                background: 'linear-gradient(90deg, var(--rich-amber), var(--deep-burgundy))'
                            }} />

                            <div style={{
                                width: '90px',
                                height: '90px',
                                background: 'linear-gradient(135deg, var(--rich-amber), var(--deep-burgundy))',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 30px',
                                fontSize: '36px',
                                color: 'white',
                                boxShadow: '0 15px 40px rgba(150, 211, 169, 0.4)',
                                position: 'relative'
                            }}>
                                <IonIcon name="medical-outline" />
                                {/* Pulse animation ring */}
                                <div style={{
                                    position: 'absolute',
                                    width: '110px',
                                    height: '110px',
                                    border: '2px solid var(--rich-amber)',
                                    borderRadius: '50%',
                                    opacity: '0.3',
                                    animation: 'pulse 2s infinite'
                                }}></div>
                            </div>

                            <h4 className="training-card-title" style={{
                                color: 'var(--dark-brown-1)',
                                fontSize: '2.2rem',
                                fontWeight: '700',
                                marginBottom: '25px'
                            }}>
                                Research & Academic Contributions
                            </h4>

                            <div style={{
                                padding: '25px',
                                background: 'rgba(150, 211, 169, 0.08)',
                                borderRadius: '15px',
                                border: '1px solid rgba(150, 211, 169, 0.2)',
                                textAlign: 'left'
                            }}>
                                <p className="community-service-text" style={{
                                    fontSize: '1.6rem',
                                    color: 'var(--warm-taupe)',
                                    lineHeight: '1.7',
                                    margin: '0'
                                }}>
                                    Actively engages in research, contributing publications and case reports to renowned journals, while regularly attending conferences, CMEs, and trainings to enhance patient care.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section
                className="section dentist-cta"
                style={{
                    padding: '100px 0',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 255, 254, 0.9) 100%)',
                    position: 'relative'
                }}>
                <div className="custom-container text-center">

                    <TitleHeader
                        title="READY TO GET STARTED?"
                        subTitle1="Schedule Your Appointment Today"
                        className="mb-5"
                    />

                    <p
                        className="section-text"
                        style={{
                            fontSize: '1.6rem',
                            color: 'var(--warm-taupe)',
                            maxWidth: '700px',
                            margin: '0 auto 50px',
                            lineHeight: '1.7'
                        }}>
                        Experience advanced skin, hair, and laser care with Dr. Karuna Singh. Book your consultation and take the first step toward healthier skin and renewed confidence.
                    </p>
                    <Link
                        href="/#contact"
                        className="btn"
                        style={{
                            display: 'inline-block',
                            padding: '20px 40px',
                            fontSize: '1.6rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            borderRadius: '50px',
                            boxShadow: '0 15px 40px rgba(150, 211, 169, 0.4)',
                            transition: 'all 0.3s ease',
                            border: '2px solid transparent'
                        }}>
                        Book Appointment
                    </Link>
                </div>
            </section>
        </main>
    );
});

Dermatologist.displayName = "Dermatologist";