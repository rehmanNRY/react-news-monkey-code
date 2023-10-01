import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Snipper from './Snipper';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [loading, setLoading] = useState(true);
  const capFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const updateNews = async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let dataJson = await data.json();
    props.setProgress(70);
    setArticles(dataJson.articles);
    setTotalArticles(dataJson.totalResults);
    setLoading(false);
    props.setProgress(100);
  }
  useEffect(() => {
    document.title = `${capFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page+1}`;
    setPage(page+1);
    let data = await fetch(url);
    let dataJson = await data.json();
    setArticles(articles.concat(dataJson.articles));
    setTotalArticles(dataJson.totalResults);
  }
    return (
      <>
        <h1 className="text-center" style={{margin: "80px 0 25px 0"}}>
          <strong>NewsMonkey - Top {capFirstLetter(props.category)} Headlines</strong>
        </h1>
        {loading && <Snipper/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalArticles}
          loader={<Snipper/>}
        >
          <div className="container">
            {<div className="row">
              {articles.map((element)=>{
                return <div className="col-sm-4" key={element.url}>
                <NewsItem
                  key={page}
                  title={element.title?element.title:""}
                  description={element.description?element.description:""}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  source={element.source.name}
                  pubDate={element.publishedAt}/>
              </div>
              })}
            </div>}
          </div>
        </InfiniteScroll>
      </>
    )
}
News.defaultProps = {
  country: 'us',
  category: 'general',
  pageSize: 20
}
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
  apiKey: PropTypes.string
}

export default News