

import { useRouter } from 'next/router';
function ProductPage({ greet = 'hello' }) {
    const router = useRouter();

    console.log(router.pathname);
    console.log(router.query);
    return (
        <ul>
            Product Page {greet}
        </ul>
    )
}


export async function getStaticProps(context) {
    debugger
    console.log('context', context)
    debugger
    // const categories = await fetch(
    //     `${process.env.HOST}/category-nav-counter.json`
    // ).then((response) => response.json())
    // debugger
    // const data = Object.entries(categories);

    return {
        props: {}, // will be passed to the page component as props
        revalidate: 10
    }
}

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
    const categories = await fetch(
        `${process.env.HOST}/category-nav-counter.json`
    ).then((response) => response.json())

    const data = Object.values(categories).flat();

    const paths = data.map(m => {
        return { params: { group: m.groupName.toLowerCase().replace(' ', '-'), cat: m.title, id: '1' } }

    })

    return { paths, fallback: true }
}




export default ProductPage