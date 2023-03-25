import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { connect } from "react-redux";

const NavbarSearch = ({ products }) => {
    const navigate = useNavigate();
    const [ filterItems, setFilterItems ] = useState([]);
    const [ searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("query");
    const [ search, setSearch ] = useState(`${searchQuery || ""}`);

    const searchItems = () => {
        if (search.trim()) {
            const filteredArray = products.filter(item =>
                item.title_en.toLowerCase().includes(search.toLowerCase().trim())
            );
            setFilterItems(filteredArray);
        } else {
            setFilterItems([]);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(search.trim()) navigate(`/search?query=${search}`, {replace: true});
    }
    
    useEffect(() => {
        searchItems();
    }, [search]);

    return (
        <form 
            action="" 
            method="post" 
            className="navbar-search col-span-6 relative h-full flex items-center justify-between"
            onSubmit={handleSubmit}    
        >
            <input
                type="search"
                className="pl-5 pr-2"
                placeholder="Поиск"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <AiOutlineSearch
                onClick={() => {
                    navigate(`/search?query=${search}`, {replace: true})
                }}
                type="submit"
                className="cursor-pointer hover:!fill-yellow-500 ml-auto mr-3"
                fill="#534343"
                style={{ zIndex: "1" }}
                size={24}
            />
            <div
                className="search-category py-1"
                style={{
                    maxHeight: "320px",
                    overflowY: "scroll",

                }}
            >
                {filterItems.map((item) => (
                    <Link key={item.id} to={`/product/${item.id}`}>
                        <div className="flex items-center gap-x-6 px-5 py-3" key={item.id}>
                            <AiOutlineSearch fill="#534343" size={24} />
                            {item.title_en}
                        </div>
                    </Link>
                ))}
            </div>
        </form>
    );
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
} 

export default connect(mapStateToProps, null)(NavbarSearch);