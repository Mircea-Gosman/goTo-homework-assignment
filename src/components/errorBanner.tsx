import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

function ErrorBanner(props: { setHasError: Function, className?: string}) {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                props.setHasError(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`absolute bottom-10 w-full bg-warning text-lightText z-50 rounded-md ${props.className}`} ref={ref}>
            <div className="flex items-center justify-center h-full w-full">
                { t('dashboard.errorBanner') }
            </div>
        </div>
    );
}

export default ErrorBanner;
  