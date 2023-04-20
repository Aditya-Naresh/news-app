import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';

const NewsList = () => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        const getArticiles = async () => {
            const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=a8a686d3289243549e83efad3831e7cd')
            console.log(response);
            setArticles(response.data.articles)
        }
        getArticiles()
    }, [])

    return (
        <div>
            {articles.map(article => {
                return(
                    <NewsItem
                        title={article.title}
                        description={article.description}
                        url={article.url}
                        urlToImage={article.urlToImage}
                    />
                )
            })}
        </div>
    )
}

export default NewsList