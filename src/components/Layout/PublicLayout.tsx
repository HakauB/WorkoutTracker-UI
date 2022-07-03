import { Link } from 'react-router-dom';
import header from '../../assets/header.png';

type PublicLayoutProps = {
    children: React.ReactNode;
}

export const PublicLayout = (props: PublicLayoutProps) => {
    return (
        <>
            <div>
                <Link to="/">
                    <img src={header} alt='header' />
                </Link>
            </div>
            {props.children}
        </>
    )
}