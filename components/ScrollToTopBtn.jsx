import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
export default function ScrollToTopBtn() {
    function handleClick() {
        window.scrollTo(0, 0);
    }
    return <Fab size='small' onClick={handleClick} color="secondary" sx={{ position: 'fixed', bottom: '5%', right: 20 }}>
        <NavigationIcon />

    </Fab>
}