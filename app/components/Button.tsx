interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant: 'primary-outline' | 'secondary-outline' | 'secondary' | 'default';
    type :  'button' | 'submit' | 'reset';
    width : 'w-fit'|'w-full'

}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant ,width,type}) => {
    let className;

    switch (variant) {
        case 'primary-outline':
            className = 'border border-primary text-primary bg-transparent hover:bg-primary hover:text-secondary';
            break;
        case 'secondary-outline':
            className = 'border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-primary';
            break;
        case 'secondary':
            className = 'bg-secondary text-primary ';
            break;
        default:
            className = 'bg-primary text-secondary ';
            break;
    }

    return (
        <button type={type} className={`${width} h-fit py-2 px-4 rounded ${className} active:scale-95 transition-all`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
