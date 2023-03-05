import React from 'react';

const NotFoundPage = () => {
    return (
        <main
            style={{
                height: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <div
                className="flex items-center"
            >
                <h1 className="text-5xl">404</h1>
                <div className="ml-6">
                    <p>Такой страницы нет</p>
                </div>
            </div>
        </main>
    );
};

export default NotFoundPage;