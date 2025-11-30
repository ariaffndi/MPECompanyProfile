import { useEffect, useState } from 'react';

interface Props {
    phone?: string;
    message?: string;
    targetId: string;
}

export default function WhatsAppFloatingButton({
    phone = '',
    message = '',
    targetId,
}: Props) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const target = document.getElementById(targetId);
        if (!target) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // visible = muncul ketika hero sudah lewat
                setVisible(!entries[0].isIntersecting);
            },
            { threshold: 0.1 },
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [targetId]);

    return (
        <div
            className={`fixed right-6 bottom-6 z-50 transition-all duration-500 ease-out ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0'} `}
        >
            <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-xl transition hover:bg-green-600"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 24 24">
                    <path d="M20.52 3.48A11.8 11.8 0 0012 0C5.38 0 .26 5.12.26 11.74c0 2.07.54 4.1 1.56 5.9L0 24l6.5-1.7a11.78 11.78 0 005.5 1.38h.01c6.62 0 11.74-5.12 11.74-11.74 0-3.14-1.23-6.09-3.47-8.33zM12 21.33h-.01a9.54 9.54 0 01-4.86-1.33l-.35-.2-3.86 1 1.03-3.76-.23-.39a9.6 9.6 0 01-1.47-5.14A9.53 9.53 0 0112 2.47a9.56 9.56 0 019.54 9.54c0 5.27-4.27 9.52-9.54 9.52zm5.41-7.16c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.66.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.51-1.78-1.69-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.91-2.18-.24-.58-.49-.5-.66-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1-1.04 2.45s1.07 2.84 1.22 3.04c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.48 1.7.61.71.23 1.36.2 1.87.12.57-.08 1.77-.73 2.02-1.44.25-.71.25-1.32.17-1.44-.07-.12-.26-.2-.56-.35z" />
                </svg>
            </a>
        </div>
    );
}
