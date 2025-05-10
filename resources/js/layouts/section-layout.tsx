import React from 'react';

type Props = {
    children: React.ReactNode;
};

const SectionLayout: React.FunctionComponent<Props> = ({ children }) => {
    return (
        <div className='p-5 md:p-8 lg:p-10 gap-y-5 bg-base-200'>
            {children}
        </div>
    );
};

export default SectionLayout;