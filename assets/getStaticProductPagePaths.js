
import { promises as fs } from 'fs';
import path from 'path';
export default async function getStaticProductPagePaths({ GENDER, host }) {

    const jsonDirectory = path.join(process.cwd(),  `assets/${GENDER}`);
    
    //Read the json data file data.json
    const categoriesRaw = await fs.readFile(jsonDirectory + '/category-nav-counter.json', 'utf8');
    
    const categories = JSON.parse(categoriesRaw)
    const data = Object.values(categories).flat().filter(f => f.count !== undefined);

    const paths = data.map(m => {
        return { params: { slug: [m.groupName.toLowerCase().replace(' ', '-'), m.title, 'sayfa', '1'], gender: GENDER } }
    })

    return { paths, fallback: true }
}