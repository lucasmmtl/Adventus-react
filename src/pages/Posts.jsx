import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

const Posts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const fetchPosts = async () => {
    try {
      const { data: postsData, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;


      const userIds = postsData?.map((post) => post.user_id) || [];
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("*")
        .in("id", userIds);


      const postIds = postsData?.map((post) => post.id) || [];
      const { data: likesData } = await supabase
        .from("post_likes")
        .select("post_id, user_id")
        .in("post_id", postIds);


      const postsWithProfiles =
        postsData?.map((post) => {
          const postLikes =
            likesData?.filter((like) => like.post_id === post.id) || [];
          const isLiked = user
            ? postLikes.some((like) => like.user_id === user.id)
            : false;

          return {
            ...post,
            profiles: profilesData?.find(
              (profile) => profile.id === post.user_id
            ),
            likesCount: postLikes.length,
            isLiked,
          };
        }) || [];

      setPosts(postsWithProfiles);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const { data: commentsData, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) throw error;


      const userIds = commentsData?.map((comment) => comment.user_id) || [];
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("*")
        .in("id", userIds);


      const commentsWithProfiles =
        commentsData?.map((comment) => ({
          ...comment,
          profiles: profilesData?.find(
            (profile) => profile.id === comment.user_id
          ),
        })) || [];

      setComments(commentsWithProfiles);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const addComment = useCallback(async () => {
    if (!newComment.trim() || !user) return;

    try {
      const { error } = await supabase.from("comments").insert([
        {
          post_id: selectedPost.id,
          user_id: user.id,
          content: newComment,
        },
      ]);

      if (error) throw error;


      const newCommentObj = {
        id: Date.now(),
        content: newComment,
        created_at: new Date().toISOString(),
        profiles: { full_name: user.user_metadata?.full_name || "Você" },
      };

      setComments([...comments, newCommentObj]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }, [newComment, user, selectedPost, comments]);

  const handlePostClick = useCallback((post) => {
    setSelectedPost(post);
    fetchComments(post.id);
  }, []);

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  const handleLike = async (postId) => {
    if (!user) return;

    try {
      const { data: existingLike, error: selectError } = await supabase
        .from("post_likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (selectError && selectError.code !== "PGRST116") {
        throw selectError;
      }

      if (existingLike) {
        await supabase
          .from("post_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);
      } else {
        await supabase
          .from("post_likes")
          .insert([{ post_id: postId, user_id: user.id }]);
      }


      setPosts(
        posts.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              isLiked: !p.isLiked,
              likesCount: p.isLiked
                ? (p.likesCount || 1) - 1
                : (p.likesCount || 0) + 1,
            };
          }
          return p;
        })
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  if (loading) {
    return (
      <div className="font-inter text-slate-800 bg-slate-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>Carregando posts...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-inter text-slate-800 bg-slate-100 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-8 py-32 w-full">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Posts da Comunidade
        </h1>

        {posts.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-slate-500">
              Nenhum post encontrado. Crie alguns posts primeiro!
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                hover
                className="p-6 cursor-pointer"
                onClick={() => handlePostClick(post)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={post.profiles?.avatar_url || "/img/usuario.png"}
                    alt={post.profiles?.full_name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {post.profiles?.full_name || "Usuário"}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p className="text-slate-700 mb-4">{post.content}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                    >
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
                      post.isLiked
                        ? "text-red-500 hover:text-red-600"
                        : "hover:text-blue-800"
                    }`}
                  >
                    <i
                      className={post.isLiked ? "fas fa-heart" : "far fa-heart"}
                    ></i>
                    {post.likesCount || 0}
                  </button>
                  <span className="flex items-center gap-1">
                    <i className="far fa-comment"></i>
                    Comentar
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Modal isOpen={!!selectedPost} onClose={() => setSelectedPost(null)}>
          {selectedPost && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedPost.profiles?.avatar_url || "/img/usuario.png"}
                  alt={selectedPost.profiles?.full_name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {selectedPost.profiles?.full_name || "Usuário"}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {new Date(selectedPost.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                {selectedPost.content}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-4">
                  Comentários ({comments.length})
                </h4>

                {user && (
                  <div className="flex gap-3 mb-4">
                    <img
                      src="/img/usuario.png"
                      alt="Você"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escreva um comentário..."
                        className="w-full p-3 border rounded-lg resize-none"
                        rows="2"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addComment();
                        }}
                        className="mt-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700"
                        type="button"
                      >
                        Comentar
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <img
                        src={comment.profiles?.avatar_url || "/img/usuario.png"}
                        alt={comment.profiles?.full_name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <h5 className="font-medium text-sm">
                            {comment.profiles?.full_name || "Usuário"}
                          </h5>
                          <p className="text-slate-700">{comment.content}</p>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </main>

      <Footer />
    </div>
  );
};

export default Posts;
