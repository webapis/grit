export default async function getStaticProductPagePaths({GENDER,host}){
    const categories = await fetch(
        `${host}/category-nav-counter.json`
    ).then((response) => response.json())

    const data = Object.values(categories).flat().filter(f => !NaN( f.count) && f.count>0);

    const paths = data.map(m => {
        return { params: { slug: [m.groupName.toLowerCase().replace(' ', '-'), m.title, 'sayfa', '1'],gender:GENDER } }
    })

    return { paths, fallback: 'blocking' }
}