import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import getSelectedNavIndex from './getSelectedNavIndex';
function containsNumbers(str) {
    return /\d/.test(str);
}
export default function BreadCrumb({keywordgroup}) {
   // const searchParams = new URLSearchParams(location.search);
   let selectedNavIndex=''
    if(location.href.includes('page')){
         selectedNavIndex =getSelectedNavIndex({keywordgroup,href:location.href}) //searchParams.get('index')
    }

    function handleClick({ event, keyword }) {
        event.preventDefault()
        const index = localStorage.getItem(`${keyword}-index`)

        debugger
        const indexExist = selectedNavIndex.split('-').find(f => index !== "" && index.replace('-', "") === f)
        let selectedIndex = null
        if (indexExist) {
            debugger
            selectedIndex = selectedNavIndex.split('-').filter(f => f !== "" && f !== indexExist).map(m => parseInt(m)).sort((a, b) => a - b).map(m => m + "-").join('')
        }
        else {
            debugger
            selectedIndex = selectedNavIndex.concat(index).split('-').filter(f => f !== "").map(m => parseInt(m)).sort((a, b) => a - b).map(m => m + "-").join('')
        }
        debugger
        const urlKeywords = containsNumbers(keyword) ? keyword : keyword.replace(' ', '-')
        debugger
        const nextUrl = `${decodeURI(location.pathname).replace(`/${urlKeywords}`, '')}?page=1`
        debugger
        location.replace(nextUrl)
    }

    const bcrumbs = decodeURI(location.pathname)
        .split("/")
        .filter((f) => f !== "");

    return <div><Breadcrumbs separator="›" aria-label="breadcrumb" >
        <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href="/"
        >
            <HomeIcon fontSize="inherit" />
            Anasayfa
        </Link>

        {bcrumbs.map((m, i) => {
            let href = ''
            if (i === 0) {
                href = `/#${m.replace(/ö/g, "o")
                    .replace(/ş/g, "s")
                    .replace(/ı/g, "i")
                    .replace(/ç/g, "c")
                    .replace(/ğ/g, "g")}`


            } else {

                if (i === bcrumbs.length - 1) {
                   
                    localStorage.setItem(m, window.location.href)
                    href = window.location.href
                } else {
                    href = localStorage.getItem(m)
                }
              
            }
            const match = i === bcrumbs.length - 1
            if (match) {
                return <Typography key={i} color="text.primary">{m}</Typography>
            }

            return <Link key={i} underline={'hover'} color="inherit" href={href} >
                {m}
            </Link>
        })}
    </Breadcrumbs>
        <Stack direction="row" spacing={1}>
            {bcrumbs.filter((f, i) => i >= 2).map(keyword => {
                const urlKeywords = containsNumbers(keyword) ? keyword : keyword.replace(' ', '-')
                debugger
                return <Chip key={keyword} size='small' label={keyword} onDelete={(event) => handleClick({ event, keyword: urlKeywords })} />
            })}

        </Stack>
    </div>
}