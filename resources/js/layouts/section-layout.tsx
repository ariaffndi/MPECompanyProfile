import React from 'react';

type Props = {
    children: React.ReactNode;
};

const SectionLayout: React.FunctionComponent<Props> = ({ children }) => {
    return (
        <div className='p-5 md:p-10 lg:p-15 xl:p-20 gap-y-5 bg-base-200'>
            {children}
        </div>
    );
};

export default SectionLayout;