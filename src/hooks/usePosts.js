import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const usePosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const createPost = async (content, tags = []) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            content,
            tags,
            user_id: user.id
          }
        ])
        .select()

      if (error) throw error
      await fetchPosts()
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const toggleLike = async (postId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data: existingLike } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single()

      if (existingLike) {
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id)
      } else {
        await supabase
          .from('post_likes')
          .insert([{ post_id: postId, user_id: user.id }])
      }

      await fetchPosts()
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return {
    posts,
    loading,
    createPost,
    toggleLike,
    refetch: fetchPosts
  }
}