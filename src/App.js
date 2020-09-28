import React, { useEffect, useState } from 'react';
import './App.css';
import Container from "react-bootstrap/Container"

import ProductList from "./components/ProductList";
import CategoryList from './components/CategoryList';

function App() {
  const [ categoryList, setCategoryList ] = useState([]);
  const [ productList, setProductList ] = useState([]);


  useEffect(()=>{

    fetch("https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob")
      .then(res => res.json())
      .then((data)=>{
        setCategoryList(data.category_list);
        setProductList(data.product_list.products);
      })
  },[])

  function showCategory(id){
    fetch(`https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=${id}`)
            .then(response => response.json())
            .then((data)=> {
                console.log(`data : ${id}`,data)
                setProductList(data.products);
            });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ustra</h1>
      </header>
      <Container>
        <CategoryList list={categoryList} showCategory={showCategory} />
        </Container>
      <Container>
      <ProductList list={productList} />
      </Container>
      <footer className="App-footer">
        <h2>Here goes the footer</h2>
      </footer>
    </div>
  );
}

export default App;
