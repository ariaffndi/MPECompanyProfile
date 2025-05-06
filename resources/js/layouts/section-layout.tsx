import React from 'react';

type Props = {
    children: React.ReactNode;
};

const SectionLayout: React.FunctionComponent<Props> = ({ children }) => {
    return (
        <div className='p-10 gap-y-5'>
            <main>{children}</main>
        </div>
    );
};

export default SectionLayout;