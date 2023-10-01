import React from 'react'

const NewsItem = (props)=> {
    let {title, description, imgUrl, newsUrl, author, pubDate, source} = props;
    return (
      <div className="mb-4">
        <div className="card">
          <div className="d-flex justify-content-end">
            <h5 className="position-absolute">
              <span className="badge bg-danger">{source}</span>
            </h5>
          </div>
          <img src={imgUrl?imgUrl:"https://images.wsj.net/im-851609/social"} className="card-img-top" alt="News Thumbnail"/>
          <div className="card-body">
            <p className="card-text"><strong>Author:</strong> {author?author:"Unknown"}</p>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className='text-muted'>
                <strong>Published at:</strong> {new Date(pubDate).toGMTString()}
              </small>
            </p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem