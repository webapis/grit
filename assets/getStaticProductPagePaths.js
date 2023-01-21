export default async function getStaticProductPagePaths({ GENDER, host }) {
    const categoriesResponse = await fetch(
        `${host}/category-nav-counter.json`
    )
    const categories = await categoriesResponse.json()
    const data = Object.values(categories).flat().filter(f => f.count !== undefined);

    const paths = data.map(m => {
        return { params: { slug: [m.groupName.toLowerCase().replace(' ', '-'), m.title, 'sayfa', '1'], gender: GENDER } }
    })

    return { paths, fallback: 'blocking' }
}