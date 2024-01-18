export default function FullscreenSpinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75" style={{ zIndex: 999 }}>
            <svg className="spinner-ring" viewBox="25 25 50 50" strokeWidth="5">
                <circle cx="50" cy="50" r="20" />
            </svg>
        </div>
    );
}
