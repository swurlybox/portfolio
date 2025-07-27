import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { Post } from './models/post';

function App() {

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts(){
      try {
        const response = await fetch("/api/posts", { method: "GET"});
        const posts = await response.json();
        setPosts(posts)
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadPosts();
  }, []);

  return (
    <div className="App">
      {JSON.stringify(posts)}
    </div>
  );
}

export default App;
