"use client";

import { SubscriptionFormData, SubscriptionFormSchema } from "@/middlewares/schema";
import { onSubscriptionSubmit } from "@/utils/subscriptionData";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { memo, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "./Alert";
import { InputField } from "./utility/InputField";
import { SubmitButton } from "./utility/Button/SubmitButton";

interface AlertState {
    isVisible: boolean;
    type: "success" | "error";
    title?: string;
    message: string;
}

const initialSubscriptionValues: SubscriptionFormData = {
    email: "",
};

export const Hero = memo(() => {
    const [alertState, setAlertState] = useState<AlertState>({
        isVisible: false,
        type: "success",
        message: "",
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        }
    } = useForm<SubscriptionFormData>({
        defaultValues: initialSubscriptionValues,
        resolver: zodResolver(SubscriptionFormSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        criteriaMode: "all",
        shouldFocusError: true,
    });

    const showAlert = useCallback((
        type: AlertState["type"],
        message: string,
        title?: string
    ) => {
        setAlertState({
            isVisible: true,
            type,
            message,
            title,
        });
    }, []);

    const hideAlert = useCallback(() => {
        setAlertState(prev => ({
            ...prev,
            isVisible: false,
        }));
    }, []);

    const handleSubscriptionSubmit = useCallback(async (data: SubscriptionFormData) => {
        try {
            await onSubscriptionSubmit(data);

            showAlert(
                "success",
                "Thank you for subscribing! You'll receive our latest news and offers.",
                "Successfully Subscribed!"
            );

            reset(initialSubscriptionValues);
        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : "Something went wrong while subscribing. Please try again.";

            showAlert(
                "error",
                errorMessage,
                "Subscription Failed"
            );

            console.error('Subscription error:', error);
        }
    }, [reset, showAlert]);

    const onSubscriptionFormSubmit = handleSubmit(handleSubscriptionSubmit);

    const isButtonDisabled = useMemo(
        () => isSubmitting,
        [isSubmitting]
    );

    const subscriptionButtonText = useMemo(
        () => isSubmitting ? "Subscribing..." : "Subscribe",
        [isSubmitting]
    );

    return <>
        <Alert
            type={alertState.type}
            title={alertState.title}
            message={alertState.message}
            isVisible={alertState.isVisible}
            onDismiss={hideAlert}
            autoDismiss={true}
            autoDismissDelay={6000}
            className="sm:max-w-md"
        />

        <section
            className="section hero"
            id="home"
            style={{ "backgroundImage": "url('/images/hero-bg.webp')" } as React.CSSProperties}
            aria-label="hero"
        >
            <div className="custom-container">
                <div className="hero-content">
                    <p className="section-subtitle">Welcome To Karuna Skin Clinic</p>
                    <h1 className="h25 hero-title">We Are The Best Skin Care Service Provider In Town</h1>
                    <p className="text-[var(--warm-beige_50] mb-10 leading-[1.45] text-[length:var(--fontSize-6)]">
                        Transforming skin and confidence with precision, care, and cutting-edge laser technology. Experience results that exceed expectations.
                    </p>
                    <form
                        className="hero-form"
                        onSubmit={onSubscriptionFormSubmit}
                        noValidate
                    >

                        <InputField
                            id="email"
                            type="email"
                            placeholder="Your email Address..."
                            register={register("email")}
                            error={errors.email?.message}
                            disabled={isSubmitting}
                            className="email-field"
                        />

                        <SubmitButton
                            isButtonDisabled={isButtonDisabled}
                            btnText={subscriptionButtonText}
                        />

                    </form>
                </div>

                <figure className="hero-banner">
                    <Image
                        src="/images/hero-banner.png"
                        width={587}
                        height={839}
                        alt="hero banner"
                        className="w-fill"
                    />
                </figure>

            </div>
        </section>
    </>
});

Hero.displayName = "Hero";