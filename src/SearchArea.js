import React, { useEffect, useState, useContext } from "react";
import Results from "./Results";
import axios from "axios";
import * as  AppConstant from "./AppConstant";
import useDropdown from "./useDropdown";
import ColorContext from "./ColorContext";


const SearchArea = (props) => {

    const [themeColor, setThemeColor] = useContext(ColorContext);
    const [keyword, setKeyword] = useState("");
    const [videos, setVideos] = useState([]);

    const [order, OrderDropdown] = useDropdown("Ordenar por", "relevance", [
        "date",
        "relevance",
        "rating",
        "title",
        "viewCount"
    ]);

    const [safeSearch, SafeSearchDropdown] = useDropdown("Busqueda segura", "none", ["moderate", "none", "strict"]);

    const [checked, setCheck] = useState(true)

    const [advanceParams, setAdvanceParams] = useState(``);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (checked) {
            setAdvanceParams(`&order=${order}&safesearch=${safeSearch}`)
        }
        else {
            setAdvanceParams(``)
        }

    }, [checked, order, safeSearch])



    const requestSearch = () => {
        setLoading(true);
        axios.get(`${AppConstant.SEARCH_URL}&q=${keyword}${advanceParams}`)
            .then((res) => {
                const { items } = res.data;
                console.log(items);
                setVideos(items);
                setLoading(false);

            })
            .catch((err) => console.log(err))
    }

    return (

        <div className="search-area">
            <form onSubmit={(e) => {
                e.preventDefault();
                requestSearch();
            }}>
                <label htmlFor="keyword">
                    Buscar
                    <input
                        type="text"
                        id="keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </label>
                <label htmlFor="advanced">
                    Busqueda avanzada
                    <input type="checkbox"
                        id="advanced"
                        checked={checked}
                        onChange={() => setCheck(!checked)}
                    />
                </label>

                {
                    checked ? <div>
                        <OrderDropdown />
                        <SafeSearchDropdown />
                        <label htmlFor="themeColor">
                            Theme Color
                            <select
                                value={themeColor}
                                onChange={(e) => setThemeColor(e.target.value)}
                                onBlur={(e) => setThemeColor(e.target.value)}
                            >
                                <option value="#ad343e">Dark Red</option>
                                <option value="darkblue">Dark Blue</option>
                                <option value="green">Green</option>
                                <option value="aqua">Aqua</option>
                            </select>
                        </label>
                    </div> : null

                }



                <button style={{ backgroundColor: themeColor }}>Buscar</button>
            </form>
            <Results videos={videos} loading={loading} />

        </div>
    )

}
export default SearchArea;