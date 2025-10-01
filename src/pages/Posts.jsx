import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Posts = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'João Silva',
      avatar: '/img/usuario.png',
      time: '2h',
      content: 'Acabei de lançar meu primeiro projeto em React! 🚀 Alguém tem dicas para melhorar a performance?',
      likes: 15,
      comments: 8,
      isLiked: false,
      tags: ['React', 'JavaScript', 'Frontend']
    },
    {
      id: 2,
      author: 'Maria Santos',
      avatar: '/img/usuario.png',
      time: '4h',
      content: 'Compartilhando um tutorial sobre Node.js que criei. Espero que ajude a comunidade! 💡',
      likes: 32,
      comments: 12,
      isLiked: false,
      tags: ['Node.js', 'Backend', 'Tutorial']
    },
    {
      id: 3,
      author: 'Pedro Costa',
      avatar: '/img/usuario.png',
      time: '6h',
      content: 'Qual framework vocês recomendam para começar com desenvolvimento mobile? Flutter ou React Native?',
      likes: 28,
      comments: 15,
      isLiked: false,
      tags: ['Mobile', 'Flutter', 'React Native']
    }
  ]);

  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
    
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({
        ...selectedPost,
        likes: selectedPost.isLiked ? selectedPost.likes - 1 : selectedPost.likes + 1,
        isLiked: !selectedPost.isLiked
      });
    }
  };

  if (selectedPost) {
    return (
      <div className="font-inter text-slate-800 bg-slate-100 min-h-screen">
        <Navbar />
        <main className="max-w-4xl mx-auto px-8 py-32">
          <Button onClick={handleBackClick} className="mb-6">
            ← Voltar aos Posts
          </Button>
          
          <Card className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <img src={selectedPost.avatar} alt={selectedPost.author} className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="font-semibold text-slate-800">{selectedPost.author}</h3>
                <p className="text-sm text-slate-500">{selectedPost.time} atrás</p>
              </div>
            </div>
            
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">{selectedPost.content}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedPost.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-6 text-slate-600 border-t pt-4">
              <button 
                onClick={() => handleLike(selectedPost.id)}
                className={`flex items-center gap-2 transition-colors ${
                  selectedPost.isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-blue-800'
                }`}
              >
                <i className={selectedPost.isLiked ? 'fas fa-heart' : 'far fa-heart'}></i>
                {selectedPost.likes} curtidas
              </button>
              <button className="flex items-center gap-2 hover:text-blue-800 transition-colors">
                <i className="far fa-comment"></i>
                {selectedPost.comments} comentários
              </button>
              <button className="flex items-center gap-2 hover:text-blue-800 transition-colors">
                <i className="far fa-share"></i>
                Compartilhar
              </button>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-inter text-slate-800 bg-slate-100 min-h-screen">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-8 py-32">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Posts da Comunidade</h1>
        
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} hover className="p-6 cursor-pointer" onClick={() => handlePostClick(post)}>
              <div className="flex items-center gap-4 mb-4">
                <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
                <div>
                  <h3 className="font-semibold text-slate-800">{post.author}</h3>
                  <p className="text-sm text-slate-500">{post.time} atrás</p>
                </div>
              </div>
              
              <p className="text-slate-700 mb-4">{post.content}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-6 text-slate-600 text-sm">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(post.id);
                  }}
                  className={`flex items-center gap-1 transition-colors ${
                    post.isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-blue-800'
                  }`}
                >
                  <i className={post.isLiked ? 'fas fa-heart' : 'far fa-heart'}></i>
                  {post.likes}
                </button>
                <span className="flex items-center gap-1">
                  <i className="far fa-comment"></i>
                  {post.comments}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Posts;