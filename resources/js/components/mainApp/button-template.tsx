type btnSize = {
    size: string;
    children: React.ReactNode;
};

const ButtonTemplate: React.FC<btnSize> = ({ size, children }) => {
    return <div className={`btn my-4 ${size} w-fit rounded-lg border-none bg-sky-500 text-white shadow-none hover:bg-sky-600`}>{children}</div>;
};

export default ButtonTemplate;
