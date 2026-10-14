import { AuthBadge, CheckBox, Divider, IconField, SocialButtons, TrustRow, submitClass } from '@/Components/Cyber/AuthParts';
import { LockIcon, MailIcon, UserIcon } from '@/Components/Cyber/Icons';
import CyberAuthLayout from '@/Layouts/CyberAuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

const STRENGTH = [
    { label: 'Use 8+ characters with a mix of letters, numbers & symbols', color: 'bg-white/10' },
    { label: 'Weak password', color: 'bg-red-400' },
    { label: 'Fair password', color: 'bg-[#FFF385]' },
    { label: 'Good password', color: 'bg-[#2BE39A]' },
    { label: 'Strong password', color: 'bg-[#52FFB8]' },
];

function getStrength(v) {
    let score = 0;
    if (v.length >= 8) score++;
    if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
    if (/\d/.test(v)) score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;
    return score;
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [terms, setTerms] = useState(false);

    const score = getStrength(data.password);
    const meta = STRENGTH[data.password.length === 0 ? 0 : score];

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    return (
        <CyberAuthLayout navPrompt="Already have an account?" navLabel="Login" navHref={route('login')}>
            <Head title="Create Account" />

            <div className="text-center">
                <AuthBadge>Join the marketplace</AuthBadge>
                <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Create your{' '}
                    <span className="bg-gradient-to-r from-[#52FFB8] to-[#FFF385] bg-clip-text text-transparent">Cyber Trade</span>{' '}
                    account
                </h1>
                <p className="mt-3 text-sm text-neutral-400">
                    Start trading, listing inventory, and tracking real-time orders in minutes — free to get started.
                </p>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-neutral-900/60 p-6 shadow-2xl shadow-black/40 sm:p-8">
                <SocialButtons />
                <Divider>or sign up with email</Divider>

                <form onSubmit={submit} className="space-y-5">
                    <IconField
                        id="name"
                        label="Full name"
                        icon={UserIcon}
                        required
                        autoComplete="name"
                        placeholder="Jane Carter"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                    />

                    <IconField
                        id="email"
                        label="Email address"
                        icon={MailIcon}
                        type="email"
                        required
                        autoComplete="username"
                        placeholder="you@company.com"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        error={errors.email}
                    />

                    <div>
                        <IconField
                            id="password"
                            label="Password"
                            icon={LockIcon}
                            toggle
                            required
                            minLength={8}
                            autoComplete="new-password"
                            placeholder="Create a password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                        />
                        <div className="mt-2 flex gap-1.5">
                            {[0, 1, 2, 3].map((i) => (
                                <span key={i} className={`h-1 flex-1 rounded-full transition ${i < score ? meta.color : 'bg-white/10'}`} />
                            ))}
                        </div>
                        <p className="mt-1.5 text-xs text-neutral-500">{meta.label}</p>
                    </div>

                    <IconField
                        id="password_confirmation"
                        label="Confirm password"
                        icon={LockIcon}
                        type="password"
                        required
                        autoComplete="new-password"
                        placeholder="Re-enter your password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        error={errors.password_confirmation}
                    />

                    <CheckBox checked={terms} onChange={(e) => setTerms(e.target.checked)} required>
                        I agree to the{' '}
                        <a href="#" className="font-medium text-[#52FFB8] transition hover:text-[#FFF385]">Terms of Service</a> and{' '}
                        <a href="#" className="font-medium text-[#52FFB8] transition hover:text-[#FFF385]">Privacy Policy</a>
                    </CheckBox>

                    <button type="submit" disabled={processing} className={submitClass}>
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-400">
                    Already have an account?{' '}
                    <Link href={route('login')} className="font-semibold text-[#52FFB8] transition hover:text-[#FFF385]">
                        Sign in
                    </Link>
                </p>
            </div>

            <TrustRow />
        </CyberAuthLayout>
    );
}
