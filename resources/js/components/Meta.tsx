import { Head } from '@inertiajs/react';

export default function Meta({ title, description, image }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {image && <meta property="og:image" content={image} />}
        </Head>
    );
}
