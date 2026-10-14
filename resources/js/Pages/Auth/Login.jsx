import { AuthBadge, CheckBox, Divider, IconField, SocialButtons, TrustRow, submitClass } from '@/Components/Cyber/AuthParts';
import { LockIcon, MailIcon } from '@/Components/Cyber/Icons';
import CyberAuthLayout from '@/Layouts/CyberAuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword = true }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <CyberAuthLayout
            navPrompt="Don't have an account?"
            navLabel="Register"
            navHref={route('register')}
            navPrimary
        >
            <Head title="Login" />

            <div className="text-center">
                <AuthBadge>Secure sign-in</AuthBadge>
                <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Welcome back to{' '}
                    <span className="bg-gradient-to-r from-[#52FFB8] to-[#FFF385] bg-clip-text text-transparent">Cyber Trade</span>
                </h1>
                <p className="mt-3 text-sm text-neutral-400">
                    Sign in to access your dashboard, manage listings, and track live inventory.
                </p>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-neutral-900/60 p-6 shadow-2xl shadow-black/40 sm:p-8">
                <SocialButtons />
                <Divider>or continue with email</Divider>

                {status && <div className="mb-4 text-sm font-medium text-[#52FFB8]">{status}</div>}

                <form onSubmit={submit} className="space-y-5">
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

                    <IconField
                        id="password"
                        label="Password"
                        icon={LockIcon}
                        toggle
                        required
                        autoComplete="current-password"
                        placeholder="••••••••"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        error={errors.password}
                        labelRight={
                            canResetPassword && (
                                <Link href={route('password.request')} className="text-xs font-medium text-[#52FFB8] transition hover:text-[#FFF385]">
                                    Forgot password?
                                </Link>
                            )
                        }
                    />

                    <CheckBox checked={data.remember} onChange={(e) => setData('remember', e.target.checked)}>
                        Remember me
                    </CheckBox>

                    <button type="submit" disabled={processing} className={submitClass}>
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-400">
                    Don't have an account?{' '}
                    <Link href={route('register')} className="font-semibold text-[#52FFB8] transition hover:text-[#FFF385]">
                        Create one free
                    </Link>
                </p>
            </div>

            <TrustRow />
        </CyberAuthLayout>
    );
}
