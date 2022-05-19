import React from "react";

type Props = {
    name: string,
    children?: React.ReactNode,
}

const Page = ({ name, children }: Props) => {
    return (
        <div className="page">
            <h1 className="page-header">{name}</h1>
            <div className="page-content">{children}</div>
        </div>
    );
};

export default Page;