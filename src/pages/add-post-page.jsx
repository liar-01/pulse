import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFile, FiCode, FiArchive, FiX } from 'react-icons/fi';
import '../styles/add-post-page.css';
import '../styles/styles.css';
import '../styles/dark-mode.css';

const AddPostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);

  const getFileType = (file) => {
    const type = file.type.split('/')[0];
    const extension = file.name.split('.').pop().toLowerCase();
    
    const codeExtensions = ['js', 'jsx', 'html', 'css', 'py', 'java', 'cpp', 'json'];
    const archiveExtensions = ['zip', 'rar', '7z', 'tar', 'gz'];
    
    if (type === 'image') return 'image';
    if (type === 'video') return 'video';
    if (codeExtensions.includes(extension)) return 'code';
    if (archiveExtensions.includes(extension)) return 'archive';
    return 'file';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('caption', caption);
    files.forEach(file => formData.append('files', file));
    
    console.log('Submitting:', { title, caption, files });
    alert('Post submitted successfully!');
    resetForm();
    navigate('/'); // Navigation
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newPreviews = newFiles.map(file => ({
      file,
      type: getFileType(file),
      preview: URL.createObjectURL(file)
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    setFilePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = filePreviews.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setFilePreviews(updatedPreviews);
  };

  const resetForm = () => {
    setTitle('');
    setCaption('');
    setFiles([]);
    setFilePreviews([]);
  };

  return (
    <div className="add-post-page">
      <div className="post-container">
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="title">Title (max 30 characters)</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 30))}
              maxLength={30}
              required
            />
            <div className={`character-counter ${title.length >= 25 ? 'warning' : ''}`}>
              {title.length}/30
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="caption">Caption</label>
            <textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          <div className="form-group file-upload-group">
            <label className="file-upload-label">
              Upload Files
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                hidden
              />
              <span className="upload-button">Choose Files</span>
            </label>
            
            <div className="file-previews">
              {filePreviews.map((preview, index) => (
                <div key={index} className={`file-preview ${preview.type}`}>
                  <button type="button" className="remove-file" onClick={() => removeFile(index)}>
                    <FiX />
                  </button>
                  
                  {preview.type === 'image' && (
                    <img src={preview.preview} alt="Preview" />
                  )}
                  
                  {preview.type === 'video' && (
                    <video controls>
                      <source src={preview.preview} type={preview.file.type} />
                    </video>
                  )}
                  
                  {(preview.type === 'code' || preview.type === 'archive') && (
                    <div className="file-info">
                      {preview.type === 'code' ? <FiCode /> : <FiArchive />}
                      <span>{preview.file.name}</span>
                    </div>
                  )}
                  
                  {preview.type === 'file' && (
                    <div className="file-info">
                      <FiFile />
                      <span>{preview.file.name}</span>
                      <small>{preview.file.type}</small>
                    </div>
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

export default AddPostPage;