import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/add-post.css';

const AddPost = () => {
  const [caption, setCaption] = useState('');
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // post submission logic here
    console.log('Submitting post:', { caption, files });
    navigate('/');
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  return (
    <div className="add-post-page">
      <div className="post-container">
        <h2>Create New Post</h2>
        <form className="post-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="caption">Caption</label>
            <textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={2200}
              placeholder="Write your caption..."
            />
          </div>

          <div className="form-group file-upload-group">
            <label htmlFor="file-upload" className="upload-button">
              Upload Photos/Videos
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />

            <div className="file-previews">
              {files.map((file, index) => (
                <div key={index} className="file-preview">
                  {file.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
                  ) : (
                    <video controls>
                      <source src={URL.createObjectURL(file)} type={file.type} />
                    </video>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-button">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;