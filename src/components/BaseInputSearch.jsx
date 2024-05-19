

export function Input ({type='base', search, setCurrentKeyword, currentKeyword, placeholder="Поиск в документе"}) {

    const handlerChange = (e) => {
        let searchText = e.target.value
        
        setCurrentKeyword({
            keyword: searchText,
            matchCase: currentKeyword.matchCase,
            wholeWords: currentKeyword.wholeWords,
        });
    }

    const handlerKeyDown = (e) => {
        if (e.key === 'Enter' && currentKeyword.keyword) {
            search(currentKeyword);
        }
    }

    return (
        <input
            style={{padding: '4px', width: '250px', borderRadius:'4px', border:'0.5px solid gray'}}
            placeholder={placeholder}
            type="text"
            value={"string" === typeof(currentKeyword.keyword) ? currentKeyword.keyword : currentKeyword.keyword[0]}
            onChange={(e) => {handlerChange(e)}}
            onKeyDown={(e) => {handlerKeyDown(e)}}
        />
    )
}