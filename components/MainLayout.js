import Link from 'next/link';
import Head from 'next/head';

export function MainLayout({ children, title }) {
    return (
        <>
            <Head>
                <title>
                    {title}
                </title>
                <meta name="keywords" content="Посты, JS" />
                <meta name="description" content="Обучаюсь" />
                <meta charSet="utf-8" />
            </Head>
            <h1 className="header__text">Статистика по COVID-19</h1>
            <main>
                {children}
            </main>
        </>
    )
}