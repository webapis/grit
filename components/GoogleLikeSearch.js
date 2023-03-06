import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import keywords from '../assets/keywords.json'

export default function GoogleLikeSearch() {

console.log('keywords',keywords)
    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
    }

    const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }
    const formatResult = (item) => {
    console.log('item',item)
        return (
          <>
            {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.index}</span> */}
            <span style={{ display: 'block', textAlign: 'left' }}>name: {item.keywords}</span>
          </>
        )
      }
    return (
        <div className="App">
            <header className="App-header">
                <div style={{ width: 400 }}>
                    <ReactSearchAutocomplete
                        items={keywords.map((m)=>{return {...m,id:m.index,name:m.title}})}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus
                        // formatResult={formatResult}
                    />
                </div>
            </header>
        </div>
    )

}