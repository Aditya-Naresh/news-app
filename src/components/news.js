import React, { useState, useEffect } from 'react';
import './news.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';



function News() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(8);
  
    useEffect(() => {
      const fetchArticles = async () => {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=latest&apiKey=a8a686d3289243549e83efad3831e7cd`
        );
        const data = await res.json();
        setArticles(data.articles);
        setLoading(false);
      };
  
      fetchArticles();
    }, []);
  
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
    const pages = [];
  
    for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
      pages.push(i);
    }
  
    return (
      <div className="container-fluid news-container">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {currentArticles.map((article) => (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={article.url}>
                <div className="card news-card">
                  <img src={article.urlToImage} className="card-img-top news-img" alt={article.title} />
                  <div className="card-body">
                    <h5 className="card-title news-title">{article.title}</h5>
                    <p className="card-text news-description">{article.description}</p>
                    <a href={article.url} className="btn btn-primary news-link" target="_blank" rel="noreferrer">
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center news-pagination">
            {pages.map((page) => (
              <li className="page-item" key={page}>
                <button
                  className={`page-link news-page-link ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }

  export default News
  