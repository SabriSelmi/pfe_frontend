import React, { useState, useEffect } from 'react';
import CommentaireService from '../services/CommentaireService';
import { FaComment } from 'react-icons/fa'; 
import './ListComment.css'

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await CommentaireService.GetAll();
        setComments(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (comments.length === 0) {
    return <div className="no-comments">No comments found.</div>;
  }

  return (
    <div className="comment-list-container">
      <h3 className="comment-list-title">Comment List</h3>
      <div className="row">
        {comments.map((comment) => (
          <div key={comment._id} className="col-md-4">
            <div className="card comment-card">
              <div className="card-body">
                <FaComment className="comment-icon" />
                <h5 className="card-title">{comment.auteur?.username}</h5>
                <p className="card-text">{comment.contenu}</p>
                <p className="card-text"><strong>Announcement:</strong> {comment.annonce?.titre}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
