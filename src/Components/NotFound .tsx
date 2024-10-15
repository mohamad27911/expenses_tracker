import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center text-white">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="mt-4 text-lg">The page you're looking for doesn't exist.</p>
            <Link to="/" className="mt-6 px-4 py-2 rounded-full bg-expense hover:bg-red-700">
               
                    Go Back Home
                
            </Link>
        </div>
    );
};

export default NotFound;
